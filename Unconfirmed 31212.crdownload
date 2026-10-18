const ROWS = 6, COLS = 7;
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoresEl = document.getElementById("scores");
const modeEl = document.getElementById("mode");
let board, current, over, winCells, lastMove, hoverCol = -1, busy = false;
let scores = { 1: 0, 2: 0, draw: 0 };

const vsAI = () => modeEl.value !== "2p";

function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  current = 1; over = false; winCells = []; lastMove = null; busy = false;
  render();
}

function lowestRow(b, col) {
  for (let r = ROWS - 1; r >= 0; r--) if (b[r][col] === 0) return r;
  return -1;
}

function onClick(col) {
  if (over || busy || (vsAI() && current === 2)) return;
  dropDisc(col);
}

function dropDisc(col) {
  const r = lowestRow(board, col);
  if (over || r < 0) return;
  board[r][col] = current;
  lastMove = [r, col];
  const line = findWin(board, r, col);
  if (line) { over = true; winCells = line; scores[current]++; }
  else if (board[0].every(v => v !== 0)) { over = true; scores.draw++; }
  else current = current === 1 ? 2 : 1;
  render();
  if (!over && vsAI() && current === 2) { busy = true; setTimeout(aiMove, 700); }
}

function findWin(b, r, c) {
  const player = b[r][c];
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    const cells = [[r, c]];
    for (const s of [1, -1]) {
      let nr = r + dr * s, nc = c + dc * s;
      while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc] === player) {
        cells.push([nr, nc]); nr += dr * s; nc += dc * s;
      }
    }
    if (cells.length >= 4) return cells;
  }
  return null;
}

/* ---------- AI ---------- */
const validCols = b => [3, 2, 4, 1, 5, 0, 6].filter(c => b[0][c] === 0);

function aiMove() {
  busy = false;
  const cols = validCols(board);
  const col = modeEl.value === "easy" ? cols[Math.floor(Math.random() * cols.length)] : bestMove();
  dropDisc(col);
}

function bestMove() {
  let bestV = -Infinity, bestC = validCols(board)[0];
  for (const c of validCols(board)) {
    const r = lowestRow(board, c);
    board[r][c] = 2;
    const v = minimax(board, 4, -Infinity, Infinity, false, [r, c]);
    board[r][c] = 0;
    if (v > bestV) { bestV = v; bestC = c; }
  }
  return bestC;
}

function minimax(b, depth, alpha, beta, maxing, last) {
  if (findWin(b, last[0], last[1])) return maxing ? -100000 - depth : 100000 + depth;
  const cols = validCols(b);
  if (!cols.length) return 0;
  if (depth === 0) return heuristic(b);
  let best = maxing ? -Infinity : Infinity;
  for (const c of cols) {
    const r = lowestRow(b, c);
    b[r][c] = maxing ? 2 : 1;
    const v = minimax(b, depth - 1, alpha, beta, !maxing, [r, c]);
    b[r][c] = 0;
    if (maxing) { best = Math.max(best, v); alpha = Math.max(alpha, best); }
    else { best = Math.min(best, v); beta = Math.min(beta, best); }
    if (alpha >= beta) break;
  }
  return best;
}

function heuristic(b) {
  let s = 0;
  for (let r = 0; r < ROWS; r++) s += b[r][3] === 2 ? 3 : b[r][3] === 1 ? -3 : 0;
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
      const er = r + 3 * dr, ec = c + 3 * dc;
      if (er >= ROWS || ec < 0 || ec >= COLS) continue;
      let ai = 0, hu = 0;
      for (let i = 0; i < 4; i++) {
        const v = b[r + i * dr][c + i * dc];
        if (v === 2) ai++; else if (v === 1) hu++;
      }
      if (ai && hu) continue;
      if (ai === 3) s += 5; else if (ai === 2) s += 2;
      if (hu === 3) s -= 6; else if (hu === 2) s -= 2;
    }
  return s;
}

/* ---------- Rendering ---------- */
function render() {
  boardEl.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (board[r][c] ? " p" + board[r][c] : "");
      cell.dataset.col = c;
      if (lastMove && lastMove[0] === r && lastMove[1] === c) {
        cell.classList.add("drop");
        cell.style.setProperty("--drop", r + 1);
      }
      if (winCells.some(([wr, wc]) => wr === r && wc === c)) cell.classList.add("win");
      boardEl.appendChild(cell);
    }
  }
  updateGhost();
  const p2 = vsAI() ? "Computer" : "Yellow";
  const name = current === 1 ? "Red" : p2;
  scoresEl.textContent = `🔴 Red: ${scores[1]}   🟡 ${p2}: ${scores[2]}   Draws: ${scores.draw}`;
  statusEl.textContent = winCells.length ? `${name} wins! 🎉`
    : over ? "It's a draw!"
    : busy ? "Computer is thinking..." : `${name}'s turn`;
}

function updateGhost() {
  for (const el of boardEl.children) el.classList.remove("ghost", "g1", "g2");
  if (hoverCol < 0 || over || busy || (vsAI() && current === 2)) return;
  const r = lowestRow(board, hoverCol);
  if (r >= 0) boardEl.children[r * COLS + hoverCol].classList.add("ghost", "g" + current);
}

boardEl.addEventListener("click", e => {
  if (e.target.dataset.col !== undefined) onClick(+e.target.dataset.col);
});
boardEl.addEventListener("mouseover", e => {
  const col = e.target.dataset.col;
  if (col !== undefined && +col !== hoverCol) { hoverCol = +col; updateGhost(); }
});
boardEl.addEventListener("mouseleave", () => { hoverCol = -1; updateGhost(); });
document.getElementById("restart").addEventListener("click", init);
modeEl.addEventListener("change", () => { scores = { 1: 0, 2: 0, draw: 0 }; init(); });
init();
