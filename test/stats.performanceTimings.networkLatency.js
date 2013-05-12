var expect = require('expect.js'),
  NetworkLatency= require('../').NetworkLatency,
  networkLatency = new NetworkLatency();

describe('stats / performance timings / network latency', function(){
  
  afterEach(function(){
    networkLatency.data = [];
  });

  describe('interface', function(){
    
    it('should define an "add" method', function(){
      expect(networkLatency.add).to.be.a('function');
    });
    
    it('should define an "execute" method', function(){
      expect(networkLatency.execute).to.be.a('function');
    });

    it('should define an "addData" method', function(){
      expect(networkLatency.addData).to.be.a('function');
    });

  });

  describe('execute', function(){

    it('should return the average network latency time', function(){
      networkLatency.addData({ responseEnd: 200, fetchStart: 100 });
      networkLatency.addData({ responseEnd: 300, fetchStart: 100 });
      expect(networkLatency.execute()).to.be(150);
    });
    
    it('should reset the data', function(){
      networkLatency.addData({ responseEnd: 200, fetchStart: 100 });
      networkLatency.execute();
      expect(networkLatency.data).to.eql([]);
    });

  });

  it('should be named "networkLatency"', function(){
    expect(networkLatency.name).to.be('networkLatency');
  });

  it('should send data every 500ms', function(){
    expect(networkLatency.interval).to.be(500);
  });
  
  it('should calculate the end to end time when data is received', function(){
    networkLatency.addData({ responseEnd: 200, fetchStart: 100 });
    expect(networkLatency.data[0]).to.be(100);
  });

});