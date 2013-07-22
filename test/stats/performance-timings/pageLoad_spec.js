'use strict';

var expect = require('expect.js'),
  PageLoad = require('../../../src/stats/performance-timings/pageLoad'),
  pageLoad = new PageLoad();

describe('stats / performance timings / page load', function(){

  afterEach(function(){
    pageLoad.data = [];
  });

  describe('interface', function(){

    it('should define an "add" method', function(){
      expect(pageLoad.add).to.be.a('function');
    });

    it('should define an "execute" method', function(){
      expect(pageLoad.execute).to.be.a('function');
    });

    it('should define an "addData" method', function(){
      expect(pageLoad.addData).to.be.a('function');
    });

  });

  describe('execute', function(){

    it('should return the average page load time', function(){
      pageLoad.addData({ loadEventEnd: 200, responseEnd: 100 });
      pageLoad.addData({ loadEventEnd: 300, responseEnd: 100 });
      expect(pageLoad.execute()).to.be(150);
    });

    it('should reset the data', function(){
      pageLoad.addData({ loadEventEnd: 200, responseEnd: 100 });
      pageLoad.execute();
      expect(pageLoad.data).to.eql([]);
    });

  });

  it('should be named "pageLoad"', function(){
    expect(pageLoad.name).to.be('pageLoad');
  });

  it('should send data every 500ms', function(){
    expect(pageLoad.interval).to.be(500);
  });

  it('should calculate the end to end time when data is received', function(){
    pageLoad.addData({ loadEventEnd: 200, responseEnd: 100 });
    expect(pageLoad.data[0]).to.be(100);
  });

});