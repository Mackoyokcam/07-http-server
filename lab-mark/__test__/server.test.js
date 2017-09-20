'use strict';

const superagent = require('superagent');

describe('POST /api/cowsay', () => {
  test('should respond with 200 response and echo the body', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .send({
        text: 'Wassup',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({'content': ` ________
< Wassup >
 --------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`});
      });
  });

  test('should respond with a 400', () => {
    return superagent.post('http://localhost:3000/api/cosway')
      .set({ 'Content-Type': 'application/json'})
      .send('{')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.response.text).toEqual('bad request');
      });
  });
});

describe('GET /api/cowsay', () => {
  test('should respond with 200 response and echo the body', () => {
    return superagent.get('http://localhost:3000/api/cowsay')
      .query('text=lulwat')
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({'content': ` ________
< lulwat >
 --------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`});
      });
  });

  test('should respond with a 400', () => {
    return superagent.get('http://localhost:3000/api/cosway')
      .set({ 'Content-Type': 'application/json'})
      .query('txt=lulwat')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.response.text).toEqual('bad request');
      });
  });
});
