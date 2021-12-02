-- Create a table with one column to hold our input data
DROP TABLE IF EXISTS day1;
CREATE TABLE If NOT EXISTS day1 (num INT8, id SERIAL, PRIMARY KEY (id));

-- Load the input data into our table
COPY day1(num) FROM '/opt/input.txt' DELIMITER ',' CSV;

-- Part 1: Compare previous row value to current using a sliding window of 1
WITH temp AS (
    SELECT (CASE WHEN (num - lag(num, 1) OVER (ORDER BY id)) > 0
            THEN true
            ELSE false END) AS is_higher
        FROM day1
) SELECT COUNT(*) as part1 FROM temp WHERE is_higher = True;

-- Part 2: Compute sums of a sliding window of 3 values to the previous sliding window's sum
WITH temp AS (
    SELECT
        num, id,
        SUM(num) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as CurrentWindowSum,
        SUM(num) OVER (ORDER BY id ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING) as PreviousWindowSum
    FROM day1
) SELECT COUNT(*) as part2
    FROM temp
    WHERE id > 3
    AND (CurrentWindowSum - PreviousWindowSum > 0);

