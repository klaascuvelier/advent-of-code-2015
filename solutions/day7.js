'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day7.txt').toString();

const REGEX_VARIABLE_AND_OR = /([a-z]+)\s(AND|OR)\s([a-z]+)/;
const REGEX_VALUE_AND_OR = /([0-9]+)\s(AND|OR)\s([a-z]+)/;
const REGEX_VARIABLE_ASSIGNMENT = /^[a-z]+$/;
const REGEX_VALUE_ASSIGNMENT = /^[0-9]+$/;
const REGEX_NOT_VARIABLE_ASSIGNMENT = /^NOT\s([a-z]+)$/;
const REGEX_SHIFT_ASSIGNMENT = /^([a-z]+)\s(RSHIFT|LSHIFT)\s([0-9]+)$/;

let values = {};
let instructions = input.split(`\n`).map(string => string.trim());

function evaluateInstruction(instructions, instruction)
{
    // no assignment destructuring
    const parts = instruction.split(' -> ');
    const expression = parts[0];
    const variable = parts[1];

    let evaluated = false;

    if (REGEX_VARIABLE_ASSIGNMENT.test(expression)) {
        if (values.hasOwnProperty(expression)) {
            values[variable] = values[expression];
            evaluated = true;
        }
    }
    else if (REGEX_VALUE_ASSIGNMENT.test(expression)) {
        values[variable] = Number(expression);
        evaluated = true;
    }
    else if (REGEX_NOT_VARIABLE_ASSIGNMENT.test(expression)) {
        const matches = expression.match(REGEX_NOT_VARIABLE_ASSIGNMENT);

        if (values.hasOwnProperty(matches[1])) {
            values[variable] = ~values[matches[1]];
            evaluated = true;
        }
    }
    else if (REGEX_VARIABLE_AND_OR.test(expression)) {
        const matches = expression.match(REGEX_VARIABLE_AND_OR);

        if (values.hasOwnProperty(matches[1]) && values.hasOwnProperty(matches[3])) {
            if (matches[2] === 'OR') {
                values[variable] = values[matches[1]] | values[matches[3]];
                evaluated = true;
            }
            else if (matches[2] === 'AND') {
                values[variable] = values[matches[1]] & values[matches[3]];
                evaluated = true;
            }
        }
    }
    else if (REGEX_VALUE_AND_OR.test(expression)) {
        const matches = expression.match(REGEX_VALUE_AND_OR);

        if (values.hasOwnProperty(matches[3])) {
            if (matches[2] === 'OR') {
                values[variable] = Number(matches[1]) | values[matches[3]];
                evaluated = true;
            }
            else if (matches[2] === 'AND') {
                values[variable] = Number(matches[1]) & values[matches[3]];
                evaluated = true;
            }
        }
    }
    else if (REGEX_SHIFT_ASSIGNMENT.test(expression)) {
        const matches = expression.match(REGEX_SHIFT_ASSIGNMENT);

        if (values.hasOwnProperty(matches[1])) {
            if (matches[2] === 'LSHIFT') {
                values[variable] = values[matches[1]] << Number(matches[3]);
                evaluated = true;
            }
            else if (matches[2] === 'RSHIFT') {
                values[variable] = values[matches[1]] >> Number(matches[3]);
                evaluated = true;
            }
        }
    }
    else {
        throw new Error(`instruction not implemented: ${instruction}`);
    }

    // When the instruction could not be evaluated yet, push it in the list again
    if (!evaluated) {
        instructions.push(instruction);
    }

    for (let key in values) {
        if (values[key] < 0) {
            values[key] = 65535 + values[key] + 1;
        }
        else if (values[key] > 65535) {
            console.log('overflow');
            values[key] -= 65535;
        }
    }

    return instructions;
}


// Part 1
let previousLength = instructions.length + 1;
while (instructions.length > 0 && instructions.length < previousLength) {
    previousLength = instructions.length;
    instructions = instructions.reduce(evaluateInstruction, []);
}

const a1 = values.a;
console.log(a1);

// Part 2 - update b instruction
instructions = input.split(`\n`)
    .map(string => string.trim())
    .map(instruction => {
        if (/\s->\sb$/.test(instruction)) {
            instruction = `${a1} -> b`;
        }

        return instruction;
    });

previousLength = instructions.length + 1;
values = {};

while (instructions.length > 0 && instructions.length < previousLength) {
    previousLength = instructions.length;
    instructions = instructions.reduce(evaluateInstruction, []);
}

const a2 = values.a;
console.log(a2);