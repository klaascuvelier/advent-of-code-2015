const startCode = 20151125;
const multiplier = 252533;
const divident = 33554393;

/**
 * Generate the next code by using the previous one
 * @param {number} previousCode
 * @return {number}
 */
function nextCode (previousCode)
{
    return (previousCode * multiplier) % 33554393;
}

console.log(nextCode(startCode));