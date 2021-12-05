const fs = require('fs');

class Counter {
    increment(val, row) {
        if (!this.vals) this.vals = {};
        let rowsForVal = this.vals[val];
        if (!rowsForVal) {
            rowsForVal = this.vals[val] = [];
        };
        rowsForVal.push(row);
    }
    findMax() {
        return this.analyze((zerosLength, onesLength) => {
            return onesLength >= zerosLength ? 1 : 0;
        });
    }
    findMin() {
        return this.analyze((zerosLength, onesLength) => {
            return zerosLength <= onesLength ? 0 : 1;
        });
    }
    analyze(comparator) {
        let zeroes = this.vals[0],
            ones = this.vals[1],
            zerosLength = zeroes.length,
            onesLength = ones.length,
            val = comparator(zerosLength, onesLength);
        return {
            val,
            rows: val === 1 ? ones : zeroes,
        }
    }
}

const input = fs.readFileSync(process.argv[2]).toString().split("\n")
    .map(x => x.split("").map(y => parseInt(y, 2)));
const charsPerRow = input[0].length;

const analyzeData = data => 
    data
        .reduce((acc, curr) => {
            curr.forEach((val, idx) => acc[idx].increment(val, curr));
            return acc;
        }, Array.from({length: charsPerRow}, () => new Counter()));

// Part 1
const maxVals = analyzeData(input).map(x => x.findMax().val);
const gamma = parseInt(maxVals.join(""), 2);
const epsilon = parseInt(maxVals.map(x => x == "0" ? "1" : "0").join(""), 2);

console.log("gamma rating", gamma);
console.log("epsilon rating", epsilon);
console.log('power consumption', gamma * epsilon);

// Part 2

// Iteratively parse the rows to find the min and max of each bit and the rows which match it
const determineRating = (data, parseFunction) => {
    let i = 0;
    let rows = data;
    while (i < charsPerRow) {
        let iterResults = analyzeData(rows);
        rows = parseFunction(iterResults[i]).rows;
        if (rows.length === 1) break;
        i++
    }
    return parseInt(rows[0].join(""), 2);
};
const o2Rating = determineRating(input, x => x.findMax());
const co2Rating = determineRating(input, x => x.findMin());
console.log("O2 rating", o2Rating);
console.log("CO2 rating", co2Rating);
console.log("life support rating", o2Rating * co2Rating);
