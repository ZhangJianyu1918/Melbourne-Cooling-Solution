import CryptoJS from 'crypto-js';

function decryptData(encryptedData) {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_KEY);
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);

  // 尝试直接解密 base64 字符串
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);
  // console.log(decryptedText);
  try {
    return JSON.parse(decryptedText);
  } catch (e) {
    console.error('JSON parse error:', decryptedText);
    throw e;
  }
}

export default decryptData;
