'use strict';

var toString = Object.prototype.toString;

exports.isFunction = function(obj){
  return toString.call(obj) === '[object Function]';
};

exports.isNumber = function(obj){
  return toString.call(obj) === '[object Number]';
};

// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
exports.generateRandomInt = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};