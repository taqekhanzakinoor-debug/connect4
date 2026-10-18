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

## v2 Additions
| Variable   | Type    | Meaning                                         |
|------------|---------|-------------------------------------------------|
| `scores`   | object  | `{1: redWins, 2: yellowOrComputerWins, draw}`   |
| `lastMove` | [r, c]  | Last placed disc, used for the drop animation   |
| `hoverCol` | number  | Column under the mouse, used for the preview    |
| `busy`     | boolean | True while the computer is "thinking"           |

## v2 Functions
- `onClick(col)`: ignores clicks when the game is over, busy, or it is the computer's turn
- `aiMove()`: Easy picks randomly; Hard calls `bestMove()`
- `bestMove()` / `minimax()`: look 4 moves ahead with alpha-beta pruning
- `heuristic()`: scores the board (center control, 2-in-a-row and 3-in-a-row windows)
- `updateGhost()`: shows the hover preview
