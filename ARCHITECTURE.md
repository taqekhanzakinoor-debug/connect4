# Architecture

## Stack
HTML (structure), CSS (look), vanilla JavaScript (logic). No build tools or frameworks.

## Folder Structure
```
connect4/
├── index.html
├── style.css
├── script.js
└── *.md  (project docs)
```

## How It Fits Together
- `index.html` has the board container, status text, and restart button.
- `script.js` holds the game state (a 2D array), rules, and rendering.
- `style.css` styles the board, discs, and win highlight.

## Data Flow
Click column -> `dropDisc(col)` updates state -> `checkWin()` -> `render()` updates the DOM.

## v3 Additions
- Sound uses the browser's Web Audio API, so no audio files are needed.
- Confetti is drawn on a full-screen `<canvas id="confetti">` with plain JavaScript.
- Theme and mute settings are saved with `localStorage` (wrapped in try/catch).

## v4: Hub Structure
```
connect4/
├── index.html          (hub home page)
├── hub.css / hub.js    (game cards)
├── shared/
│   ├── common.css      (themes + base look)
│   └── common.js       (sound, confetti, theme: exposes window.Hub)
└── games/
    ├── connect4/       (index.html, style.css, script.js)
    └── tictactoe/      (index.html, style.css, script.js)
```
Each game is a self-contained folder that loads the shared files. New games only need a folder and one line in `hub.js`.
Connect 4 still has its own copy of the sound and theme code. Moving it onto `shared/` is a planned cleanup.

## v5: Shared Board Engine
`shared/board.js` runs any board game. Each game (`games/<name>/script.js`) supplies a rules object `G` with `init`, `moves`, `apply`, `result`, `eval`, and `glyph`. The engine handles clicks, turns, scores, sounds, the status text, and the computer player (minimax with alpha-beta pruning, or a custom `ai` for Gomoku). Adding a new game means writing only its rules.
