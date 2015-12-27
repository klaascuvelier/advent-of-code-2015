'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day23.txt').toString();
const REGEX_HLF = /^hlf\s(a|b)$/;
const REGEX_TPL = /^tpl\s(a|b)$/;
const REGEX_INC = /^inc\s(a|b)$/;
const REGEX_JMP = /^jmp\s(-|\+)([0-9]+)$/;
const REGEX_JIE = /^jie\s(a|b),\s(-|\+)([0-9]+)$/;
const REGEX_JIO = /^jio\s(a|b),\s(-|\+)([0-9]+)$/;

const tmp = `inc a
jio a, +2
tpl a
inc a`;

const instructions = input.split(`\n`).map(line => line.trim());

/**
 * Execute instruction based on the state, returns the updated state
 * @param {object} instruction
 * @returns {object}
 */
function execute (state)
{
    const result = {
        a: state.a,
        b: state.b,
        index: state.index
    };

    const instruction = instructions[state.index];

    if (instruction.match(REGEX_HLF)) {
        const variable = instruction.match(REGEX_HLF)[1];

        result[variable] /= 2;
        result.index++;
    }
    else if (instruction.match(REGEX_TPL)) {
        const variable = instruction.match(REGEX_TPL)[1];

        result[variable] *= 3;
        result.index++;
    }
    else if (instruction.match(REGEX_INC)) {
        const variable = instruction.match(REGEX_INC)[1];

        result[variable]++;
        result.index++;
    }
    else if (instruction.match(REGEX_JMP)) {
        const matches = instruction.match(REGEX_JMP);
        const offset = (matches[1] === '+' ? 1 : -1) * Number(matches[2]);

        result.index += offset;
    }
    else if (instruction.match(REGEX_JIE)) {
        const matches = instruction.match(REGEX_JIE);
        const variable = matches[1];
        const offset = (matches[2] === '+' ? 1 : -1) * Number(matches[3]);

        if (state[variable] % 2 === 0) {
            result.index += offset;
        }
        else {
            result.index++;
        }
    }
    else if (instruction.match(REGEX_JIO)) {
        const matches = instruction.match(REGEX_JIO);
        const variable = matches[1];
        const offset = (matches[2] === '+' ? 1 : -1) * Number(matches[3]);

        if (state[variable] === 1) {
            result.index += offset;
        }
        else {
            result.index++;
        }
    }
    else {
        throw new Error(`Instruction ${instruction} not implemented`);
    }

    return result;
}


// Part 1
let state = {
    a: 0,
    b: 0,
    index: 0
};

while (instructions.length > state.index) {
    state = execute(state);
}

console.log(state.b);

// Part 2 - set a to 1
state = {
    a: 1,
    b: 0,
    index: 0
};

while (instructions.length > state.index) {
    state = execute(state);
}

console.log(state.b);