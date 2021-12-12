
const rows = require("fs").readFileSync(process.argv[2]).toString().split("\n");

// Extract the list of bingo numbers actually read
const numbersChosen = rows.shift().split(",").map(x => parseInt(x,10));

// console.log("numbers chosen", numbersChosen);

class Board {
    constructor(rawData) {
        // Build a list of all win scenarios,
        // where each win scenario is a set of values which will win
        const rows = rawData.map(str => str.split(" ")
            .filter(x => x.length > 0)
            .map(x => parseInt(x,10))
        );

        const winScenarios = this.winScenarios = Array.from({length: rows.length}, () => new Set());

        const unmarkedValues = this.unmarkedValues = new Set();

        rows.forEach((row, rowIdx) => {
            row.forEach((value, colIdx) => {
                unmarkedValues.add(value);
                // Add to the column winScenarios set
                winScenarios[colIdx].add(value);
            });
            // Add a win for the rowvalues
            winScenarios.push(new Set(row));
        })          
        // Add winScenarios for the diagonals
        // winScenarios.push(
        //     new Set([rows[0][0], rows[1][1], rows[2][2], rows[3][3], rows[4][4]]),
        //     new Set([rows[4][0], rows[3][1], rows[2][2], rows[1][3], rows[0][4]])
        // );
    }
    play(value) {
        // Remove this value from the unmarkedValues
        // Iterate over winScenarios to see if a win has occurred
        this.unmarkedValues.delete(value);
        let winningValue = false;
        this.winScenarios.find(winScenario => {
            winScenario.delete(value);
            if (winScenario.size === 0) {
                winningValue = value;
                this.hasWon = true;
                return true;
            }
        })
        return winningValue;
    }
    sumUnmarkedValues() {
        let total = 0;
        this.unmarkedValues.forEach(val => total = total + val);
        return total;
    }
}

const parseBoards = rows => {
    const boards = [];
    for (i = 0; i < rows.length; i = i + 6) {
        boards.push(new Board(rows.slice(i + 1, i + 6)));
    }
    return boards;
};

const boards = parseBoards(rows);

// console.log("boards", boards);

// PART 1: Find first board to win
numbersChosen.find(value => boards.find((board, boardIdx) => {
    // console.log("play value " + value + ", on board " + boardIdx);
    const result = board.play(value);
    if (result !== false) {
        const sumUnmarked = board.sumUnmarkedValues();
        console.log("PART 1: Board " + boardIdx + " has won! Winning value: " + value + ', sum of unmarked numbers: ' + sumUnmarked + ', final answer: ' + (sumUnmarked * value));
        return true;
    }
}));

// PART 2: Find last board to win
let numberIdx = 0;
let remainingBoards = new Set(boards);
outer:
while (numberIdx < numbersChosen.length) {
    let value = numbersChosen[numberIdx++];
    for (let board of remainingBoards) {
        const result = board.play(value);
        if (result !== false) {
            remainingBoards.delete(board);
            if (remainingBoards.size === 0) {
                const sumUnmarked = board.sumUnmarkedValues();
                console.log("PART 2: LAST board has won! Winning value: " + value + ', sum of unmarked numbers: ' + sumUnmarked + ', final answer: ' + (sumUnmarked * value));
                break outer;
            }
        }
    }
}