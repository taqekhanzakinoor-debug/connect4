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
