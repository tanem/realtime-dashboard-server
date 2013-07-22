'use strict';

var util = require('util'),
  Stat = require('../../stat');

var NetworkLatencyStat = module.exports = function NetworkLatencyStat() {
  Stat.call(this);
  this.name = 'networkLatency';
  this.interval = 500;
  this.data = [];
};

util.inherits(NetworkLatencyStat, Stat);

NetworkLatencyStat.prototype.execute = function(){
  var result = 0;
  this.data.forEach(function(data){
    result += data;
  });
  result = result ? Math.round(result/this.data.length) : 0;
  this.data = [];
  return result;
};

NetworkLatencyStat.prototype.addData = function(data){
  var networkLatency = data.responseEnd - data.fetchStart;
  this.data.push(networkLatency);
};