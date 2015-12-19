'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day2.txt').toString();
const giftsDimensions = input
    .split(`\n`)
    .map(dimensionString => dimensionString
        .split('x')
        .map(lengthString => Number(lengthString))
    );

/**
 * Calculate the wrapping paper needed for the given dimensions
 * Caculate the sum of the surfaces + add the smalles surface as extra paper
 *
 * @param {Array.<number>} giftDimensions
 * @returns {number}
 */
function calculatePaperNeeded (giftDimensions)
{
    const surfaces = [
        giftDimensions[0] * giftDimensions[1],
        giftDimensions[1] * giftDimensions[2],
        giftDimensions[2] * giftDimensions[0]
    ];

    const smallestSurface = Math.min.apply(Math, surfaces);

    return smallestSurface + surfaces.reduce((total, surface) => {
            return total + surface;
        }, 0) * 2;
}

/**
 * Method to calculate the ribbon needed for a gift
 *
 * @param {Array.<number>} giftDimensions
 * @returns {number}
 */
function calculateRibbon (giftDimensions)
{
    const bow = giftDimensions.reduce((total, length) => total * length, 1);
    const distance = giftDimensions
        .sort((item1, item2) => item1 > item2)
        .slice(0, 2)
        .reduce((total, length) => total + (2 * length), 0);

    return bow + distance;
}

// Part 1, total gift wrapping paper
const paperTotal = giftsDimensions
    .reduce((total, dimension) => {
        return total + calculatePaperNeeded(dimension);
    }, 0);

console.log(paperTotal);

// Part 2, total ribbon length
const ribbonTotal = giftsDimensions
    .reduce((total, dimension) => {
       // console.log(total, dimension, calculateRibbon(dimension));
        return total + calculateRibbon(dimension);
    }, 0);

console.log(ribbonTotal);
