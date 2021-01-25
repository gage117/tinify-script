const fs = require('fs');
const path = require('path');
// dotenv.config gathers API key from .env file
require('dotenv').config();
const tinify = require('tinify');

tinify.key = process.env.API_KEY;

const uncompressedFolder = './uncompressed';
const compressedFolder = './compressed';

(async () => {
    try {
        const files = await fs.promises.readdir(path.join(uncompressedFolder));
        console.log(files);
    }
    catch(e) {
        console.error("Woah, something happened!", e);
    }
})();