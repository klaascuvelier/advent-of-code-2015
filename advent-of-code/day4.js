'use strict';

const md5 = require('md5');

let number = 0;
//const key = 'abcdef';
//const key = 'pqrstuv';
const key = 'ckczppom';

function hash (number, key)
{
   const value = `${key}${number}`;
   console.log(value);
   return md5(value);
}

var hashed = hash(number, key); 

while (hashed.toString().substr(0, 5) !== '00000') {
    hashed = hash(++number, key); 
}


console.log(number);
