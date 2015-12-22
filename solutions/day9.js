'use strict';

const fs = require('fs');
const distanceMap = {};
const REGEX_INPUT_DATA = /^([a-z]+)\sto\s([a-z]+)\s=\s([0-9]+)/i;
const input = fs.readFileSync('../input/day9.txt').toString().split(`\n`).map(s => s.trim());

/**
 * Put the data into the distance map
 * @param {string} input
 */
function parseData (input)
{
    // No assignment destructuring in node :(
    const matches = input.match(REGEX_INPUT_DATA);
    const city1 = matches[1];
    const city2 = matches[2];
    const distance = Number(matches[3]);

    if (!distanceMap.hasOwnProperty(city1)) {
        distanceMap[city1] = {};
    }

    if (!distanceMap.hasOwnProperty(city2)) {
        distanceMap[city2] = {};
    }

    distanceMap[city1][city2] = distance;
    distanceMap[city2][city1] = distance;
}

/**
 * Generate all the possible routes
 * @param {Array.<string>} list
 * @returns {Array}
 */
function generatePermutations (list)
{
    const permutations = [];

    list.forEach(item => {
        const itemsLeft = list.filter(i => i !== item);

        if (itemsLeft.length > 0) {
            generatePermutations(itemsLeft)
                .forEach(p => {
                    p.unshift(item);
                    permutations.push(p);
                });
        }
        else {
            permutations.push([item]);
        }
    });

    return permutations;
}

/**
 * Calculate the total distances
 * @param {Array.<string>} locations
 * @returns {number}
 */
function calculateTotalDistance (locations)
{
    let total = 0;
    let prevLocation = locations[0];
    let location = null;
    for (let counter = 1; counter < locations.length; counter++)
    {
        location = locations[counter];
        total += distanceMap[prevLocation][location];

        prevLocation = location;
    }

    return total;
}

/**
 * Sort routes by distance
 * @param {object} route1
 * @param {object} route2
 * @returns {number}
 */
function distanceSort (route1, route2)
{
    let value = 0;

    if (route1.distance < route2.distance) {
        value = -1;
    }
    else if (route1.distance > route2.distance) {
        value = 1;
    }

    return value;
}

input.forEach(parseData);

const locations = Object.keys(distanceMap);
const routes = generatePermutations(locations)
    .map(locations => ({
        distance: calculateTotalDistance(locations),
        route: locations.join('-')
    }))
    .sort(distanceSort);

// Part 1
console.log(routes[0].distance);

// Part 2
console.log(routes[routes.length - 1].distance);

