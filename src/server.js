'use strict';

var http = require('http'),
  path = require('path'),
  walk = require('walkdir'),
  express = require('express'),
  io = require('socket.io'),
  _ = require('lodash'),
  eventMediator = require('./eventMediator'),
  statsComposite = require('./statsComposite'),
  Demo = require('./demo');

var logLevels = {
  development: 3,
  test: 1,
  demo: 3
};

var Server = module.exports = function Server(options) {
  options = options || {};
  this.hostname = options.hostname || '127.0.0.1';
  this.port = _.isUndefined(options.port) ? 3000 : +options.port;
  this.env = options.env || 'development';
  this.logLevel = +options.logLevel || logLevels[this.env];
  this._init();
};

Server.prototype._init = function(){
  this.app = express();
  this.server = http.createServer(this.app);
  this.io = io.listen(this.server, { 'log level': this.logLevel });
  this.logger = this.io.log;
  this.sockets = [];
  this.stats = [];
  this._configure();
  this._loadStats();
};

Server.prototype._configure = function(){
  this.app.use(express.bodyParser());
  this._loadRoute('api');
  this.io.sockets.on('connection', this._socketConnectionHandler.bind(this));
};

Server.prototype._socketConnectionHandler = function(socket){
  this.sockets.push(socket);
};

Server.prototype._loadRoute = function(route){
  require(path.join(__dirname, 'routes', route))(this.app);
};

Server.prototype._loadStats = function(){
  var self = this;
  walk.sync(path.join(__dirname, 'stats'), function(path, stat){
    if (stat.isFile() && /\.js$/.test(path)) self._loadStat(path);
  });
};

Server.prototype._loadStat = function(path){
  var Stat = require(path);
  statsComposite.add(new Stat(this.logger));
};

Server.prototype._startStats = function(){
  statsComposite.execute();
};

Server.prototype._startDemo = function(){
  new Demo();
};

Server.prototype.start = function(cb){
  this.server.listen(this.port, this.hostname, this._listenHandler.bind(this, cb));
};

Server.prototype._listenHandler = function(cb){
  // Setting port again here since we could have started on a random port.
  this.port = this.server.address().port;
  this.logger.info('Server started in ' + this.env + ' mode at http://' + this.hostname + ':' + this.port);
  eventMediator.subscribe('statResult', this.emitDataToAllSockets.bind(this));
  this._startStats();
  if (this.env === 'demo') this._startDemo();
  if (_.isFunction(cb)) cb();
};

Server.prototype.stop = function(){
  if (this.server.address()) this.server.close();
};

Server.prototype.emitDataToAllSockets = function(name, data){
  this.logger.debug('Emitting data: [' + name + '] [' + data + ']');
  this.sockets.forEach(function(socket){
    socket.emit(name, data);
  });
};

Server.prototype.getPort = function(){
  return this.port;
};

Server.prototype.getHostname = function(){
  return this.hostname;
};
