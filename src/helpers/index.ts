//use authentication helpers to encrypt the password or create random tokens

import crypto from 'crypto';

const SECRET= 'SHANKS-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64'); // generated string will be a sequence of random characters encoded in Base64 format

export const authentication = (salt: string, password: string) => { //perform authentication using a password and salt. It creates an HMAC object with the SHA-256 algorithm, updates the hash with the secret value, and generates the resulting hash in a hexadecimal format
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
