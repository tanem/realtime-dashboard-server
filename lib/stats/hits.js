var util = require('util'),
  Stat = require('../stat');

var HitsStat = module.exports = function HitsStat() {
  Stat.call(this);
  this.name = 'hits';
  this.interval = 500;
  this.data = 0;
};

util.inherits(HitsStat, Stat);

HitsStat.prototype.execute = function(){
  var result = this.data;
  this.data = 0;
  return result;
};

HitsStat.prototype.addData = function(data){
  this.data++;
};