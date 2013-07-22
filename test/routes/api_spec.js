'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  request = require('supertest'),
  Server = require('../../src/server'),
  statsComposite = require('../../src/statsComposite'),
  eventMediator = require('../../src/eventMediator');

describe('routes', function(){

  var server = new Server({ env: 'test' });

  before(function(done){
    server.start(function(){
      done();
    });
  });

  after(function(){
    server.stop();
    eventMediator.clearSubscriptions();
  });

  describe('api', function(){

    it('should pass performance timings data to the required stats', function(done){

      var stub = sinon.stub(statsComposite, 'addData');

      request(server.app)
        .post('/api/performancetimings')
        .expect(200)
        .end(function(err){
          if (err) return done(err);
          expect(stub.calledOnce).to.be(true);
          statsComposite.addData.restore();
          done();
        });

    });

  });

});