# 🔴🟡 Connect 4

A two-player Connect 4 game that runs in the browser, built with plain HTML, CSS, and JavaScript. It was made for the **Vibe Coding Club** using a spec-driven workflow: plan everything in Markdown files first, then build the project step by step from those plans.

**Live demo:** https://connect4-gilt-psi.vercel.app/
**Repository:** https://github.com/taqekhanzakinoor-debug/connect4

---

## How to Play

1. Red goes first. Click any column to drop your disc into it.
2. Discs fall to the lowest empty spot in the column.
3. Players take turns. The first to connect **four discs in a row** (horizontally, vertically, or diagonally) wins.
4. The four winning discs pulse so you can see the line.
5. If the board fills up with no winner, the game is a draw.
6. Press **Restart** at any time to start a new game.

## Features

- 7 x 6 board with two players (Red and Yellow)
- Gravity: discs fall to the lowest empty row
- Win detection in all four directions (horizontal, vertical, two diagonals)
- Draw detection when the board is full
- Status text showing whose turn it is or who won
- Winning discs are highlighted
- Restart button
- Responsive layout that works on phones and desktops
- **Single-player mode** with a computer opponent (Easy = random, Hard = minimax with alpha-beta pruning)
- **Mode selector:** 2 Players, vs Computer (Easy), vs Computer (Hard)
- **Score counter** across rounds (resets when you change mode)
- **Hover preview:** a faded disc shows where yours will land
- **Drop animation:** discs fall into place

## Run Locally

No installation needed.

1. Download or clone the repo:
   ```
   git clone https://github.com/taqekhanzakinoor-debug/connect4.git
   ```
2. Open the `connect4` folder.
3. Double-click `index.html` to open it in your browser.

> Keep `index.html`, `style.css`, and `script.js` in the same folder, or the game will not load properly.

## Tech Stack

| Part | Technology |
|------|------------|
| Structure | HTML5 |
| Styling | CSS3 (Grid, variables, animation) |
| Logic | Vanilla JavaScript (no frameworks or libraries) |
| Hosting | Vercel |
| Version control | Git and GitHub |

## Project Structure

```
connect4/
├── index.html
├── style.css
├── script.js
├── PRD.md
├── FEATURES.md
├── ARCHITECTURE.md
├── DATA_MODEL.md
├── UI_UX.md
├── TASKS.md
├── RULES.md
└── README.md
```

## What Each File Does

### Game files

| File | Purpose |
|------|---------|
| `index.html` | The page structure: title, status message, the empty board container, and the Restart button. It loads the CSS and JavaScript. |
| `style.css` | All the visuals: the blue board, round holes, red and yellow discs, the pulsing win animation, and the responsive sizing. |
| `script.js` | All the game logic: stores the board, handles clicks, drops discs, checks for a win or draw, switches turns, and redraws the board. |

### Planning documents (the 8-file workflow)

| File | Question it answers | What it contains |
|------|--------------------|------------------|
| `PRD.md` | What are we building and why? | Problem, goal, users, success criteria, and what is out of scope. |
| `FEATURES.md` | What will it do? | The must-have, nice-to-have, and future features. |
| `ARCHITECTURE.md` | How is it built? | Tech stack, folder structure, and how the files work together. |
| `DATA_MODEL.md` | What data does it keep? | The board array, current player, game-over flag, winning cells, and the key functions. |
| `UI_UX.md` | How does it look and feel? | The screen layout, how players interact, and the visual design. |
| `TASKS.md` | What are the build steps? | A checklist of small tasks in order, plus manual test cases. |
| `RULES.md` | How should the AI assistant behave? | Coding rules for the AI: plain stack, small functions, follow tasks in order, no extra features. |
| `README.md` | How do I use this project? | This file: overview, usage, and a guide to everything. |

## How the Code Works

**State** (in `script.js`):

| Variable | Meaning |
|----------|---------|
| `board` | A 6x7 grid of numbers: `0` = empty, `1` = Red, `2` = Yellow |
| `current` | The player whose turn it is (`1` or `2`) |
| `over` | `true` once someone wins or the game is a draw |
| `winCells` | The coordinates of the four winning discs |
| `scores` | Win counts for Red, Yellow/Computer, and draws |
| `lastMove` | Last disc placed (used for the drop animation) |
| `hoverCol` | Column under the mouse (used for the preview) |
| `busy` | True while the computer is thinking |

**Main functions:**

- `init()` resets the board and starts a new game.
- `dropDisc(col)` finds the lowest empty row in the column, places the disc, checks the result, then switches turns.
- `checkWin(r, c)` counts matching discs in four directions through the last move. Four or more means a win.
- `render()` redraws the board, scores, and status text from the current state.
- `aiMove()` / `bestMove()` / `minimax()` / `heuristic()` power the computer player. Hard mode looks 4 moves ahead and prefers center columns.
- `updateGhost()` draws the hover preview.

**Flow:** click a column → `dropDisc` updates the state → `checkWin` looks for four in a row → `render` updates the screen.

## The Workflow Used

This project follows a spec-driven "vibe coding" process:

1. **Define** the idea in `PRD.md`.
2. **Scope** it in `FEATURES.md`.
3. **Design** the technical plan in `ARCHITECTURE.md` and `DATA_MODEL.md`.
4. **Design** the interface in `UI_UX.md`.
5. **Plan** the build in small steps in `TASKS.md`.
6. **Constrain** the AI with `RULES.md`.
7. **Build** one task at a time, testing as you go.
8. **Document** and ship with `README.md`, GitHub, and Vercel.

## Testing Checklist

- [ ] Win horizontally
- [ ] Win vertically
- [ ] Win on both diagonals
- [ ] Clicking a full column does nothing
- [ ] Filling the board shows a draw
- [ ] Restart works in the middle of a game
- [ ] Clicks are ignored after the game ends
- [ ] Layout looks right on a phone-sized screen
- [ ] Hover preview and drop animation work
- [ ] Score updates after each round
- [ ] Hard AI blocks a three-in-a-row and takes its own wins

## Future Improvements

- Choose who goes first
- Adjustable AI difficulty levels
- Sound effects
- Online multiplayer

## Deployment

Deployed on Vercel from this GitHub repo. Every `git push` to `main` triggers an automatic redeploy.

## Author

**Alauddin**, Vibe Coding Club
