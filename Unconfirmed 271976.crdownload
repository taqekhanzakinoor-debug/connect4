const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const boardEl = document.getElementById("board"), statusEl = document.getElementById("status");
const scoresEl = document.getElementById("scores"), modeEl = document.getElementById("mode");
let b, turn, over, winLine, busy, lastMove, scores = { X: 0, O: 0, draw: 0 };
const vsAI = () => modeEl.value !== "2p";

function winner(bd) {
  for (const [a, c, d] of LINES) if (bd[a] && bd[a] === bd[c] && bd[a] === bd[d]) return { p: bd[a], line: [a, c, d] };
  return null;
}
function init() { b = Array(9).fill(""); turn = "X"; over = false; winLine = []; busy = false; lastMove = -1; render(); }

function onClick(i) { if (vsAI() && turn === "O") return; play(i); }
function play(i) {
  if (over || busy || b[i]) return;
  b[i] = turn; lastMove = i; Hub.sfx.place();
  const w = winner(b);
  if (w) { over = true; winLine = w.line; scores[w.p]++; celebrate(w.p); }
  else if (b.every(Boolean)) { over = true; scores.draw++; Hub.sfx.draw(); }
  else turn = turn === "X" ? "O" : "X";
  render();
  if (!over && vsAI() && turn === "O") { busy = true; render(); setTimeout(aiMove, 500); }
}
function celebrate(p) {
  setTimeout(() => { if (vsAI() && p === "O") Hub.sfx.lose(); else { Hub.sfx.win(); Hub.confetti(); } }, 150);
}

function aiMove() {
  busy = false;
  const free = b.map((v, i) => v ? -1 : i).filter(i => i >= 0);
  play(modeEl.value === "easy" ? free[Math.floor(Math.random() * free.length)] : bestMove());
}
function bestMove() {
  let bv = -Infinity, bi = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = "O"; const v = minimax(b, false, 1); b[i] = "";
    if (v > bv) { bv = v; bi = i; }
  }
  return bi;
}
function minimax(bd, maxing, d) {
  const w = winner(bd);
  if (w) return w.p === "O" ? 10 - d : d - 10;
  if (bd.every(Boolean)) return 0;
  let best = maxing ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (bd[i]) continue;
    bd[i] = maxing ? "O" : "X";
    const v = minimax(bd, !maxing, d + 1);
    bd[i] = "";
    best = maxing ? Math.max(best, v) : Math.min(best, v);
  }
  return best;
}

function render() {
  boardEl.innerHTML = "";
  b.forEach((v, i) => {
    const sq = document.createElement("button");
    sq.className = "sq" + (v ? " " + v : "") + (i === lastMove ? " pop" : "") + (winLine.includes(i) ? " win" : "");
    sq.textContent = v; sq.disabled = over || !!v;
    sq.addEventListener("click", () => onClick(i));
    boardEl.appendChild(sq);
  });
  const o = vsAI() ? "Computer" : "O";
  scoresEl.innerHTML = `<span class="chip">❌ X <b>${scores.X}</b></span><span class="chip">⭕ ${o} <b>${scores.O}</b></span><span class="chip">Draws <b>${scores.draw}</b></span>`;
  const name = turn === "X" ? "X" : o;
  statusEl.textContent = winLine.length ? `${name} wins! 🎉` : over ? "It's a draw!" : busy ? "Computer is thinking..." : `${name}'s turn`;
}
document.getElementById("restart").addEventListener("click", init);
modeEl.addEventListener("change", () => { scores = { X: 0, O: 0, draw: 0 }; init(); });
init();
