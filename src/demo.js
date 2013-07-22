'use strict';

var path = require('path'),
  walk = require('walkdir'),
  utils = require('./utils'),
  demoDir = path.join(__dirname, '../demo'),
  statsComposite = require('./statsComposite');

// Simulates posted data which would normally be sent via a client.
var Demo = module.exports = function Demo(opts) {
  opts = opts || {};
  this.minDataInterval = opts.minDataInterval || 0;
  this.maxDataInterval = opts.maxDataInterval || 500;
};

// Reads data files from the demo directory and starts randomly
// adding data from them.
Demo.prototype.start = function(cb){

  var self = this,
    emitter = walk(demoDir);

  emitter.on('file', function(filename){
    if (/\.json$/.test(filename)) self._addData(require(filename));
  });

  emitter.on('end', function(){
    if (utils.isFunction(cb)) cb();
  });

};

// Randomly adds data from the specified data array, at random intervals.
Demo.prototype._addData = function _addData(dataArr) {
  statsComposite.addData(dataArr[utils.generateRandomInt(0, dataArr.length - 1)]);
  setTimeout(
    _addData.bind(this, dataArr),
    utils.generateRandomInt(this.minDataInterval, this.maxDataInterval)
  );
};