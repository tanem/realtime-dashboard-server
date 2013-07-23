'use strict';

var eventMediator = require('./eventMediator'),
  intervalIds = [],
  stats = [];

module.exports = new StatsComposite();

function StatsComposite() {}

StatsComposite.prototype.add = function(stat){
  stats.push(stat);
};

StatsComposite.prototype.execute = function(){
  stats.forEach(function(stat){
    var intervalId = setInterval(function(){
      eventMediator.publish('statResult', stat.name, stat.execute());
    }, stat.interval);
    intervalIds.push(intervalId);
  });
};

StatsComposite.prototype.addData = function(data){
  stats.forEach(function(stat){
    stat.addData(data);
  });
};

StatsComposite.prototype.reset = function(){
  intervalIds.forEach(function(intervalId){
    clearInterval(intervalId);
  });
  intervalIds = [];
  stats = [];
};

StatsComposite.prototype.getStats = function(){
  return stats;
};

StatsComposite.prototype.getIntervalIds = function(){
  return intervalIds;
};
