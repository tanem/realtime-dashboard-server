var statsComposite = require('../statsComposite');

module.exports = function(app){ 

  app.post('/api/performancetimings', function(req, res){
    statsComposite.addData(req.body); // TODO: parse?
    res.json(200, { status: 'Success' });
  });

};