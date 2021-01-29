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
        console.log("files from readdir:", files);
        // start loop at index 1 to skip .gitignore file in folder
        for (let i = 1; i < files.length; i++) {
            
        }
    }
    catch(e) {
        console.error("Woah, something happened!", e);
    }
})();