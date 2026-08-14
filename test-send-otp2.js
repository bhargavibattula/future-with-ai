const http = require('http');

async function testSendOtp() {
  const data = JSON.stringify({
    email: 'shanm@future.ai', // Change this to a user that exists in the database
    purpose: '2FA',
    password: 'Password123!' // Make sure this is the correct password for shanm@future.ai
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

testSendOtp();
