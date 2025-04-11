/* eslint-disable no-console */
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5701,
  path: '/index.html',
};

http.get(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', console.log);
});
