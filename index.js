const fs = require('fs');
const path = require('path');
// dotenv.config gathers API key from .env file
require('dotenv').config();
const tinify = require('tinify');
const sizeOf = require('image-size');

tinify.key = process.env.API_KEY;

const uncompressedFolder = './uncompressed';
const compressedFolder = './compressed';

(async () => {
    try {
        // get all files from uncompressed folder
        const files = await fs.promises.readdir(path.join(uncompressedFolder));
        // shift files to remove .gitignore file from start of array
        files.shift();
        console.log("files to compress:", files, '\n');
        let successful_compressions = 0;
        for (let i = 0; i < files.length; i++) {
            try {
                const source = await tinify.fromFile(path.join(uncompressedFolder, files[i]));
                // Get image dimensions to maintain aspect ratio while resizing
                let dimensions = sizeOf(path.join(uncompressedFolder, files[i]));
                console.log(`> image dimensions (${files[i]}):`, dimensions.width/2, dimensions.height/2);
                // Resize to half of current resolution
                const resized = await source.resize({
                    method: "fit",
                    width: dimensions.width/2,
                    height: dimensions.height/2
                });
                // Save compressed image to compressed folder and log success
                await resized.toFile(path.join(compressedFolder, files[i]));
                console.log(`> compressed ${files[i]} \n----------------`);
                successful_compressions++;
            }
            catch(e) {
                console.error(`An error occurred during compression of file "${files[i]}"`, e)
            }
        }
        console.log(`successfully compressed ${successful_compressions} files.`)
    }
    catch(e) {
        console.error("Woah, something happened!", e);
    }
})();