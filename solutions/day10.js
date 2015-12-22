'use strict';

const fs = require('fs');
const start = fs.readFileSync('../input/day10.txt').toString();


function process (input)
{
    let result = '';
    const max = input.length;

    let previous = input.charAt(0);
    let current = null;

    let counter = 0;
    let count = 1;

    while (counter < max) {
        current = input.charAt(counter + 1);

        if (previous === current) {
            count++;
        }
        else {
            // Append result + reset counter
            result += `${count}${previous}`;
            count = 1;
        }

        previous = current;
        counter++;
    }

    return result;
}


// Part 1
let string = start;
for (let counter = 0; counter < 40; counter++) {
    string = process(string);
}

console.log(string.length);

// Part 2
string = start;
for (let counter = 0; counter < 50; counter++) {
    string = process(string);
}

console.log(string.length);