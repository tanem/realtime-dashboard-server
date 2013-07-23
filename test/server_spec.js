'use strict';

var _ = require('lodash'),
  http = require('http'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  eventMediator = require('../src/eventMediator'),
  statsComposite = require('../src/statsComposite'),
  Server = require('../src/server'),
  Demo = require('../src/demo');

describe('server', function(){

  var server;

  beforeEach(function(){
    server = new Server({ env: 'test' });
  });

  afterEach(function(){
    eventMediator.clearSubscriptions();
    statsComposite.reset();
  });

  it('should default to the development environment', function(){
    sinon.stub(Server.prototype, '_init');
    server = new Server();
    expect(server.env).to.be('development');
    Server.prototype._init.restore();
  });

  it('should allow the setting of a custom port', function(){
    sinon.stub(Server.prototype, '_init');
    server = new Server({ port: 4000 });
    expect(server.port).to.be(4000);
    Server.prototype._init.restore();
  });

  it('should stop correctly if the server is running', function(done){
    server.start(function(){
      var hostname = server.getHostname();
      var port = server.getPort();
      server.stop();
      http.get('http://' + hostname + ':' + port).on('error', function(e){
        expect(e.code).to.be('ECONNREFUSED');
        done();
      });
    });
  });

  it('should not attempt to stop the server if it isn\'t running', function(){
    sinon.stub(server.server, 'address').returns(false);
    var stub = sinon.stub(server.server, 'close');
    server.stop();
    expect(stub.callCount).to.be(0);
  });

  it('should add new io connections to the sockets array', function(){
    var dummySocket = { name: 'dummySocket' };
    server._socketConnectionHandler(dummySocket);
    expect(server.sockets).to.eql([dummySocket]);
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
    var stub = sinon.stub(Demo.prototype, '_init');
    server = new Server({
      env: 'demo',
      logLevel: 1
    });
    server.start(function(){
      expect(stub.called).to.be(true);
      Demo.prototype._init.restore();
      server.stop();
      done();
    });
  });

  it('should not call the start callback if it isn\'t a function', function(){
    sinon.stub(_, 'isFunction').returns(false);
    sinon.stub(server, '_startStats');
    sinon.stub(server.server, 'address').returns({ port: 0 });
    var cb = sinon.spy();

    server._listenHandler(cb);

    expect(cb.callCount).to.be(0);

    _.isFunction.restore();
  });

});