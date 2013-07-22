'use strict';

var expect = require('expect.js'),
  Stat = require('../src/stat'),
  stat = new Stat();

describe('stat', function(){

  it('should define an "add" method', function(){
    expect(stat.add).to.be.a('function');
  });

  it('should define an "execute" method', function(){
    expect(stat.execute).to.be.a('function');
  });

  it('should define an "addData" method', function(){
    expect(stat.addData).to.be.a('function');
  });

  it('should have a default interval of 1000ms', function(){
    expect(stat.interval).to.be(1000);
  });

});