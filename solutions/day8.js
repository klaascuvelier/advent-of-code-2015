'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day8.txt').toString();
let instructions = input.split(`\n`).map(s => s.trim());

/**
 * Decode a raw input string
 * @param {string} string
 * @returns {string}
 */
function decode (string)
{
    let evaluated = null;
    eval(`evaluated = ${string}`);
    return evaluated;
}
/**
 * Encode a raw input string
 * @param {string} string
 * @returns {string}
 */
function encode (string)
{
    let output = string
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');

    return `"${output}"`;
}

// Part 1 - treat input encoded, decode were needed
const total1 = instructions
    .filter(string => /^"(.*)"$/.test(string))
    .map(instruction => ({
        codeLength: instruction.length,
        memoryLength: decode(instruction).length
    }))
    .map(lengths => lengths.codeLength - lengths.memoryLength)
    .reduce((total, length) => total + length, 0);

console.log(total1);

// Part 2 - treat input as decoded, encode were needed
const total2 = instructions
    .filter(string => /^"(.*)"$/.test(string))
    .map(instruction => ({
        codeLength: instruction.length,
        encodedLength: encode(instruction).length
    }))
    .map(lengths => lengths.encodedLength - lengths.codeLength)
    .reduce((total, length) => total + length, 0);

console.log(total2);
