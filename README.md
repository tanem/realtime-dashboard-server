# Realtime Dashboard Server

[![Build Status](https://travis-ci.org/tanem/realtime-dashboard-server.png?branch=master)](https://travis-ci.org/tanem/realtime-dashboard-server)

The server component of a realtime dashboard application. It's based on [Express](http://expressjs.com/) and uses [Socket.IO](http://socket.io/) to emit data to connected browsers.

## Dependencies

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 
Installing:
    
    $ npm install -g istanbul
    $ npm install

## Running the server

Install all dependencies, then to start the server in the default environment (development):

    $ node src/app.js

The server accepts the following command line args:
 
 * `--HOSTNAME`: defaults to 127.0.0.1
 * `--PORT`: 0 will be a random port, defaults to 3000
 * `--ENV`: dev (default) / test / demo
 * `--LOG_LEVEL`: 0 (error) / 1 (warn) / 2 (info) / 3 (debug)

Note that the Socket.IO logger is used for logging. The `development` and `demo` envs default to log level 3, `test` env defaults to log level 1.

## Demo

Sample [PerformanceTiming](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html) data is provided in the `./demo` directory. This data is sent at random intervals to the server during demo mode. The data being emitted to clients is logged to the console in debug mode.

To start the server in demo mode:

    $ node src/app.js --ENV=demo

## Unit tests

The server unit tests use:

 * [Mocha](http://visionmedia.github.io/mocha/)
 * [expect.js](https://github.com/LearnBoost/expect.js)
 * [Sinon.JS](http://sinonjs.org/)

To run:

    $ make test

To watch for changes and execute tests:

    $ make test-w

## Unit test coverage

[Istanbul](https://github.com/gotwarlost/istanbul) is used to provide code coverage.

To generate the coverage report:

    $ make test-cov

Outputs to `_coverage`.
    
## Credits

 * [Hummingbird](http://hummingbirdstats.com/), the original inspiration for this component
 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) had a working Istanbul setup I could base mine off
