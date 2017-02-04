'use strict';

const fs = require('fs');
const input = fs.readFileSync('../input/day21.txt').toString();

/**
 * Class for player items
 */
class Item
{
    constructor (name, cost, damage, armor)
    {
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.armor = armor;
    }
}

/**
 * Class for the player
 */
class Player
{
    constructor (name, hitpoints, damage, armor)
    {
        this.name = name;
        this.hitpoints = hitpoints;
        this.damage = damage;
        this.armor = armor;
        this.costs = 0;
        this.items = [];
    }

    addItem (item)
    {
        this.items.push(item);
        this.damage += item.damage;
        this.armor += item.armor;
        this.costs += item.costs;
    }
}

const weapons = [
    new Item('dagger', 8, 4, 0),
    new Item('shortsword', 10, 5, 0),
    new Item('warhammer', 25, 6, 0),
    new Item('longsword', 40, 7, 0),
    new Item('greataxe', 74, 8, 0)
];

const armor = [
    new Item('none', 0, 0, 0),
    new Item('leather', 13, 0, 1),
    new Item('chainmail', 31, 0, 2),
    new Item('splintmail', 53, 0, 3),
    new Item('bendedmail', 75, 0, 4),
    new Item('platemail', 102, 0, 5)
];

const rings = [
    new Item('none', 0, 0, 0),
    new Item('none', 0, 0, 0),
    new Item('damage + 1', 25, 1, 0),
    new Item('damage + 2', 50, 2, 0),
    new Item('damage + 3', 100, 3, 0),
    new Item('defense + 1', 20, 1, 0),
    new Item('defense + 2', 40, 2, 0),
    new Item('defense + 3', 80, 3, 0)
];

const player = new Player('player', 100, 0, 0);
const enemy = new Player('enemy', 103, 9, 2);

/**
 * Battle 2 players until hitpoints of 1p is below 0
 * @param {Player} p1
 * @param {Player} p2
 * @returns {[Player, Player]}
 */
function battle (p1, p2)
{
    const player1 = new Player(p1.name, p1.hitpoints, p1.damage, p1.armor);
    const player2 = new Player(p2.name, p2.hitpoints, p2.damage, p2.armor);
    let rounds = 0;

    while (player1.hitpoints > 0 && player2.hitpoints > 0) {
        if (rounds % 2 === 0) {
            let damage = Math.max(player1.damage - player1.armor, 1);
            player2.hitpoints -= damage;
        }
        else {
            let damage = Math.max(player2.damage - player2.armor, 1);
            player1.hitpoints -= damage;
        }

        rounds++
    }

    if (player2.hitpoints < 0 && player1.hitpoints < 0) {
        console.log('amn')
    }

    return [player1, player2];
}

/**
 * Check if the player would win in a battle
 * @param {Player} player
 * @param {Player} enemy
 */
function playerWins (player, enemy)
{
    return battle(player, enemy)[0].hitpoints > 0;
}


function createCombinations ()
{
    const combinations = [];

    weapons.forEach(weapon => {
        armor.forEach(armor => {
            rings.forEach(ring1 => {
                const ringsLeft = rings.filter(ring => ring !== ring1);
                ringsLeft.forEach(ring2 => {
                    combinations.push([weapon, armor, ring1, ring2]);
                });
            });
        });
    });

    return combinations;
}

const combinations = createCombinations();

const winningCombinations = combinations.filter(items => {
    const playerClone = new Player(player.name, player.hitpoints, player.damage, player.armor);
    items.forEach(item => playerClone.addItem(item));

    return playerWins(playerClone, enemy);
});

let winningCombinationCosts = winningCombinations.map(items => {
    return items.map(item => item.cost).reduce((total, cost) => total + cost, 0)
});

console.log(winningCombinationCosts.length);

winningCombinationCosts = winningCombinationCosts.sort((item1, item2) => {
    if (item1 > item2) {
        return -1;
    }
    else if (item2 > item1) {
        return 1;
    }
    return 0;
});

console.log(winningCombinationCosts);