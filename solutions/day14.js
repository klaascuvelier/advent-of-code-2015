'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day14.txt').toString();

const tmp = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

/**
 * Calculate the distance traveled after the given amount of time
 * @param {number} time
 * @param {object} properties
 * @returns {number}
 */
function distanceAfterTime (time, properties)
{
    const totalTime = properties.REST_AFTER + properties.REST_DURATION;
    const rest = time % totalTime;
    const cycles = (time - rest) / totalTime;

    const extraRunTime = Math.min(rest, properties.REST_AFTER);
    const totalRunTime = (cycles * properties.REST_AFTER) + extraRunTime;

    return totalRunTime * properties.SPEED;
}

/**
 * Create a properties object from the input
 * @param {string} input
 * @returns {object}
 */
function inputToReindeer (input)
{
    const data = input.split(' ');

    return {
        NAME: data[0],
        SPEED: Number(data[3]),
        REST_AFTER: Number(data[6]),
        REST_DURATION: Number(data[13])
    };
}


const data = input.split(`\n`).map(inputToReindeer);
const maxTime = 2503;


// Part 1
data.forEach(reindeer => console.log(reindeer.NAME, distanceAfterTime(maxTime, reindeer)));

// Part 2
const deerMap = {};
const pointMap = {};
const names = [];

// Create reindeerMap, pointMap
data.forEach(reindeer => {
    names.push(reindeer.NAME);
    pointMap[reindeer.NAME] = 0;
    deerMap[reindeer.NAME] = reindeer;
});


for (let time = 1; time <= maxTime; time++) {
    let winningDeer = [];
    let topDistance = 0;

    names.forEach(name => {
        const distance = distanceAfterTime(time, deerMap[name]);

        if (distance === topDistance) {
            winningDeer.push(name);
        }
        else if (distance > topDistance) {
            topDistance = distance;
            winningDeer = [name];
        }
    });

    winningDeer.forEach(name => {
        pointMap[name]++;
    });
}

console.log(pointMap);