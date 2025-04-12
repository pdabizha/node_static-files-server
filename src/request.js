/* eslint-disable no-console */
// const http = require('http');

// const options = {
//   hostname: 'localhost',
//   port: 5701,
//   path: '/file/../../index.html',
// };

// http.get(options, (res) => {
//   res.setEncoding('utf8');
//   res.on('data', console.log);
// });

const axios = require('axios');
const BASE = 'http://localhost:5701';
const href = BASE + '/file/../user/1/friends' + '?sex=m&age=25&age=35';

console.log(href);
axios.get(href).catch((err) => console.log(err));
