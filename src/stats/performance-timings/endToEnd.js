'use strict';

var util = require('util'),
  Stat = require('../../stat');

var EndToEndStat = module.exports = function EndToEndStat() {
  Stat.call(this);
  this.name = 'endToEnd';
  this.interval = 500;
  this.data = [];
};

util.inherits(EndToEndStat, Stat);

EndToEndStat.prototype.execute = function(){
  var result = 0;
  this.data.forEach(function(data){
    result += data;
  });
  result = result ? Math.round(result/this.data.length) : 0;
  this.data = [];
  return result;
};

EndToEndStat.prototype.addData = function(data){
  var endToEnd = data.loadEventEnd - data.navigationStart;
  this.data.push(endToEnd);
};