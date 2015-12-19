'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day3.txt').toString();
const directions = input.split('');
let visitMap = {};
let santasPosition = { x: 0, y: 0 };
let santasRobotsPosition = { x: 0, y: 0 };

const DIRECTION = {
    LEFT: '<',
    RIGHT: '>',
    UP: '^',
    DOWN: 'v'
};

/**
 * Move Santo to his new santasPosition
 * @param {object} position
 * @param {string} direction
 */
function move (position, direction)
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

    return position;
}

/**
 * Visit the house at the santasPosition Santa is at
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
visit(santasPosition);
directions.forEach(direction => {
    santasPosition = move(santasPosition, direction);
    visit(santasPosition);
});

let atLeastOneVisit = getValues(visitMap).filter(value => value > 0).length;

console.log(atLeastOneVisit);

//2565

// Part 2
santasPosition = { x: 0, y: 0 };
visitMap = {};

visit(santasPosition);
visit(santasRobotsPosition);

directions.forEach((direction, index) => {
    if (index % 2 === 0) {
        santasPosition = move(santasPosition, direction);
        visit(santasPosition);
    }
    else {
        santasRobotsPosition = move(santasRobotsPosition, direction);
        visit(santasRobotsPosition);
    }
});

atLeastOneVisit = getValues(visitMap).filter(value => value > 0).length;

console.log(atLeastOneVisit);
