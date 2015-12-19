'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day1.txt').toString();

const FLOOR_UP = 1;
const FLOOR_DOWN = -1;
const BASEMENT = -1;

let floor = 0;
let instructions = input.split('');

// Part 1
instructions.forEach(char => {
    floor += char === '(' ? FLOOR_UP : FLOOR_DOWN;
});

console.log(floor);

// Part 2
floor = 0;
let counter = 0;

while (floor !== BASEMENT) {
    counter++;
    floor += instructions.shift() === '(' ? FLOOR_UP : FLOOR_DOWN;
}

console.log(counter);