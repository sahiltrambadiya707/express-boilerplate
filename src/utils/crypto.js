const CryptoJS = require('crypto-js');

const key = CryptoJS.enc.Utf8.parse('26605c16b2a07771e83788e28c040594');
const iv = CryptoJS.enc.Utf8.parse('3a55763397463403');

// Encrypting text
function encrypt(data) {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv }).toString();
  return cipherText;
}

// Decrypting text
function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, key, { iv });
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

module.exports = {
  encrypt,
  decrypt,
};
