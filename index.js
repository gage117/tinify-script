const fs = require('fs');
const path = require('path');
// dotenv.config gathers API key from .env file
require('dotenv').config();
const tinify = require('tinify');
const sizeOf = require('image-size');
const { type } = require('os');

// Declare resizeArg to be eiher the 3rd argument sent in, or .5 by default
let resizeArg = process.argv[2] || '1';
// Check if resizeArg is a string with a 'x' in it, indicating the resize arg is formatted <width>x<height>
if (resizeArg.includes('x') || resizeArg.includes('X')) {
    // replace uppercase X with lowercase x to make the logic leaner 
    if (resizeArg.includes('X')) resizeArg = resizeArg.replace('X', 'x');
    try {
        // Split resoution string at x and turns returned strings into numbers
        const resolutionArray = resizeArg.split('x');
        if (resolutionArray.length > 2) throw new Error("Too many arguments provided for resolution resize");
        resolutionArray[0] = Number(resolutionArray[0]);
        resolutionArray[1] = Number(resolutionArray[1]);
        resizeArg = resolutionArray;
    }
    catch(e) {
        console.error(e)
        throw new Error("Resolution resize arg not formatted correctly. The correct format is <width>x<height> e.g.: 1920x1080 or a resolution multiplier e.g.: .25 or 1.4");
    }
} else {
    try {
        resizeArg = Number(resizeArg);
    }
    catch(e) {
        throw new Error("Resolution resize arg not formatted correctly. The correct format is <width>x<height> e.g.: 1920x1080 or a resolution multiplier e.g.: .25 or 1.4");
    }
}

tinify.key = process.env.API_KEY;

const uncompressedFolder = './uncompressed';
const compressedFolder = './compressed';

// COMPRESSION TIME!
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
                let targetDimensions;
                // Check which format resizeArg is using and assign targetDimensions accordingly
                if (typeof resizeArg === 'number') {
                    targetDimensions = {
                        width: Math.floor(originalDimensions.width*resizeArg),
                        height: Math.floor(originalDimensions.height*resizeArg)
                    }
                } else {
                    targetDimensions = {
                        width: Math.floor(resizeArg[0]),
                        height: Math.floor(resizeArg[1])
                    }
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