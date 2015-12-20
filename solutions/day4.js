'use strict';

const fs = require('fs');
const md5 = require('md5');
const input = fs.readFileSync('../input/day4.txt').toString();

/**
 * Calculate the hash for the specified key and number
 * @param {number} number
 * @param {string} key
 */
function hash (number, key)
{
    return md5(`${key}${number}`);
}

// Part 1
let counter = 0;
let hashed = hash(counter, input);

while (hashed.substr(0, 5) !== '00000') {
    hashed = hash(++counter, input);
}

console.log(counter);

// Part 2
counter = 0;
hashed = hash(counter, input);

while (hashed.substr(0, 6) !== '000000') {
    hashed = hash(++counter, input);
}

console.log(counter);