'use strict';

var expect = require('expect.js'),
  utils = require('../src/utils');

describe('utils', function(){

  it('should generate a random integer between two specified numbers', function(){
    expect(utils.generateRandomInt(0, 5)).to.match(/^[012345]$/);
  });

});