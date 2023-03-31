## Rows

### Description

Each piece can be placed on the board at many different locations. We also have orientation
to consider. We can eliminate some possibilities due to symmetry. In addition, we only consider
placements that honour the board colours i.e. the colours of the squares that make up each piece
must match the colours of the board squares that they cover. We end up with many rows for each piece
with each row describing a specific combination of piece, location and orientation. A solution
will have a row for each piece.

### Size

| Description | Count |
| --- | :-: |
| Number of rows in a solution | 14 |

## Columns

### Description

#### Pieces

There are 14 pieces and we have a column for each piece to ensure that all pieces appear in the solution.

#### Locations

There are 8 * 8 = 64 board squares and we have a column for each board square to ensure that the whole board
is covered.

### Size

| Description | Count |
| --- | :-: |
| Number of primary columns | 14 + 64 = 78 |
| Number of secondary columns | 0 |
| Total number of columns | 78 |
