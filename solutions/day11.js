'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day11.txt').toString();

const CHAR_CODE_A = 'a'.charCodeAt(0);
const CHAR_CODE_Z = 'z'.charCodeAt(0);
const VALUE_NOT_FOUND = -1;

/**
 * Check if a string has an increasing straight of characters
 * @param {string} string
 * @returns {boolean}
 */
function stringHasIncreasingStraightString (string)
{
    let counter = 0;
    let char1 = null;
    let char2 = null;
    let char3 = null;
    let hasStraight = false;

    while (!hasStraight && counter <= string.length - 3) {

        char1 = string.charCodeAt(counter);
        char2 = string.charCodeAt(counter + 1);
        char3 = string.charCodeAt(counter + 2);

        if (char1 >= CHAR_CODE_A && char1 <= CHAR_CODE_Z && char2 === char1 + 1 && char3 === char2 + 1) {
            hasStraight = true;
        }

        counter++;
    }

    return hasStraight;
}

/**
 * Verify a string has not forbidden characters
 * @param string
 */
function stringHasNoForbiddenChars (string)
{
    return string.indexOf('i') === VALUE_NOT_FOUND &&
        string.indexOf('o') === VALUE_NOT_FOUND &&
        string.indexOf('l') === VALUE_NOT_FOUND;
}

/**
 * Count the amount of non-overlapping character pairs
 * @param {string} string
 * @returns {number}
 */
function countNonOverlappingPairs (string)
{
    let charIndex = 0;
    let pairCounter = 0;

    while (charIndex < string.length - 1) {

        // When char matches next (aka is a pair), increment the pair counter and the charIndex (for no overlap)
        if (string.charAt(charIndex) === string.charAt(charIndex + 1)) {
            charIndex++;
            pairCounter++;
        }

        charIndex++;
    }

    return pairCounter;
}

/**
 * Verify is a string would be a valid password
 * @param {string} string
 * @returns {boolean}
 */
function isValidPassword (string)
{
    const pairCount = countNonOverlappingPairs(string);
    const hasNoForbiddenChars = stringHasNoForbiddenChars(string);
    const hasStraight = stringHasIncreasingStraightString(string);

    if (pairCount >= 2 && hasNoForbiddenChars && hasStraight) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Increase the current string like counting numbers
 * @param {string} string
 * @returns {string}
 */
function increaseString (string)
{
    //let chars = string.split('').map(char => char.charCodeAt(0));

    let index = string.length - 1;
    let previousIndex = null;
    let charCode = null;

    while (index !== previousIndex && index >= 0) {
        charCode = string.charCodeAt(index);

        if (++charCode > CHAR_CODE_Z) {
            string = string.slice(0, index) + String.fromCharCode(CHAR_CODE_A) + string.slice(index + 1);
            previousIndex = index;
            index--;
        }
        else {
            string = string.slice(0, index) + String.fromCharCode(charCode) + string.slice(index + 1);
            previousIndex = index;
        }
    }

    return string;
}

// Part 1
let string = input;

while (!isValidPassword(string)) {
    string = increaseString(string);
}
console.log(string);

// Part 2

string = increaseString(string);
while (!isValidPassword(string)) {
    string = increaseString(string);
}
console.log(string);