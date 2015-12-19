'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day3.txt').toString();
const directions = input.split('');
const visitMap = {};
const position = { x: 0, y: 0 };

const DIRECTION = {
    LEFT: '<',
    RIGHT: '>',
    UP: '^',
    DOWN: 'v'
};

/**
 * Move Santo to his new position
 * @param {string} direction
 */
function move (direction)
{
    switch (direction) {
        case DIRECTION.LEFT:
            position.x--;
            break;

        case DIRECTION.RIGHT:
            position.x++;
            break;

        case DIRECTION.UP:
            position.y--;
            break;

        case DIRECTION.DOWN:
            position.y++;
            break;
    }
}

/**
 * Visit the house at the position Santa is at
 * @param {object} house
 */
function visit (house)
{
    const key = `${house.x}/${house.y}`;

    if (!visitMap.hasOwnProperty(key)) {
        visitMap[key] = 0;
    }

    visitMap[key]++;
}

/**
 * Get all the values from an object
 * @param {object} object
 * @returns {array}
 */
function getValues (object)
{
    const values = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            values.push(object[key]);
        }
    }

    return values;
}

// start visiting the start location
visit(position);
directions.forEach(direction => {
    move(direction);
    visit(position);
});

const atLeastOneVisit = getValues(visitMap).filter(value => value > 0).length;

console.log(atLeastOneVisit);


// Part 2
const santasDirections = directions.filter((direction, index) => index % 2 === 0);
const roboSantasDirections = directions.filter((direction, index) => index % 2 === 1);

