module.exports = process.env.REALTIME_COV
  ? require('./lib-cov/realtime')
  : require('./lib/realtime');