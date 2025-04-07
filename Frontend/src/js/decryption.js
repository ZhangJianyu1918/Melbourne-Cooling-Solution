import CryptoJS from 'crypto-js';


function decryptData(encryptedData) {
    const key = CryptoJS.enc.Utf8.parse("MelbourneCooling"); 
    const iv = CryptoJS.enc.Utf8.parse("MelbourneCooling");  
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedData = CryptoJS.enc.Utf8.stringify(decrypted); // 解密并转回 UTF8 字符串
    return JSON.parse(decryptedData); // 转换为对象
}

export default decryptData