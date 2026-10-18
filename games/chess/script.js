const K = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const Kn = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const own = v => v === v.toUpperCase() ? 1 : 2, VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const ok = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
const GL = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
function att(b, sq, by) {                      // is square sq attacked by player `by`?
  const r = sq >> 3, c = sq & 7, L = ch => by === 1 ? ch.toUpperCase() : ch, pr = by === 1 ? r + 1 : r - 1;
  for (const dc of [-1, 1]) if (ok(pr, c + dc) && b[pr * 8 + c + dc] === L("p")) return true;
  for (const [a, d] of Kn) if (ok(r + a, c + d) && b[(r + a) * 8 + c + d] === L("n")) return true;
  for (const [a, d] of K) {
    if (ok(r + a, c + d) && b[(r + a) * 8 + c + d] === L("k")) return true;
    let x = r + a, y = c + d; while (ok(x, y) && !b[x * 8 + y]) { x += a; y += d; }
    if (ok(x, y)) { const v = b[x * 8 + y]; if (v === L("q") || v === (a && d ? L("b") : L("r"))) return true; }
  }
  return false;
}
function pseudo(b, p) {
  const o = [], add = (f, t) => o.push({ from: f, to: t });
  for (let i = 0; i < 64; i++) {
    const v = b[i]; if (!v || own(v) !== p) continue;
    const r = i >> 3, c = i & 7, t = v.toLowerCase();
    if (t === "p") {
      const dr = p === 1 ? -1 : 1, f = (r + dr) * 8 + c;
      if (ok(r + dr, c) && !b[f]) { add(i, f); if (r === (p === 1 ? 6 : 1) && !b[f + dr * 8]) add(i, f + dr * 8); }
      for (const dc of [-1, 1]) if (ok(r + dr, c + dc)) { const q = b[(r + dr) * 8 + c + dc]; if (q && own(q) !== p) add(i, (r + dr) * 8 + c + dc); }
    } else if (t === "n" || t === "k") {
      for (const [a, d] of t === "n" ? Kn : K) if (ok(r + a, c + d)) { const q = b[(r + a) * 8 + c + d]; if (!q || own(q) !== p) add(i, (r + a) * 8 + c + d); }
    } else for (const [a, d] of K) {
      if ((t === "b" && !(a && d)) || (t === "r" && a && d)) continue;
      let x = r + a, y = c + d;
      while (ok(x, y)) { const q = b[x * 8 + y]; if (q) { if (own(q) !== p) add(i, x * 8 + y); break; } add(i, x * 8 + y); x += a; y += d; }
    }
  }
  return o;
}
const kingOf = (b, p) => b.indexOf(p === 1 ? "K" : "k");
const inCheck = (b, p) => att(b, kingOf(b, p), 3 - p);
const G = {
  n: 8, names: ["White", "Black"], depth: 3,
  init() { const b = Array(64).fill(""); "rnbqkbnr".split("").forEach((x, i) => { b[i] = x; b[56 + i] = x.toUpperCase(); b[8 + i] = "p"; b[48 + i] = "P"; }); return b; },
  view: b => b, glyph: v => [own(v) === 1 ? "ch w" : "ch b", GL[v.toLowerCase()] + "\uFE0E"],
  moves: (b, p) => pseudo(b, p).filter(m => !inCheck(G.apply(b, m, p), p)),
  apply(b, m, p) {
    const n = b.slice(); let v = n[m.from];
    if (v.toLowerCase() === "p" && (m.to >> 3) === (p === 1 ? 0 : 7)) v = p === 1 ? "Q" : "q";   // auto-queen
    n[m.to] = v; n[m.from] = ""; return n;
  },
  eval(b) { let s = 0; b.forEach((v, i) => { if (!v) return; const t = v.toLowerCase();
    const x = VAL[t] + (t === "p" || t === "n" ? (7 - Math.abs((i >> 3) * 2 - 7) / 1 + 7 - Math.abs((i & 7) * 2 - 7)) * 2 : 0); s += own(v) === 2 ? x : -x; }); return s; },
  end: (b, p, d) => inCheck(b, p) ? (p === 2 ? -1e5 - d : 1e5 + d) : 0,
  result: (b, q, ms) => ms.length ? null : inCheck(b, q) ? 3 - q : "d",
  hot: (b, p) => inCheck(b, p) ? kingOf(b, p) : -1,
  note: (b, p) => inCheck(b, p) ? " (check!)" : ""
};
runGame(G);
