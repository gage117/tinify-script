# tinify-script

## This script uses the tinify API to resize and compress files from a designated 'uncompressed' folder and save them to another designated 'compressed' folder. Folder locations and resizing can be adjusted as appropriate.

### Requirements
---
- Node
- Tinify API Key

### Setup
---
1. Clone repository
2. Install dependencies (`npm install`)
3. Get API key from tinify and include it in a .env file

### Use
---
1. Populate **uncompressed** folder with images to compress or change file paths to your own uncompressed folder if needed.
2. Run the script, optionally passing in an argument for the resize.
    - By default, the script will compress but not resize. Running (`node index.js`) will use the default resize factor of 1 (i.e.: 100%).
    - You can pass in a third argument when running the script (`node index.js <3rd arg>`) will allow you to define either:
        - a Resolution to resize it to in [width]x[height] format (`node index.js 1920x1080`) 
        - or a Resize factor (`node index.js .25`) for 25% or original resolution or (`node index.js 1.4`) for 140%.

### Notes
---
- Don't delete the .gitignore file from the uncompressed folder without adjusting the code, the code automatically takes into account the .gitignore file when it parses the folder and removes it from the array.

### Author
[gage117](https://github.com/gage117)

### License
---
MIT License

Copyright (c) 2021 Gage Eide

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
