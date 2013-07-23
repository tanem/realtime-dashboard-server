'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  Stat = require('../src/stat');

describe('stat', function(){

  var stat;

  beforeEach(function(){
    stat = new Stat();
  });

  it('should define an "add" method', function(){
    var spy = sinon.spy(stat, 'add');
    stat.add();
    expect(spy.callCount).to.be(1);
  });

  it('should define an "execute" method', function(){
    var spy = sinon.spy(stat, 'execute');
    stat.execute();
    expect(spy.callCount).to.be(1);  });

  it('should define an "addData" method', function(){
    var spy = sinon.spy(stat, 'addData');
    stat.addData();
    expect(spy.callCount).to.be(1);
  });

  it('should have a default interval of 1000ms', function(){
    expect(stat.interval).to.be(1000);
  });

});