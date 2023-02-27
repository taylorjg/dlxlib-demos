## Details of the DLX Matrix

### Size information

For an `n` x `n` puzzle with max room size `r`:

| Description | Count | Example (n = 8, r = 5) | Example (n = 8, r = 6) |
| --- | --- | --- | --- |
| Number of primary columns | n * n * 2 | 128 | 128 |
| Number of secondary columns | n * n * 4 * r | 1280 | 1536 |
| Total number of columns | (n * n) + (2 + 4 * r) | 1408 | 1664 |
| Number of rows in a solution | n * n | 64 | 64 |

### Primary columns

* One primary column per position (row/col) in the grid.
These primary columns ensure that the grid is fully populated
i.e. every position in the grid is filled exactly once.

* One primary column for each value in each room.
These primary columns ensure that every room is fully populated
and that there are no duplicate values in a room. For example,
a room with four cells must contain one each of 1, 2, 3 and 4.

### Secondary columns

There are four sets of secondary columns for each unique number
that appears in the grid. For example, if the grid consists of a mixture
of rooms with 1, 2, 3, 4 and 5 cells, then the solved puzzle will
contain a mixture of 1s, 2s, 3s, 4s and 5s. In this case, we will
have 4 x 5 = 20 sets of secondary columns. The number of columns
in each set of secondary columns will be numRows x numCols. These sets
of secondary columns are used to enforce the proximity constraints.
This is best explained using an example. Say we have a 5 x 5 grid with
position (0, 0) at bottom left. Lets say that we have a 2 at (1, 3):

```
-----
-2---
-----
-----
-----
```

The first set of secondary columns represents the position of the 2 itself plus
the positions above that must not contain another 2 (one of these lies off the grid):

```
-x---   (01000)
-x---   (01000)
-----   (00000)
-----   (00000)
-----   (00000)

0000000000000000100001000
```

The second set of secondary columns represents the position of the 2 itself plus
the positions below that must not contain another 2:

```
-----   (00000)
-x---   (01000)
-x---   (01000)
-x---   (01000)
-----   (00000)

0000001000010000100000000
```

The third set of secondary columns represents the position of the 2 itself plus
the positions to the left that must not contain another 2 (one of these lies off the grid):

```
-----   (00000)
xx---   (11000)
-----   (00000)
-----   (00000)
-----   (00000)

0000000000000001100000000
```

The fourth set of secondary columns represents the position of the 2 itself plus
the positions to the right that must not contain another 2:

```
-----   (00000)
-xxx-   (01110)
-----   (00000)
-----   (00000)
-----   (00000)

0000000000000000111000000
```

I refer to these up/down/left/right values as the 'ripples' caused by
placing a value. Maybe this is why they are called Ripple Effect puzzles ?

Of the 20 sets of secondary columns, only 4 of them will be populated in any particular row.
The other 16 sets of secondary columns will be filled
with 0s. So in other words, we have a set of secondary columns for each of the following:

* the up/down/left/right ripples of placed 1s
* the up/down/left/right ripples of placed 2s
* the up/down/left/right ripples of placed 3s
* the up/down/left/right ripples of placed 4s
* the up/down/left/right ripples of placed 5s
