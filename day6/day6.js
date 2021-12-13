// Model the population by a single array
// where each item is the number of fish with that index number of days remaining.
const state = Array(9).fill(0);

// Load input population into state
require("fs").readFileSync("input.txt").toString()
    .split(",").forEach(x=> state[parseInt(x,10)] += 1);

const sumArray = arr => arr.reduce((acc, curr) => acc + curr, 0);
const PART1 = 80, PART2 = 256;

// Run simulation
let i = 0;
while (i < PART2) {
    const prev = state.shift();
    state.push(prev);
    state[6] += prev;
    i++;
    // Record total population on target days by summing individuals in each day
    if (i === PART1 || i === PART2) {
        console.log("TOTAL FISH after " + i + " days: " + sumArray(state));
    }
}
