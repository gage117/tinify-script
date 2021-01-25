const fs = require('fs');
const path = require('path');
// dotenv.config gathers API key from .env file
require('dotenv').config();
const tinify = require('tinify');

const uncompressedFolder = '/uncompressed';
const compressedFolder = '/compressed'

const API_KEY = process.env.API_KEY;
tinify.key = API_KEY;

console.log(tinify.key);