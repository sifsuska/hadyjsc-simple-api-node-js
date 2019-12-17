const cryptoRandomString = require('crypto-random-string');
const dict = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';

const username = (input) => input.slice(0, input.indexOf('@')) + Number(new Date());
const passwordArray = Array.apply(null, Array(6));
const password = () => passwordArray.map(item => dict[Math.round(Math.random()*(dict.length - 1))]).join('');
const login_pin = cryptoRandomString({length: 6, characters: '1234567890'});
const auth_key = cryptoRandomString({length: 32, type: 'base64'});
const verification_token = cryptoRandomString({length: 50, type: 'base64'});
const password_reset_token = cryptoRandomString({length: 50, type: 'base64'});

module.exports = {
  password,
  login_pin,
  auth_key,
  verification_token,
  password_reset_token,
  username
}