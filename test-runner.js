'use strict';

var walk = require('walkdir');
var Mocha = require('mocha');

var mocha = new Mocha({
  reporter: 'dot',
  ui: 'bdd'
});

var emitter = walk('./test');

emitter.on('file',function(filename){
  if ((/_spec\.js$/).test(filename)) mocha.addFile(filename);
});

emitter.on('end', function(){
  mocha.run(function(failures){
    process.exit(failures);
  });
});
