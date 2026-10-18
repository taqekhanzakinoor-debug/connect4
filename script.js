const ROWS = 6, COLS = 7;
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
let board, current, over, winCells;

function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  current = 1; over = false; winCells = [];
  render();
}

function dropDisc(col) {
  if (over) return;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = current;
      const line = checkWin(r, col);
      if (line) { over = true; winCells = line; }
      else if (board.every(row => row.every(v => v !== 0))) { over = true; }
      else current = current === 1 ? 2 : 1;
      render();
      return;
    }
  }
}

function checkWin(r, c) {
  const player = board[r][c];
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    const cells = [[r, c]];
    for (const s of [1, -1]) {
      let nr = r + dr * s, nc = c + dc * s;
      while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === player) {
        cells.push([nr, nc]); nr += dr * s; nc += dc * s;
      }
    }
    if (cells.length >= 4) return cells;
  }
  return null;
}

function render() {
  boardEl.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (board[r][c] ? " p" + board[r][c] : "");
      if (winCells.some(([wr, wc]) => wr === r && wc === c)) cell.classList.add("win");
      cell.addEventListener("click", () => dropDisc(c));
      boardEl.appendChild(cell);
    }
  }
  const name = current === 1 ? "Red" : "Yellow";
  statusEl.textContent = winCells.length ? `${name} wins! 🎉`
    : over ? "It's a draw!" : `${name}'s turn`;
}

document.getElementById("restart").addEventListener("click", init);
init();
