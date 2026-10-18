/* Tiny engine shared by Othello, Checkers, Gomoku, Chess. Each game supplies a rules object G. */
const $ = id => document.getElementById(id);
const chips = a => { $("scores").innerHTML = a.map(([l, v]) => `<span class="chip">${l} <b>${v}</b></span>`).join(""); };

function search(G, s, p, d, al, be) {              // minimax + alpha-beta; player 2 (computer) maximises
  if (d === 0) return G.eval(s);
  const ms = G.moves(s, p);
  if (!ms.length) return G.end(s, p, d);
  const mx = p === 2; let best = mx ? -Infinity : Infinity;
  for (const m of ms) {
    const v = search(G, G.apply(s, m, p), 3 - p, d - 1, al, be);
    if (mx) { best = Math.max(best, v); al = Math.max(al, best); } else { best = Math.min(best, v); be = Math.min(be, best); }
    if (al >= be) break;
  }
  return best;
}
function pickBest(G, s, ms) {
  let bv = -Infinity, bm = [];
  for (const m of ms) {
    const v = search(G, G.apply(s, m, 2), 1, G.depth - 1, -Infinity, Infinity);
    if (v > bv) { bv = v; bm = [m]; } else if (v === bv) bm.push(m);
  }
  return bm[Math.floor(Math.random() * bm.length)];
}

function runGame(G) {
  let s, p, over, sel, last, busy, ms, sc = { 1: 0, 2: 0, d: 0 };
  const mode = () => $("mode").value, vsAI = () => mode() !== "2p";
  const nm = i => (i === 2 && vsAI() ? "Computer" : G.names[i - 1]);
  const humanTurn = () => !over && !busy && !(vsAI() && p === 2);

  function init() { s = G.init(); p = 1; over = null; sel = -1; last = null; busy = false; ms = G.moves(s, 1); render(); turn(); }
  function render() {
    const el = $("board"), n = G.n, v = G.view(s), hot = G.hot ? G.hot(s, p) : -1;
    el.className = "gb" + (G.plain ? " gm" : ""); el.style.setProperty("--n", n); el.innerHTML = "";
    const tg = sel >= 0 ? ms.filter(m => m.from === sel).map(m => m.to)
      : G.dots && humanTurn() ? ms.filter(m => m.to !== undefined).map(m => m.to) : [];
    v.forEach((x, i) => {
      const d = document.createElement("div"), r = Math.floor(i / n), c = i % n;
      d.className = "sq " + ((r + c) % 2 ? "dk" : "lt") + (i === sel ? " sel" : "") + (tg.includes(i) ? " mv" + (x ? " cap" : "") : "")
        + (last && (i === last.to || i === last.from) ? " last" : "") + (i === hot ? " chk" : "");
      const g = x && G.glyph(x);
      if (g) { const e = document.createElement("span"); e.className = "pc " + g[0]; e.textContent = g[1]; d.appendChild(e); }
      d.onclick = () => click(i); el.appendChild(d);
    });
    chips([[G.names[0], sc[1]], [nm(2), sc[2]], ["Draws", sc.d]]);
    $("status").textContent = over ? (over === "d" ? "It's a draw!" : `${nm(over)} wins! 🎉`)
      : busy ? "Computer is thinking..." : `${nm(p)}'s turn` + (G.note ? G.note(s, p) : "");
  }
  function click(i) {
    if (!humanTurn()) return;
    const m = ms.find(m => m.to === i && (G.place || m.from === sel));
    if (m) return play(m);
    sel = ms.some(m => m.from === i) ? i : -1; render();
  }
  function play(m) {
    s = G.apply(s, m, p); last = m; sel = -1; Hub.sfx.place();
    const q = 3 - p; ms = G.moves(s, q); const r = G.result(s, q, ms, m, p);
    if (r) {
      over = r; sc[r === "d" ? "d" : r]++; render();
      setTimeout(() => { if (r === "d") Hub.sfx.draw(); else if (vsAI() && r === 2) Hub.sfx.lose(); else { Hub.sfx.win(); Hub.confetti(); } }, 200);
      return;
    }
    p = q; render(); turn();
  }
  function turn() {
    if (over) return;
    if (ms.length === 1 && ms[0].pass) { setTimeout(() => play(ms[0]), 700); return; }
    if (vsAI() && p === 2) {
      busy = true; render();
      setTimeout(() => { busy = false;
        play(G.ai ? G.ai(s, ms, mode()) : mode() === "easy" ? ms[Math.floor(Math.random() * ms.length)] : pickBest(G, s, ms)); }, 450);
    }
  }
  $("restart").onclick = init;
  $("mode").onchange = () => { sc = { 1: 0, 2: 0, d: 0 }; init(); };
  init();
}
