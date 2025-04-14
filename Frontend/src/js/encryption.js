function encryptData(data) {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_KEY); 
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);  
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); 
}

export default encryptData

