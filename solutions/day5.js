'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day5.txt').toString();
const strings = input.split(`\n`).map(string => string.trim());
const VALUE_NOT_FOUND = -1;

/**
 * Check if the specified string contains 3 vowels
 * @param {string} string
 * @returns {boolean}
 */
function stringContains3Vowels (string)
{
    const vowels = 'aeiou'.split('');
    const chars = string.split('');
    const inputVowels = chars.filter(char => vowels.indexOf(char) > VALUE_NOT_FOUND);

    return inputVowels.length >= 3;
}

/**
 * Check if the specified string contains at least 1 double char
 * @param {string} string
 * @returns {boolean}
 */
function stringContainsDoubleChar (string)
{
    const chars = string.split('');

    let containsDoubleChar = false;
    let previousChar = chars.shift();
    let char = chars.shift();

    while (!containsDoubleChar && char !== undefined) {
        if (previousChar === char) {
            containsDoubleChar = true;
        }

        // No assignment destructuring in node :(
        previousChar = char;
        char = chars.shift();
    }

    return containsDoubleChar;
}

/**
 * Check if the specified string does not contain any forbidden words
 * @param {string} string
 * @returns {boolean}
 */
function containsNoForbiddenWords (string)
{
    return string.indexOf('ab') === VALUE_NOT_FOUND &&
        string.indexOf('cd') === VALUE_NOT_FOUND &&
        string.indexOf('pq') === VALUE_NOT_FOUND &&
        string.indexOf('xy') === VALUE_NOT_FOUND;
}

/**
 * Check if the given string has a repeated character with another in between
 * @param {string} string
 * @returns {boolean}
 */
function stringHasRepeatedCharWithCharBetween (string)
{
    let matches = false;
    let counter = 0;

    while (!matches && counter < string.length - 2) {
        if (string.charAt(counter) === string.charAt(counter + 2)) {
            matches = true;
        }
        counter++;
    }

    return matches;
}

/**
 * Check if the string has a repeated char pair which is not overlapping
 * @param {string} string
 * @returns {boolean}
 */
function stringHasNonOverlappingRepeatedPair (string)
{
    let matches = false;
    let counter = 0;

    while (!matches && counter <= string.length - 4)
    {
        const pair = string.substr(counter, 2);

        if (string.indexOf(pair, counter + 2) > VALUE_NOT_FOUND) {
            matches = true;
        }

        counter++;
    }

    return matches;
}

/**
 * Check if a string is nice according tot the rules of part 1
 * @param {string} string
 * @returns {boolean}
 */
function stringIsNice1 (string)
{
    const has3Vowels = stringContains3Vowels(string);
    const hasDoubleChar = stringContainsDoubleChar(string);
    const hasNoBadWords = containsNoForbiddenWords(string);

    return has3Vowels && hasDoubleChar && hasNoBadWords;
}

/**
 * Check if a string is nice according tot the rules of part 1
 * @param {string} string
 * @returns {boolean}
 */
function stringIsNice2 (string)
{
    const hasNonOVerlappinRepeatedPair = stringHasNonOverlappingRepeatedPair(string);
    const hasRepeatedCharWithCharBetween = stringHasRepeatedCharWithCharBetween(string);

    return hasNonOVerlappinRepeatedPair && hasRepeatedCharWithCharBetween;
}


// Part 1
console.log(strings.filter(string => stringIsNice1(string)).length);

// Part 2
console.log(strings.filter(string => stringIsNice2(string)).length);
