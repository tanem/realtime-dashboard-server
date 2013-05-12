var util = require('util'),
  Stat = require('../../stat');

var ConnectTimeStat = module.exports = function ConnectTimeStat() {
  Stat.call(this);
  this.name = 'connectTime';
  this.interval = 500;
  this.data = [];
};

util.inherits(ConnectTimeStat, Stat);

ConnectTimeStat.prototype.execute = function(){
  var result = 0;
  this.data.forEach(function(data){
    result += data;
  });
  result = result ? Math.round(result/this.data.length) : 0;
  this.data = [];
  return result;
};

ConnectTimeStat.prototype.addData = function(data){
  var connectTime = data.responseEnd - data.requestStart;
  this.data.push(connectTime);
};