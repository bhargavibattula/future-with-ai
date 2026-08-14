const http = require('http');

async function check() {
  const data = JSON.stringify({
    email: 'shanmukharani20@gmail.com', // or the user's email
    purpose: '2FA',
    password: 'SomeValidPassword123!'
  });

  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/send-otp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
  });

  req.on('error', e => console.error(e));
  req.write(data);
  req.end();
}
check();
