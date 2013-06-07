# Realtime Dashboard Server

[![Build Status](https://travis-ci.org/tanem/realtime-dashboard-server.png?branch=master)](https://travis-ci.org/tanem/realtime-dashboard-server)

The server component of a realtime dashboard application. It's based on [Express](http://expressjs.com/) and uses [Socket.IO](http://socket.io/) to emit data to connected browsers.

## Dependencies

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 * [JSCoverage](http://siliconforks.com/jscoverage/)
 
Installing:

    $ npm install

## Running the server

Install all dependencies, then to start the server in the default environment (dev):

    $ node app.js

The server accepts the following command line args:

 * `NODE_ENV`: dev (default) / test / demo
 * `LOG_LEVEL`: 0 (error) / 1 (warn) / 2 (info) / 3 (debug, default)

Note that the Socket.IO logger is used for logging. The `dev` and `demo` envs default to log level 3, `test` env defaults to log level 1.

## Demo

Sample [PerformanceTiming](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html) data is provided in the `./demo` directory. This data is sent at random intervals to the server during demo mode. The data being emitted to clients is logged to the console in debug mode.

To start the server in demo mode:

    $ NODE_ENV=demo node app.js

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

[JSCoverage](http://siliconforks.com/jscoverage/) is used to add instrumentation to the JavaScript code, which is output to the `./lib-cov` directory. [Mocha's](http://visionmedia.github.io/mocha/) HTMLCov reporter captures the necessary coverage information and generates a single-page HTML report `./coverage.html`

To generate the coverage report:

    $ make test-cov
    
## Credits

 * [Hummingbird](http://hummingbirdstats.com/), the original inspiration for this component.
