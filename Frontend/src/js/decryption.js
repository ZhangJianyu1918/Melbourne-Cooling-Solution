import CryptoJS from 'crypto-js';


function decryptData(encryptedData) {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_KEY);
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);

  // Base64 decode first
  const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedData);

  // Wrap in expected structure
  const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedWordArray },
      key,
      {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      }
  );

  // Decode from WordArray to string
  const decryptedData = CryptoJS.enc.Utf8.stringify(decrypted);
  return JSON.parse(decryptedData);
}



export default decryptData