'use strict';

var Server = require('./server');
var argv = require('optimist').argv;

var server = new Server({
  hostname: argv.HOSTNAME,
  port: argv.PORT,
  env: argv.ENV,
  logLevel: argv.LOG_LEVEL
});

server.start();
