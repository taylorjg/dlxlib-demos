# DLX Matrix Details

## Rows

### Description

We have a DLX matrix row for each possible path joining two dots of the same colour.
The row specifies which grid squares are covered by the path (including the dots themselves).
The number of rows in a solution will match the number of pairs of dots.

### Size

For an `n` x `n` puzzle with `c` pairs of dots:

| Description | Count | Example (n = 5, c = 5) | Example (n = 8, c = 8) |
| --- | :-: | :-: | :-: |
| Number of rows in a solution | c | 5 | 8 |

## Columns

### Description

As mentioned above, a row describes a path between two dots of the same colour and identifies the grid
squares that make up the path. This includes the dots themselves. We need to ensure that the entire grid
is covered. Hence, there is a column per grid square. No further columns are needed.

### Size

For an `n` x `n` puzzle with `c` pairs of dots:

| Description | Count | Example (n = 5, c = 5) | Example (n = 8, c = 8) |
| --- | :-: | :-: | :-: |
| Number of primary columns | n * n | 25 | 64 |
| Number of secondary columns | 0 | 0 | 0 |
| Total number of columns | n * n | 25 | 64 |
