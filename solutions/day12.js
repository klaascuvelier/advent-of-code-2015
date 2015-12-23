'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day12.txt').toString();
const REGEX_NUMBER = /(\-?[0-9]+)/g;

/**
 * Get the numbers from a specific string
 * @param string
 * @returns {Array}
 */
function getNumbers (string)
{
    return string.match(REGEX_NUMBER) || [];
}

/**
 * Returns the sum of all numbers in the string
 * @param {string} string
 * @returns {number}
 */
function getSumOfNumbersInString (string)
{
    return getNumbers(string)
        .map(number => Number(number))
        .reduce((total, number) => total + number, 0)
}

/**
 * Clean up an object (array/object/value) - remove the values with red according to the spec
 * @param {*} object
 * @returns {*}
 */
function clean (object)
{
    if (typeof object === 'object' && typeof object.length === 'number') {
        // array
        object = object.map(item => clean(item));
    }
    else if (typeof object === 'object') {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] === 'red') {
                    return {};
                }
                else {
                    object[key] = clean(object[key]);
                }
            }
        }
    }

    return object;
}

// Part 1
console.log(getSumOfNumbersInString(input));

// Part 2
let data = JSON.parse(input);
data = clean(data);
data = JSON.stringify(data);

console.log(getSumOfNumbersInString(data));

