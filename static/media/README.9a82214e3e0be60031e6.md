## Rows

### Description

Each row in the matrix describes a possible board location for a single queen.
Since we need to place `n` queens, each solution will contain `n` matrix rows.

### Size

For an `n` x `n` puzzle:

| Description | Count | Example (n = 4) | Example (n = 8) |
| --- | :-: | :-: | :-: |
| Number of rows in a solution | n | 4 | 8 |

## Columns

### Primary Columns

We need `n` columns to represent the board rows to ensure that we have covered all rows.
Similarly, we need need `n` columns to represent the board columns to ensure that we have covered all columns.

### Secondary Columns

We use secondary columns enforce the diagonal constraints.
When `n` is 4, we have 5 columns for the top-right-to-bottom-left diagonals and
a further 5 columns for the top-left-to-bottom-right diagonals.

The following diagram shows the mapping from board locations to top-right-to-bottom-left diagonals.
Note the two corner blanks - we don't need to check these board locations.

```
  0 1 2
0 1 2 3
1 2 3 4
2 3 4 
```

The following diagram shows the mapping from board locations to top-left-to-bottom-right diagonals.
Note the two corner blanks - we don't need to check these board locations.

```
2 1 0
3 2 1 0
4 3 2 1
  4 3 2
```

### Size

For an `n` x `n` puzzle:

| Description | Count | Example (n = 4) | Example (n = 8) |
| --- | :-: | :-: | :-: |
| Number of primary columns | n * 2 | 8 | 16 |
| Number of secondary columns | n * 4 - 6 | 10 | 26 |
| Total number of columns | (n * 2) + (n * 4 - 6) | 18 | 42 |
