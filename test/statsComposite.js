var expect = require('expect.js'),
  sinon = require('sinon'),
  Stat = require('../').Stat,
  eventMediator = require('../').eventMediator,
  statsComposite = require('../').statsComposite,
  stat,
  clock;

describe('statsComposite', function(){
    
  beforeEach(function(){
    stat = new Stat();
    clock = sinon.useFakeTimers();
  });

  afterEach(function(){
    clock.restore();
    eventMediator.clearSubscriptions();
    statsComposite.reset();
  });

  it('should register a stat', function(){
    statsComposite.add(stat);
    expect(statsComposite.getStats()).to.have.length(1);
  });

  it('should publish the stat result at the specified interval', function(){
    var executeStub = sinon.stub(stat, 'execute');
    executeStub.returns(1);
    var publishStub = sinon.stub(eventMediator, 'publish');
    stat.name = 'foo';
    statsComposite.add(stat);
    
    statsComposite.execute();
    clock.tick(stat.interval);

    expect(publishStub.args[0]).to.eql(['statResult', 'foo', 1]);

    stat.execute.restore();
    eventMediator.publish.restore();
  });

  it('should add data to the registered stats', function(){
    var data = {};
    var stub = sinon.stub(stat, 'addData');
    statsComposite.add(stat);

    statsComposite.addData(data);

    expect(stub.called).to.be(true);

    stat.addData.restore();
  });

  describe('reset', function(){
    
    it('should clear all registered stats', function(){
      statsComposite.add(stat);
      statsComposite.reset();
      expect(statsComposite.getStats()).to.eql([]);
    });

    it('should stop all running stats', function(){
      statsComposite.add(stat);
      statsComposite.execute();
      
      statsComposite.reset();
      
      expect(statsComposite.getIntervalIds()).to.eql([]);
    });

  });

});