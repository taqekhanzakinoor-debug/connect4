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
