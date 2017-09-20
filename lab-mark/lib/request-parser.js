'use strict';

const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    console.log(req.url.query);
    // Resolve if GET
    if(!(req.method === 'POST' || req.method === 'PUT'))
      return resolve(req);

    req.body = {};
    let content = '';

    req.on('data', (buffer) => {
      content += buffer.toString();
    });
    req.on('end', () => {
      try {
        console.log(content);
        req.body.content = cowsay.say(JSON.parse(content));
        resolve(req);
      } catch (err) {
        reject(err);
      }
    });
  });
};
