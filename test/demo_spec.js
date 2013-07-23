'use strict';

var _ = require('lodash'),
  path = require('path'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Demo = require('../src/demo'),
  statsComposite = require('../src/statsComposite');

describe('demo', function(){

  var demo = new Demo();

  describe('start', function(){

    it('should add a data file if it is of the correct file type', function(){
      var stub = sinon.stub(demo, '_addData');
      demo._emitterFileHandler(path.resolve('demo/performanceTimings.json'));
      expect(stub.callCount).to.be(1);
      demo._addData.restore();
    });

    it('should not add a data file if it is not the correct file type', function(){
      var stub = sinon.stub(demo, '_addData');
      demo._emitterFileHandler('foo.txt');
      expect(stub.callCount).to.be(0);
      demo._addData.restore();
    });

    it('should call the start callback when all data files have been loaded, if it is a function', function(){
      var cb = sinon.spy();
      demo._emitterEndHandler(cb);
      expect(cb.callCount).to.be(1);
    });

    it('should not call the start callback when all data files have been loaded, if it isn\'t a function', function(){
      sinon.stub(_, 'isFunction').returns(false);
      var cb = sinon.spy();
      demo._emitterEndHandler(cb);
      expect(cb.callCount).to.be(0);
      _.isFunction.restore();
    });

  });

  it('should randomly add data from the provided data array', function(){
    var addDataStub = sinon.stub(statsComposite, 'addData');
    var dataArray = [0, 1, 2];
    sinon.stub(global, 'setTimeout');

    demo._addData(dataArray);

    expect(addDataStub.getCall(0).args[0]).to.be.within(0, 2);

    global.setTimeout.restore();
    statsComposite.addData.restore();
  });

  it('should add data at an interval between 0 and 500ms by default', function(){
    var setTimeoutStub = sinon.stub(global, 'setTimeout');
    var dataArray = [0, 1, 2];
    sinon.stub(statsComposite, 'addData');

    demo._addData(dataArray);

    expect(setTimeoutStub.getCall(0).args[1]).to.be.within(0, 500);

    global.setTimeout.restore();
    statsComposite.addData.restore();
  });

});