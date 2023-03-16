# DLX Matrix Details

## Rows

### Description

Each piece can be placed in the grid at many different locations. We also have orientation and reflection
to consider. We can eliminate some possibilities due to symmetry. We end up with many rows for each piece
with each row describing a specific combination of piece, location, orientation and reflection. A solution
will have a row for each piece.

### Size

| Description | Count |
| --- | :-: |
| Number of rows in a solution | 12 |

## Columns

### Description

#### Pieces

There are 12 pieces and we have a column for each piece to ensure that all pieces appear in the solution.

#### Locations

There are 8 * 8 = 64 grid squares. However, the middle 4 squares are reserved which leaves 60 squares
to be covered. This makes sense because each piece consists of 5 squares and there are 12 pieces giving
a total of 60.

### Size

| Description | Count |
| --- | :-: |
| Number of primary columns | 12 + 60 = 72 |
| Number of secondary columns | 0 |
| Total number of columns | 72 |
