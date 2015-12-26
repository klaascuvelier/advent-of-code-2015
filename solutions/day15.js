'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day15.txt').toString();
const ingredientsMap = {};

const tmp = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

/**
 * Extract the data from an input line
 * @param {string} string
 * @returns {object}
 */
function extractData (string)
{
    const parts = string.split(': ');
    const name = parts[0];

    const data = {
        name,
        properties: {}
    };

    parts[1]
        .split(', ')
        .forEach(property => {
            const propertyPart = property.split(' ');
            data.properties[propertyPart[0]] = Number(propertyPart[1]);
        });


    return data;
}

tmp.split(`\n`).forEach(line => {
    const data = extractData(line);
    ingredientsMap[data.name] = data.properties;
});

