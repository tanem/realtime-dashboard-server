'use strict';

// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
exports.generateRandomInt = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};