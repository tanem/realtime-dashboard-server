var expect = require('expect.js'),
  sinon = require('sinon'),
  http = require('http'),
  request = require('supertest'),
  Server = require('../').Server,
  statsComposite = require('../').statsComposite,
  eventMediator = require('../').eventMediator;

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
        .end(function(err, res){
          if (err) return done(err);
          expect(stub.calledOnce).to.be(true);
          statsComposite.addData.restore();
          done();
        });

    });
  
  });

});