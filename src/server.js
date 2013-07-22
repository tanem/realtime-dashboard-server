'use strict';

var _ = require('lodash'),
  http = require('http'),
  path = require('path'),
  events = require('events'),
  util = require('util'),
  walk = require('walkdir'),
  express = require('express'),
  io = require('socket.io'),
  eventMediator = require('./eventMediator'),
  statsComposite = require('./statsComposite'),
  Demo = require('./demo'),
  utils = require('./utils');

var Server = module.exports = function Server(options) {
  events.EventEmitter.call(this);
  options = options || {};
  this.hostname = options.hostname || '127.0.0.1';
  this.port = _.isUndefined(options.port) ? 3000 : +options.port;
  this.env = options.env || 'development';
  this.logLevel = +options.logLevel || 1;
  this._init();
};

util.inherits(Server, events.EventEmitter);

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
  var self = this;
  this.app.use(express.bodyParser());
  this._loadRoute('api');
  this.io.sockets.on('connection', function(socket){
    self.sockets.push(socket);
  });
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
  var demo = new Demo();
  demo.start();
};

Server.prototype.start = function(cb){
  var self = this;
  this.server.listen(this.port, this.hostname, function(){
    // Setting port again here since we could have started on a random port.
    self.port = this.address().port;
    self.emit('listening', self.hostname, self.port, self.env);
    self.logger.info('Server started in ' + self.env + ' mode at http://127.0.0.1:' + self.server.address().port);
    self.emit('listening');
    eventMediator.subscribe('statResult', self.emitDataToAllSockets.bind(self));
    self._startStats();
    if (self.env === 'demo') self._startDemo();
    if (utils.isFunction(cb)) cb();
  });
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
  return this.server.address().port;
};