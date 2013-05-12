var expect = require('expect.js'),
  Hits = require('../').Hits,
  hits = new Hits();

describe('stats / hits', function(){
  
  afterEach(function(){
    hits.data = 0;
  });
    
  describe('interface', function(){
    
    it('should define an "add" method', function(){
      expect(hits.add).to.be.a('function');
    });
    
    it('should define an "execute" method', function(){
      expect(hits.execute).to.be.a('function');
    });

    it('should define an "addData" method', function(){
      expect(hits.addData).to.be.a('function');
    });

  });

  describe('execute', function(){
    
    it('should return the number of hits', function(){
      hits.addData({});
      expect(hits.execute()).to.be(1);
    });

    it('should reset the data', function(){
      hits.addData({});
      hits.execute();
      expect(hits.data).to.be(0);
    });

  });

  it('should be named "hits"', function(){
    expect(hits.name).to.be('hits');
  });

  it('should send data every 500ms', function(){
    expect(hits.interval).to.be(500);
  });

  it('should count a hit when data is received', function(){
    hits.addData({});
    expect(hits.data).to.be(1);
  });

});