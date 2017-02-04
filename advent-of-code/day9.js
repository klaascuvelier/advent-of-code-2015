'use strict';

const input = `Tristram to AlphaCentauri = 34
Tristram to Snowdin = 100
Tristram to Tambi = 63
Tristram to Faerun = 108
Tristram to Norrath = 111
Tristram to Straylight = 89
Tristram to Arbre = 132
AlphaCentauri to Snowdin = 4
AlphaCentauri to Tambi = 79
AlphaCentauri to Faerun = 44
AlphaCentauri to Norrath = 147
AlphaCentauri to Straylight = 133
AlphaCentauri to Arbre = 74
Snowdin to Tambi = 105
Snowdin to Faerun = 95
Snowdin to Norrath = 48
Snowdin to Straylight = 88
Snowdin to Arbre = 7
Tambi to Faerun = 68
Tambi to Norrath = 134
Tambi to Straylight = 107
Tambi to Arbre = 40
Faerun to Norrath = 11
Faerun to Straylight = 66
Faerun to Arbre = 144
Norrath to Straylight = 115
Norrath to Arbre = 135
Straylight to Arbre = 127`.split(`\n`);

/**
 * Class for route, has a start point and multiple stop points
 */
class Route
{
    constructor (start)
    {
        this.path = [start];
        this.distance = 0;
    }

    addStop (name, distance)
    {
        this.path.push(name);
        this.distance += distance;
    }

    clone ()
    {
        var clone = new Route(null);
        clone.path = JSON.parse(JSON.stringify(this.path));
        clone.distance = this.distance;
        return clone;
    }

    toString ()
    {
        return `${this.path.join('-')}: ${this.distance}`;
    }
}

/**
 * Converts the input info into a distance map
 * @param {Array.<String>} input
 * @returns {Object}
 */
function inputToDistanceMap (input)
{
    const result = {};

    input.forEach(data => {
        const parts = data.split(' ');

        if (!result.hasOwnProperty(parts[0])) {
            result[parts[0]] = {};
        }

        result[parts[0]][parts[2]] = parseInt(parts[4], 10);
    });

    return result;
}

function getDistance (from, to)
{
    let distance = null;

    if (distanceMap.hasOwnProperty(from) && distanceMap[from].hasOwnProperty(to)) {
        distance = distanceMap[from][to];
    }
    //else if (distanceMap.hasOwnProperty(to) && distanceMap[to].hasOwnProperty(from)) {
    //    distance = distanceMap[to][from];
    //}
    //else {
    //    throw 'distance not found';
    //}

    return distance;
}

function validateRoute (route, locations)
{
    return locations
        .filter(location => route.path.indexOf(location) === -1).length === 0;
}

/**
 * Calculate all posible routes for the specified locations
 * @param locations
 */
function calculateRoutes (locations, route)
{
    let routes = [];

    if (!route) {
        locations.forEach(currentLocation => {
            const locationsLeft = locations.filter(location => location !== currentLocation);
            let route = new Route(currentLocation);
            routes = routes.concat(calculateRoutes(locationsLeft, route));
        });
    }
    else {
        locations.forEach(currentLocation => {
            const cloned = route.clone();
            const locationsLeft = locations.filter(location => location !== currentLocation);
            const lastLocation = cloned.path[cloned.path.length - 1];
            const distance = getDistance(lastLocation, currentLocation);

            if (distance !== null) {
                cloned.addStop(
                    currentLocation,
                    distance
                );

                if (locationsLeft.length > 0) {
                    routes = routes.concat(calculateRoutes(locationsLeft, cloned));
                }
                else {
                    routes.push(cloned);
                }
            }

        });
    }

    return routes;
}


const distanceMap = inputToDistanceMap(input);
const locations = Object.keys(distanceMap);

const routes = calculateRoutes(locations);

const invalid = routes.filter(route => !validateRoute(route, locations));
const valid = routes.filter(route => validateRoute(route, locations));

const distances = valid.map(route => route.distance);
console.log(distances);
//console.log(invalid.length);
//console.log(valid.length);
//const distances = routes.map(route => route.distance);
const lowest = Math.min.apply(Math, distances);

routes.forEach(route => {
    if (route.distance == 226) {
        console.log(route);

        for (let index = 1; index < 7; index++) {
            console.log(getDistance(route.path[index - 1], route.path[index]), route.path[index - 1], route.path[index]);
        }

    }
});

console.log(lowest);

//console.log(routes.map(route => route.toString()));
//console.log(routes[0].toString());
