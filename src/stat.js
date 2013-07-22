'use strict';

var Stat = module.exports = function Stat() {
  this.interval = 1000;
};

Stat.prototype.add = function(){};
Stat.prototype.execute = function(){};
Stat.prototype.addData = function(){};