require('dotenv').config();
const { sendOTPEmail } = require('./.next/server/app/api/auth/send-otp/route.js'); 
// Can't easily require next.js compiled code, let's just write a test for nodemailer

const nodemailer = require('nodemailer');
async function test() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'test', pass: 'test' }
  });
  try {
    const info = await transporter.sendMail({
      from: 'test',
      to: 'shanmukharani20@gmail.com ', // Trailing space
      subject: 'Test',
      text: 'Test'
    });
    console.log('Success:', info);
  } catch (e) {
    console.log('Caught exception:', e.message);
  }
}
test();
