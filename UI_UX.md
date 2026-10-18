# UI / UX

## Screen
One screen: title, status line ("Red's turn"), board, Restart button.

## Interaction
- Click any cell in a column to drop a disc there.
- Full columns ignore clicks.
- After the game ends, clicks are disabled until Restart.

## Visual Design
- Blue board with circular holes
- Red and yellow discs
- Winning discs pulse
- Responsive: board scales on small screens

## v2 Additions
- Mode dropdown above the board (2 Players / Easy / Hard)
- Scoreboard line: Red wins, Yellow or Computer wins, Draws
- Faded preview disc in the lowest empty spot of the hovered column
- Discs animate falling from the top of the board
- Status shows "Computer is thinking..." during the AI's move (0.7 s pause)
