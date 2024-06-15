const crypto = require('crypto');
const dotenv = require('dotenv');

// Ładowanie zmiennych środowiskowych z pliku .env
dotenv.config();

// Pobieranie klucza i IV z pliku .env
const crypt_key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const crypt_iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encryptPassword(password) {
    let cipher = crypto.createCipheriv('aes-256-cbc', crypt_key, crypt_iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptPassword(encryptedPassword) {
    let ivBuffer = crypt_iv;
    let encryptedText = Buffer.from(encryptedPassword, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', crypt_key, ivBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Eksport funkcji
module.exports = {
    encryptPassword,
    decryptPassword
};
