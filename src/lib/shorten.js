const crypto = require('crypto');
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const baseX = require('base-x')(BASE62);


export function shorten(url) {
    const hash = hashStr(url);
    const base62URL = baseX.encode(Buffer.from(url)); //Convert Hashed String to base62 encoding
    const shortenedURL = base62URL.slice(0,7)
    return shortenedURL;
}

function hashStr(string) {
    //Creates a Sha256 Hash from the given string (in this case, URL)
    const hash = crypto.createHash('sha256');
    hash.update(string);
    return hash.digest('hex');

}
