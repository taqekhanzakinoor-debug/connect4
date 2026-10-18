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
  sfx.drop();
  const line = findWin(board, r, col);
  if (line) { over = true; winCells = line; scores[current]++; endEffects(current); }
  else if (board[0].every(v => v !== 0)) { over = true; scores.draw++; setTimeout(sfx.draw, 450); }
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
  scoresEl.innerHTML = `<span class="chip">🔴 Red <b>${scores[1]}</b></span>` +
    `<span class="chip">🟡 ${p2} <b>${scores[2]}</b></span><span class="chip">Draws <b>${scores.draw}</b></span>`;
  boardEl.classList.toggle("won", winCells.length > 0);
  statusEl.dataset.turn = over ? 0 : current;
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
/* ---------- Sound (Web Audio, no files needed) ---------- */
let audioCtx = null, muted = false;
try { muted = localStorage.getItem("c4muted") === "1"; } catch (e) {}

function tone(freq, dur, type = "sine", vol = 0.15, delay = 0) {
  if (muted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime + delay;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + dur);
  } catch (e) {}
}
const sfx = {
  drop() { tone(200, 0.12, "triangle", 0.25, 0.33); tone(120, 0.18, "sine", 0.25, 0.35); },
  win()  { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.35, "triangle", 0.18, i * 0.12)); },
  lose() { [392, 330, 262].forEach((f, i) => tone(f, 0.35, "sawtooth", 0.08, i * 0.18)); },
  draw() { tone(300, 0.25, "square", 0.07); tone(250, 0.3, "square", 0.07, 0.2); },
  click() { tone(650, 0.06, "square", 0.05); }
};
function endEffects(winner) {
  setTimeout(() => {
    if (vsAI() && winner === 2) sfx.lose();
    else { sfx.win(); confetti(); }
  }, 450);
}

/* ---------- Confetti (canvas) ---------- */
const cv = document.getElementById("confetti"), cx = cv.getContext("2d");
let parts = [], raf = 0;
function confetti() {
  cv.width = innerWidth; cv.height = innerHeight;
  const colors = ["#ef4444", "#facc15", "#38bdf8", "#4ade80", "#f472b6", "#ffffff"];
  parts = Array.from({ length: 160 }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5,
    vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, s: 5 + Math.random() * 7,
    r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)]
  }));
  cancelAnimationFrame(raf); stepConfetti();
}
function stepConfetti() {
  cx.clearRect(0, 0, cv.width, cv.height);
  for (const p of parts) {
    p.x += p.vx; p.y += p.vy; p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
    cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); cx.restore();
  }
  parts = parts.filter(p => p.y < cv.height + 20);
  if (parts.length) raf = requestAnimationFrame(stepConfetti);
}

/* ---------- Theme and sound buttons ---------- */
const themes = ["classic", "neon", "sunset"];
const soundBtn = document.getElementById("sound");
function setTheme(t) {
  document.body.dataset.theme = t;
  try { localStorage.setItem("c4theme", t); } catch (e) {}
}
function setSoundIcon() { soundBtn.textContent = muted ? "🔇" : "🔊"; }
document.getElementById("theme").addEventListener("click", () => {
  const i = themes.indexOf(document.body.dataset.theme);
  setTheme(themes[(i + 1) % themes.length]); sfx.click();
});
soundBtn.addEventListener("click", () => {
  muted = !muted;
  try { localStorage.setItem("c4muted", muted ? "1" : "0"); } catch (e) {}
  setSoundIcon(); sfx.click();
});
let savedTheme = "classic";
try { savedTheme = localStorage.getItem("c4theme") || "classic"; } catch (e) {}
setTheme(themes.includes(savedTheme) ? savedTheme : "classic");
setSoundIcon();

init();
