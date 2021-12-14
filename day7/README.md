# Day 7

### Approach

I took the average of the positions to determine a best guess starting position, then did a sort of "gradient descent" algorithm, iteratively calculating the costs of the current position and comparing it to the costs of the right and left position, and moving the position left/right until a local minima was found.

I also memoized the result of the cost function for each position to minimize unnecessary recomputations.

## Part 1
```
time node day7.js
```

Results:
```
---------------------------------
MIN COST: 328187 was at position: 328
node day7.js --part2  0.05s user 0.01s system 98% cpu 0.059 total
```

## Part 2
```
time node day7.js --part2
```

Results:
```
---------------------------------
MIN COST: 91257582 was at position: 464
node day7.js --part2  0.13s user 0.01s system 99% cpu 0.139 total
```