const input = require("fs").readFileSync("input.txt").toString().split(",").map(x=>parseInt(x,10));
const state = Array(9).fill(0);
input.forEach(n => state[n] += 1);

const part1 = 80;
const part2 = 256;

const sumArray = arr => arr.reduce((acc, curr) => acc + curr, 0);

let i = 0;
while (i < part2) {
    const prev = state.shift();
    state.push(prev);
    state[6] += prev;
    i++;
    if (i === part1 || i === part2) {
        console.log("TOTAL FISH after " + i + " days: " + sumArray(state));
    }
}
