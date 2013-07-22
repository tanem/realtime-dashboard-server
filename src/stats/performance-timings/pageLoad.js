'use strict';

var util = require('util'),
  Stat = require('../../stat');

var PageLoadStat = module.exports = function PageLoadStat() {
  Stat.call(this);
  this.name = 'pageLoad';
  this.interval = 500;
  this.data = [];
};

util.inherits(PageLoadStat, Stat);

PageLoadStat.prototype.execute = function(){
  var result = 0;
  this.data.forEach(function(data){
    result += data;
  });
  result = result ? Math.round(result/this.data.length) : 0;
  this.data = [];
  return result;
};

PageLoadStat.prototype.addData = function(data){
  var pageLoad = data.loadEventEnd - data.responseEnd;
  this.data.push(pageLoad);
};