var expect = require('expect.js'),
  utils = require('../').utils;

describe('utils', function(){

  it('should determine if an object is a function', function(){
    expect(utils.isFunction(function(){})).to.be(true);
    expect(utils.isFunction('')).to.be(false);
  });

  it('should determine if an object is a number', function(){
    expect(utils.isNumber(1)).to.be(true);
    expect(utils.isNumber('foo')).to.be(false);
  });

  it('should generate a random integer between two specified numbers', function(){
    expect(utils.generateRandomInt(0, 5)).to.match(/^[012345]$/);
  });

});