/* eslint-disable no-console */
'use strict';

const http = require('http');
const fs = require('fs');
// const url = require('url');
// const path = require('path');

function createServer() {
  /* Write your code here */
  // Return instance of http.Server class
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const fileName =
      normalizedURL.pathname.replace(/^\/file\//, '') || 'index.html';

    if (normalizedURL.pathname.includes('//')) {
      res.statusCode = 404;

      return res.end();
    }

    if (normalizedURL.pathname.includes('..')) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');

      return res.end('Invalid file path');
    }

    if (!normalizedURL.pathname.startsWith('/file/')) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');

      return res.end(
        'Path must start with /file/. Example: /file/yourfilename.txt',
      );
    }

    try {
      const file = fs.readFileSync(`./public/${fileName}`, 'utf-8');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(file);
    } catch (error) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');

      return res.end('Not Found');
    }
  });

  return server;
}

module.exports = {
  createServer,
};
