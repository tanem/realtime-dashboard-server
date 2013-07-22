'use strict';

var sinon = require('sinon'),
  expect = require('expect.js'),
  eventMediator = require('../src/eventMediator'),
  noop = function(){};

describe('eventMediator', function(){

  afterEach(function(){
    eventMediator.clearSubscriptions();
  });

  it('should allow clearing of all subscriptions', function(){
    eventMediator.subscribe('foo', noop);
    eventMediator.clearSubscriptions();
    expect(eventMediator.getSubscriptions()).to.eql({});
  });

  it('should return a reference to the array of event subscriptions', function(){
    eventMediator.subscribe('foo', noop);
    eventMediator.subscribe('foo', noop);
    expect(eventMediator.getSubscriptions('foo')).to.eql([
      { cb: noop, context: eventMediator },
      { cb: noop, context: eventMediator }
    ]);
  });

  it('should return a reference to the entire subscriptions object', function(){
    expect(eventMediator.getSubscriptions()).to.eql({});
  });

  it('should allow subcriptions to an event', function(){
    eventMediator.subscribe('foo', noop);
    expect(eventMediator.getSubscriptions('foo')).to.eql([
      { cb: noop, context: eventMediator }
    ]);
  });

  it('should apply the correct arguments to a callback when executed', function(){
    var spy = sinon.spy();
    eventMediator.subscribe('foo', spy);

    eventMediator.publish('foo', 1, 2);

    expect(spy.callCount).to.be(1);
    expect(spy.calledWithExactly(1, 2)).to.be(true);
  });

  it('should execute all relevant callbacks when an event is published', function(){
    var spy = sinon.spy();
    eventMediator.subscribe('foo', spy);
    eventMediator.subscribe('foo', spy);

    eventMediator.publish('foo');

    expect(spy.callCount).to.be(2);
  });

  it('should default the callback context to itself', function(){
    var spy = sinon.spy();
    eventMediator.subscribe('foo', spy);

    eventMediator.publish('foo');

    expect(spy.callCount).to.be(1);
    expect(spy.calledOn(eventMediator)).to.be(true);
  });

  it('should execute the callback in the required context', function(){
    var context = {}, spy = sinon.spy();
    eventMediator.subscribe('foo', spy, context);

    eventMediator.publish('foo');

    expect(spy.callCount).to.be(1);
    expect(spy.calledOn(context)).to.be(true);
  });

});