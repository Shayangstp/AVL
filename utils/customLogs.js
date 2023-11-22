// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '68f55befc5e940b1875bfa3cadd36bff',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

 

module.exports = { logger:console };
