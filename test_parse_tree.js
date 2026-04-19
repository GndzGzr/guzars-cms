const fs = require('fs');
const https = require('https');

const options = {
  hostname: 'guzars-api.vercel.app',
  port: 443,
  path: '/api/notes/tree/',
  method: 'GET',
  headers: {
    'Authorization': 'Token 14df91e1f3deac6b54b2452342402942792bb3e9'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', d => { data += d; });
  res.on('end', () => {
    const items = JSON.parse(data).slice(0, 10);
    console.log(items);
  });
});
req.end();
