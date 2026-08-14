const bcrypt = require('bcryptjs');

async function test() {
  try {
    const isMatch = await bcrypt.compare('', 'somehash');
    console.log(isMatch);
  } catch (e) {
    console.log('Caught exception:', e.message);
  }
}
test();
