var Server = require('./server'),
  Demo = require('./demo'),
  statsComposite = require('./statsComposite'),
  eventMediator = require('./eventMediator'),
  Stat = require('./stat'),
  utils = require('./utils'),
  Hits = require('./stats/hits'),
  ConnectTime = require('./stats/performance-timings/connectTime'),
  EndToEnd = require('./stats/performance-timings/endToEnd'),
  NetworkLatency = require('./stats/performance-timings/networkLatency'),
  PageLoad = require('./stats/performance-timings/pageLoad');

exports.start = function(opts){
  var server = new Server(opts);
  server.start();
}

exports.Server = Server;
exports.Demo = Demo;
exports.statsComposite = statsComposite;
exports.eventMediator = eventMediator;
exports.Stat = Stat;
exports.utils = utils;
exports.Hits = Hits;
exports.ConnectTime = ConnectTime;
exports.EndToEnd = EndToEnd;
exports.NetworkLatency = NetworkLatency;
exports.PageLoad = PageLoad;