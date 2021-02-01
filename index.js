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
        console.log("files to compress:", files, '\n\n----------------');
        let successfulCompressions = 0;
        for (let i = 0; i < files.length; i++) {
            try {
                console.log(`> compressing ${files[i]}`)
                const source = await tinify.fromFile(path.join(uncompressedFolder, files[i]));
                
                // Get current image dimensions to maintain aspect ratio while resizing
                let originalDimensions = sizeOf(path.join(uncompressedFolder, files[i]));
                let targetDimensions = {
                    width: originalDimensions.width/2,
                    height: originalDimensions.height/2
                }
                console.log(`> image dimensions:`, originalDimensions.width, originalDimensions.height);
                console.log(`> target dimensions:`, targetDimensions.width, targetDimensions.height)
                
                // Resize to half of current resolution
                const resized = await source.resize({
                    method: "fit",
                    width: targetDimensions.width,
                    height: targetDimensions.height
                });

                // Save compressed image to compressed folder and log success
                await resized.toFile(path.join(compressedFolder, files[i]));
                console.log(`> successfully compressed ${files[i]} \n----------------`);
                successfulCompressions++;
            }
            catch(e) {
                console.error(`An error occurred during compression of file "${files[i]}"`, e)
            }
        }
        console.log(`successfully compressed ${successfulCompressions} files.`)
    }
    catch(e) {
        console.error("Woah, something happened!", e);
    }
})();