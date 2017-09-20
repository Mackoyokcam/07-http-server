'use strict';

const http = require('http');
const requestParser = require('./request-parser.js');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {

  requestParser(req)
    .then(req => {
    // handle rotues
      if(req.method === 'GET' && req.url.pathname === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
             <header>
               <nav>
                 <ul>
                   <li><a href="/cowsay">cowsay</a></li>
                 </ul>
               </nav>
             <header>
             <main>
              Click on the cowsay anchor tag to get the default cow and cow text.<br>
              To change the text, add '?text=message to the end of the url.<br>
              To change the cow, add &f=dragon after the message.'
             </main>
            </body>
          </html>
          `);
        res.end();
        return;  // break out of the (req, res) => {} callback
      }

      if(req.method === 'GET' && req.url.pathname === '/cowsay'){
        let cowMessage = { text: 'I need something good to say!' };
        if (req.url.query.text)
          cowMessage = req.url.query;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>
                ${cowsay.say(cowMessage)}
              </pre>
            </body>
          </html>
          `);
        res.end();
        return;  // break out of the (req, res) => {} callback
      }

      if (req.method === 'GET' && req.url.pathname === '/api/cowsay') {
        let cowMessage = { text: 'I need something good to say!' };
        if (req.url.query.text)
          cowMessage = req.url.query;

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({content: cowsay.say(cowMessage)}));
        res.end();
        return;
      }

      if(req.method === 'POST' && req.url.pathname === '/api/cowsay'){

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(req.body));
        res.end();
        return;  // break out of the (req, res) => {} callback
      }

      // 404 for any request to a non route
      // respond to the client
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write(`resource ${req.url.pathname} not found!`);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('bad request');
      res.end();
    });
});

module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};
