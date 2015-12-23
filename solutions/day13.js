'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day13.txt').toString();
const happinessMap = {};

const NEGATIVE = -1;
const POSITIVE = 1;

/**
 * Set happiness value for 2 persons
 * @param {string} from
 * @param {string} to
 * @param {number} value
 */
function setHappiness (from, to, value)
{
    if (!happinessMap.hasOwnProperty(from)) {
        happinessMap[from] = {};
    }

    happinessMap[from][to] = value;
}

/**
 * Extract info from the string
 * @param {string} string
 * @returns {Object}
 */
function getInfo (string)
{
    const parts = string.split(' ');

    return {
        from: parts[0],
        to: parts[10].split('.')[0],
        happiness: Number(parts[3]) * (parts[2] === 'gain' ? POSITIVE : NEGATIVE)
    };
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
 * Transform list of people to the happiness scores
 * @param people
 * @returns {Score}
 */
function optionsToScores (people)
{
    return people
        .map(
            (person, index, people) => {
                let happinessLeft = happinessMap[person][(people[index - 1] || people[people.length - 1])];
                let happinessRight = happinessMap[person][(people[index + 1] || people[0])];

                return happinessLeft + happinessRight
            }
        )
        .reduce((total, happiness) => total + happiness, 0);
}

// Part 1
input
    .split(`\n`)
    .map(line => getInfo(line))
    .forEach(info => setHappiness(info.from, info.to, info.happiness));

let people = Object.keys(happinessMap);

const scores1 = generatePermutations(people).map(optionsToScores);
const top1 = Math.max.apply(Math, scores1);
console.log(top1);

// Part 2
// Update the map with personal scores
happinessMap['me'] = {};
people.forEach(person => {
    happinessMap[person]['me'] = 0;
    happinessMap['me'][person] = 0;
});

people = Object.keys(happinessMap);
const scores2 = generatePermutations(people).map(optionsToScores);

// Math.max.apply can't handle the amount of items in the array, let's use reduce!
const top2 = scores2.reduce((max, score) => score > max ? score : max, 0);

console.log(top2);
