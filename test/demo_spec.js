'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  Demo = require('../src/demo'),
  statsComposite = require('../src/statsComposite');

describe('demo', function(){

  var demo = new Demo();

  describe('start', function(){

    it('should add data from all data files contained in the demo directory', function(done){
      var stub = sinon.stub(demo, '_addData');
      demo.start(function(){
        expect(stub.callCount).to.be(1);
        demo._addData.restore();
        done();
      });
    });

  });

  it('should randomly add data from the provided data array', function(){
    sinon.stub(global, 'setTimeout');
    var addDataStub = sinon.stub(statsComposite, 'addData');
    var dataArray = [0, 1, 2];

    demo._addData(dataArray);

    expect(addDataStub.getCall(0).args[0]).to.be.within(0, 2);

    global.setTimeout.restore();
    statsComposite.addData.restore();
  });

  it('should add data at an interval between 0 and 500ms by default', function(){
    var setTimeoutStub = sinon.stub(global, 'setTimeout');
    sinon.stub(statsComposite, 'addData');
    var dataArray = [0, 1, 2];

    demo._addData(dataArray);

    expect(setTimeoutStub.getCall(0).args[1]).to.be.within(0, 500);

    global.setTimeout.restore();
    statsComposite.addData.restore();
  });

});