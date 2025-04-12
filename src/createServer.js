/* eslint-disable no-console */
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
// const path = require('path');

function createServer() {
  /* Write your code here */
  // Return instance of http.Server class
  const server = http.createServer((req, res) => {
    const rawUrl = decodeURIComponent(req.url);

    console.log('Raw request URL:', rawUrl);

    const passUrl = req.url;

    console.log('Request URL:', passUrl);

    if (passUrl.includes('//')) {
      res.statusCode = 404;

      return res.end();
    }

    const normalizedURL = new url.URL(req.url, `http://${req.headers.host}`);

    if (normalizedURL.pathname.includes('..')) {
      console.log('..');
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');

      return res.end('No access');
    }

    const fileName =
      normalizedURL.pathname.replace(/^\/file\//, '') || 'index.html';

    if (!passUrl.startsWith('/file/') && fs.existsSync(normalizedURL)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');

      return res.end('No access');
    }

    if (!passUrl.startsWith('/file/')) {
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
