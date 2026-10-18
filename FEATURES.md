# Features

## Must Have (done)
- 7x6 board, Red and Yellow alternate turns
- Discs fall to the lowest empty row
- Win detection (horizontal, vertical, both diagonals) and draw detection
- Restart button

## Added in v2 (done)
- Single-player mode against a computer opponent
  - Easy: picks a random valid column
  - Hard: minimax with alpha-beta pruning (depth 4)
- Mode selector: 2 Players / vs Computer (Easy) / vs Computer (Hard)
- Score counter (Red, Yellow or Computer, Draws) across rounds
- Hover preview: faded disc shows where your disc will land
- Drop animation: discs fall into place
- Winning four discs pulse

## Later
- Sound effects, online multiplayer, choose who goes first

## Added in v3 (done)
- Visual polish: gradient background, glossy discs, glass-style controls, glowing board on win
- 3 colour themes (Classic, Neon, Sunset), remembered between visits
- Sound effects built with the Web Audio API (drop thud, win jingle, lose tone, draw tone, button click)
- Sound on/off button, remembered between visits
- Confetti on a win (not when the computer wins)
- Bounce when a disc lands, glowing turn indicator
- Respects "reduce motion" accessibility setting

## v4: Game Hub
| Game | Status | Computer opponent |
|------|--------|-------------------|
| Connect 4 | Done | Easy / Hard (minimax depth 4) |
| Tic-Tac-Toe | Done (batch 1) | Easy / Unbeatable (full minimax) |
| Othello | Done | Easy / Hard |
| Gomoku | Done | Easy / Hard |
| Checkers | Done | Easy / Hard |
| Chess | Done | Easy / Hard |

- Hub home page with a card for each game ("Coming soon" for unfinished ones)
- Shared theme, sound, and confetti code used by every new game

### Chess rules included / not included
Included: all piece moves, check, checkmate, stalemate, auto-queen promotion.
Not included yet: castling, en passant, choosing a promotion piece, 50-move and repetition draws.

## v6: In-game instructions
- Every game has a **❓ How to Play** button with the goal, rules, tips, and a note on the game modes.
- The popup opens automatically the first time you visit each game, then only when you click the button.
- Close it with Got it!, a click outside the box, or the Esc key.
