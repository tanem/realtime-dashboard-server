var expect = require('expect.js'),
  EndToEnd = require('../').EndToEnd,
  endToEnd = new EndToEnd();

describe('stats / performance timings / end to end', function(){
  
  afterEach(function(){
    endToEnd.data = [];
  });

  describe('interface', function(){
    
    it('should define an "add" method', function(){
      expect(endToEnd.add).to.be.a('function');
    });
    
    it('should define an "execute" method', function(){
      expect(endToEnd.execute).to.be.a('function');
    });

    it('should define an "addData" method', function(){
      expect(endToEnd.addData).to.be.a('function');
    });

  });

  describe('execute', function(){

    it('should return the average end to end time', function(){
      endToEnd.addData({ loadEventEnd: 200, navigationStart: 100 });
      endToEnd.addData({ loadEventEnd: 300, navigationStart: 100 });
      expect(endToEnd.execute()).to.be(150);
    });
    
    it('should reset the data', function(){
      endToEnd.addData({ loadEventEnd: 200, navigationStart: 100 });
      endToEnd.execute();
      expect(endToEnd.data).to.eql([]);
    });

  });

  it('should be named "endToEnd"', function(){
    expect(endToEnd.name).to.be('endToEnd');
  });

  it('should send data every 500ms', function(){
    expect(endToEnd.interval).to.be(500);
  });
  
  it('should calculate the end to end time when data is received', function(){
    endToEnd.addData({ loadEventEnd: 200, navigationStart: 100 });
    expect(endToEnd.data[0]).to.be(100);
  });

});