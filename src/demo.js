'use strict';

var path = require('path'),
  walk = require('walkdir'),
  _ = require('lodash'),
  utils = require('./utils'),
  demoDir = path.join(__dirname, '../demo'),
  statsComposite = require('./statsComposite');

// Simulates posted data which would normally be sent via a client.
var Demo = module.exports = function Demo(opts) {
  opts = opts || {};
  this.minDataInterval = opts.minDataInterval || 0;
  this.maxDataInterval = opts.maxDataInterval || 500;
  this._init();
};

// Reads data files from the demo directory and starts randomly
// adding data from them.
Demo.prototype._init = function(cb){
  var emitter = walk(demoDir);
  emitter.on('file', this._emitterFileHandler.bind(this));
  emitter.on('end', this._emitterEndHandler.bind(this, cb));
};

Demo.prototype._emitterFileHandler = function(filename){
  if (/\.json$/.test(filename)) this._addData(require(filename));
};

Demo.prototype._emitterEndHandler = function(cb){
  if (_.isFunction(cb)) cb();
};

// Randomly adds data from the specified data array, at random intervals.
Demo.prototype._addData = function _addData(dataArr) {
  statsComposite.addData(dataArr[utils.generateRandomInt(0, dataArr.length - 1)]);
  setTimeout(
    _addData.bind(this, dataArr),
    utils.generateRandomInt(this.minDataInterval, this.maxDataInterval)
  );
};
