function encryptData(data) {
    const key = CryptoJS.enc.Utf8.parse("Melbourne-Cooling-Solution-12"); 
    const iv = CryptoJS.enc.Utf8.parse("Melbourne-Cooling-Solution-34");  
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); 
}

export default encryptData

