'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day6.txt').toString();
const instructions = input.split(`\n`).map(string => string.trim());

const size = 1000;
const grid = Array(size * size);

const LIGHT_ON = 1;
const LIGHT_OFF = 0;

/**
 * Turn on a specific light
 * @param {number} row
 * @param {number} column
 */
function turnOn (row, column)
{
    grid[row * size + column] = LIGHT_ON;
}

/**
 * Turn off a specific light
 * @param {number} row
 * @param {number} column
 */
function turnOff (row, column)
{
    grid[row * size + column] = LIGHT_OFF;
}

/**
 * Toggle the state of a specific light
 * @param {number} row
 * @param {number} column
 */
function toggle (row, column)
{
    const position = row * size + column;

    if (grid[position] === LIGHT_OFF) {
        grid[position] = LIGHT_ON;
    }
    else {
        grid[position] = LIGHT_OFF;
    }

}

/**
 * Turn on a square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function turnOnSquare (fromRow, fromColumn, toRow, toColumn)
{
    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            turnOn(row, column);
        }
    }
}

/**
 * Turn off a square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function turnOffSquare (fromRow, fromColumn, toRow, toColumn)
{
    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            turnOff(row, column);
        }
    }
}

/**
 * Toggle a square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function toggleSquare (fromRow, fromColumn, toRow, toColumn)
{

    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            toggle(row, column);
        }
    }
}

/**
 * Increase the brightness by 1
 * @param {number} row
 * @param {number} column
 */
function upBrightness (row, column)
{
    grid[row * size + column] += 1;
}

/**
 * Decrease the brightness by 1
 * @param {number} row
 * @param {number} column
 */
function lowerBrightness (row, column)
{
    grid[row * size + column] = grid[row * size + column] > 1 ? grid[row * size + column] - 1 : 0;
}

/**
 * Up the brightness by 2
 * @param {number} row
 * @param {number} column
 */
function upBrightnessBy2 (row, column)
{
    grid[row * size + column] += 2;
}

/**
 * Up the brigtness for a square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function upBrightnessSquare (fromRow, fromColumn, toRow, toColumn)
{
    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            upBrightness(row, column);
        }
    }
}

/**
 * Decrease the brightenss for square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function lowerBrightnessSquare (fromRow, fromColumn, toRow, toColumn)
{
    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            lowerBrightness(row, column);
        }
    }
}

/**
 * Up the brightness by 2 for a square of lights
 * @param {number} fromRow
 * @param {number} fromColumn
 * @param {number} toRow
 * @param {number} toColumn
 */
function upBrightnessBy2Square (fromRow, fromColumn, toRow, toColumn)
{

    for (let row = fromRow; row <= toRow; row++) {
        for (let column = fromColumn; column <= toColumn; column++) {
            upBrightnessBy2(row, column);
        }
    }
}

/**
 * Evaluate an instruction
 * @param {string} instruction
 */
function evaluateInstructionPart1 (instruction)
{
    const parts = instruction.split(' ');
    // No assignment destructuring :(
    const from = parts[parts.length - 3].split(',').map(n => Number(n));
    const to = parts[parts.length - 1].split(',').map(n => Number(n));

    if (parts[0] === 'toggle') {
        toggleSquare(from[0], from[1], to[0], to[1]);
    }
    else if (parts[1] === 'on') {
        turnOnSquare(from[0], from[1], to[0], to[1]);
    }
    else if (parts[1] === 'off') {
        turnOffSquare(from[0], from[1], to[0], to[1]);
    }
}

/**
 * Evaluate an instruction
 * @param {string} instruction
 */
function evaluateInstructionPart2 (instruction)
{
    const parts = instruction.split(' ');
    // No assignment destructuring :(
    const from = parts[parts.length - 3].split(',').map(n => Number(n));
    const to = parts[parts.length - 1].split(',').map(n => Number(n));

    if (parts[0] === 'toggle') {
        upBrightnessBy2Square(from[0], from[1], to[0], to[1]);
    }
    else if (parts[1] === 'on') {
        upBrightnessSquare(from[0], from[1], to[0], to[1]);
    }
    else if (parts[1] === 'off') {
        lowerBrightnessSquare(from[0], from[1], to[0], to[1]);
    }
}


// Part 1

turnOffSquare(0, 0, size - 1, size - 1);
instructions.forEach(instruction => evaluateInstructionPart1(instruction));
const lightsOn = grid.filter(state => state === LIGHT_ON);

console.log(lightsOn.length);

// Part 2
turnOffSquare(0, 0, size - 1, size - 1);
instructions.forEach(instruction => evaluateInstructionPart2(instruction));
const totalBrightness = grid.reduce((total, brightness) => total + brightness, 0);

console.log(totalBrightness);