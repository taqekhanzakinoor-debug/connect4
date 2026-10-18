# Data Model

## State
| Variable  | Type       | Meaning                                  |
|-----------|------------|------------------------------------------|
| `board`   | number[6][7] | 0 = empty, 1 = Red, 2 = Yellow         |
| `current` | number     | Player whose turn it is (1 or 2)         |
| `over`    | boolean    | True once someone wins or it's a draw    |
| `winCells`| [r,c][]    | Coordinates of the winning four          |

## Key Functions
- `init()`: reset state and render
- `dropDisc(col)`: place a disc, check result, switch turn
- `checkWin(r, c)`: count in 4 directions from the last move
- `render()`: redraw the board from state
