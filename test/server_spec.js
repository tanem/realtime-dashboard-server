'use strict';

var http = require('http'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  eventMediator = require('../src/eventMediator'),
  statsComposite = require('../src/statsComposite'),
  Server = require('../src/server'),
  server = new Server({ env: 'test' }),
  Demo = require('../src/demo');

describe('server', function(){

  afterEach(function(){
    eventMediator.clearSubscriptions();
    statsComposite.reset();
  });

  it('should stop correctly', function(done){
    server.start(function(){
      var port = server.getPort();
      server.stop();
      http.get('http://127.0.0.1:' + port).on('error', function(e){
        expect(e.code).to.be('ECONNREFUSED');
        done();
      });
    });
  });

  it('should load all stats on init', function(){
    var stub = sinon.stub(Server.prototype, '_loadStat');
    server = new Server({ env: 'test' });

    expect(stub.callCount).to.be(5);
    expect(stub.getCall(0).args).to.match(/hits\.js$/);
    expect(stub.getCall(1).args).to.match(/connectTime\.js$/);
    expect(stub.getCall(2).args).to.match(/endToEnd\.js$/);
    expect(stub.getCall(3).args).to.match(/networkLatency\.js$/);
    expect(stub.getCall(4).args).to.match(/pageLoad\.js$/);

    Server.prototype._loadStat.restore();
  });

  it('should start all stats when the server has started', function(done){
    var stub = sinon.stub(statsComposite, 'execute');
    server.start(function(){
      expect(stub.called).to.be(true);
      statsComposite.execute.restore();
      server.stop();
      done();
    });
  });

  it('should emit the data to all sockets when a stat result is received', function(done){
    var socket = { emit: sinon.spy() };
    server.sockets.push(socket);
    server.start(function(){
      eventMediator.publish('statResult', 'foo', 1);
      expect(socket.emit.args[0]).to.eql(['foo', 1]);
      server.stop();
      done();
    });
  });

  it('should start running the demo when started in demo mode', function(done){
    var stub = sinon.stub(Demo.prototype, 'start');
    server = new Server({
      env: 'demo',
      logLevel: 1
    });
    server.start(function(){
      expect(stub.called).to.be(true);
      Demo.prototype.start.restore();
      server.stop();
      done();
    });
  });

});