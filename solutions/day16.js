'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day16.txt').toString();
const auntSueList = [];

const VALUE_NOT_FOUND = -1;

const mfcsamResults = [
    { property: 'children', value: 3 },
    { property: 'cats', value: 7 },
    { property: 'samoyeds', value: 2 },
    { property: 'pomeranians', value: 3 },
    { property: 'akitas', value: 0 },
    { property: 'vizslas', value: 0 },
    { property: 'goldfish', value: 5 },
    { property: 'trees', value: 3 },
    { property: 'cars', value: 2 },
    { property: 'perfumes', value: 1 }
];

const tmp = `Sue 1: cars: 9, akitas: 3, goldfish: 0
Sue 2: akitas: 9, children: 3, samoyeds: 9`;

/**
 * Extract the data from an input line
 * @param {string} string
 * @returns {object}
 */
function extractData (string)
{
    const parts = string.split(': ');
    const name = parts.shift();
    const auntSue = { name };


    parts.join(': ')
        .split(', ')
        .forEach(property => {
            const propertyPart = property.split(': ');
            auntSue[propertyPart[0]] = Number(propertyPart[1]);
        });

    auntSueList.push(auntSue);
}

/**
 * Filter method
 * @param {string} property
 * @param {string} value
 * @returns {function}
 */
function filterProperty (property, value)
{
    return function propertyFilterFunction (item)
    {
        return !item.hasOwnProperty(property) || item[property] === value;
    }
}

input.split(`\n`).forEach(extractData);

// Part 1
let aunts = auntSueList;

mfcsamResults.forEach(result => {
    aunts = aunts.filter(filterProperty(result.property, result.value));
});

console.log(aunts);


// Part 2
aunts = auntSueList;

mfcsamResults.forEach(result => {
    const property = result.property;
    const value = result.value;

    if ([ 'cats', 'trees' ].indexOf(property) > VALUE_NOT_FOUND) {
        aunts = aunts.filter(item => !item.hasOwnProperty(property) || value < item[property]);
    }
    else if ([ 'pomeranians', 'goldfish' ].indexOf(property) > VALUE_NOT_FOUND) {
        aunts = aunts.filter(item => !item.hasOwnProperty(property) || value > item[property]);
    }
    else {
        aunts = aunts.filter(filterProperty(property, value));
    }
});


console.log(aunts);