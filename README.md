# Realtime Dashboard Server

[![Build Status](https://travis-ci.org/tanem/realtime-dashboard-server.png?branch=master)](https://travis-ci.org/tanem/realtime-dashboard-server)

The server component of a realtime dashboard application. It's based on [Express](http://expressjs.com/) and uses [Socket.IO](http://socket.io/) to emit data to connected browsers.

## Dependencies

Ensure the following are installed:

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)
 
Install the global dependencies:

    $ npm install -g grunt-cli istanbul node-inspector

Change to your project directory then install the local dependencies:

    $ npm install

## Running the server

To start the server in the default environment (development):

    $ grunt start

Can be accessed via `http://127.0.0.1:3000/client/`. [Node Inspector](https://github.com/dannycoates/node-inspector) will also be available via `http://0.0.0.0:8080/debug?port=5858`.

Once started, the app will also:

 * Watch the server source files, and restart the Node server if any changes are made
 * Watch the relevant JS files, and run the relevant JSHint tasks if any changes are made

Note that the Socket.IO logger is used for logging. The `development` and `demo` envs default to log level 3, `test` env defaults to log level 1.

## Demo

Sample [PerformanceTiming](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html) data is provided in the `./demo` directory. This data is sent at random intervals to the server during demo mode. The data being emitted to clients is logged to the console in debug mode.

To start the server in demo mode:

    $ grunt start:demo

## Unit tests

The server unit tests use:

 * [Mocha](http://visionmedia.github.io/mocha/)
 * [expect.js](https://github.com/LearnBoost/expect.js)
 * [Sinon.JS](http://sinonjs.org/)

To run:

    $ grunt test

## Unit test coverage

[Istanbul](https://github.com/gotwarlost/istanbul) provides code coverage. To generate the coverage report:

    $ grunt cover

Outputs to `./_coverage'.

## Docs

 * [Docker](https://github.com/Prevole/grunt-docker) is used to generate the documentation.
 
To generate:

    $ grunt docs

Outputs to `./_docs'.
    
## Credits

 * [Hummingbird](http://hummingbirdstats.com/), the original inspiration for this component
 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul and Node Inspector