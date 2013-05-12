var expect = require('expect.js'),
  ConnectTime = require('../').ConnectTime,
  connectTime = new ConnectTime();

describe('stats / performance timings / connect time', function(){
  
  afterEach(function(){
    connectTime.data = [];
  });

  describe('interface', function(){
    
    it('should define an "add" method', function(){
      expect(connectTime.add).to.be.a('function');
    });
    
    it('should define an "execute" method', function(){
      expect(connectTime.execute).to.be.a('function');
    });

    it('should define an "addData" method', function(){
      expect(connectTime.addData).to.be.a('function');
    });

  });

  describe('execute', function(){
    
    it('should return the average connect time', function(){
      connectTime.addData({ responseEnd: 200, requestStart: 100 });
      connectTime.addData({ responseEnd: 300, requestStart: 100 });
      expect(connectTime.execute()).to.be(150);
    });
    
    it('should reset the data', function(){
      connectTime.addData({ responseEnd: 200, requestStart: 100 });
      connectTime.execute();
      expect(connectTime.data).to.eql([]);
    });

  });

  it('should be named "connectTime"', function(){
    expect(connectTime.name).to.be('connectTime');
  });

  it('should send data every 500ms', function(){
    expect(connectTime.interval).to.be(500);
  });
  
  it('should calculate the connect time when data is received', function(){
    connectTime.addData({ responseEnd: 200, requestStart: 100 });
    expect(connectTime.data[0]).to.be(100);
  });

});