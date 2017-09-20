'use strict';

// load environment
// require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = require('./lib/server.js');

// start server
server.start(PORT, () =>
  console.log('server up ::', PORT));
