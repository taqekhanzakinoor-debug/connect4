const D = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const T = [[100,-20,10,5],[-20,-50,-2,-2],[10,-2,1,1],[5,-2,1,0]];
function flips(s, i, p) {
  const r = i >> 3, c = i & 7, out = [];
  for (const [dr, dc] of D) {
    let x = r + dr, y = c + dc; const t = [];
    while (x >= 0 && x < 8 && y >= 0 && y < 8 && s[x * 8 + y] === 3 - p) { t.push(x * 8 + y); x += dr; y += dc; }
    if (t.length && x >= 0 && x < 8 && y >= 0 && y < 8 && s[x * 8 + y] === p) out.push(...t);
  }
  return out;
}
const list = (s, p) => { const o = []; for (let i = 0; i < 64; i++) if (!s[i]) { const f = flips(s, i, p); if (f.length) o.push({ to: i, f }); } return o; };
const diff = s => s.reduce((a, x) => a + (x === 2 ? 1 : x === 1 ? -1 : 0), 0);
const G = {
  n: 8, names: ["Black", "White"], place: true, dots: true, depth: 4,
  init() { const s = Array(64).fill(0); s[27] = 2; s[36] = 2; s[28] = 1; s[35] = 1; return s; },
  view: s => s, glyph: v => [v === 1 ? "blk" : "wht", ""],
  moves(s, p) { const m = list(s, p); return m.length ? m : list(s, 3 - p).length ? [{ pass: true }] : []; },
  apply(s, m, p) { if (m.pass) return s; const n = s.slice(); n[m.to] = p; m.f.forEach(i => n[i] = p); return n; },
  eval(s) { let v = 0; s.forEach((x, i) => { if (x) { const w = T[Math.min(i >> 3, 7 - (i >> 3))][Math.min(i & 7, 7 - (i & 7))]; v += x === 2 ? w : -w; } }); return v; },
  end: s => diff(s) * 1000,
  result(s, q, ms) { if (ms.length) return null; const d = diff(s); return d < 0 ? 1 : d > 0 ? 2 : "d"; }
};
runGame(G);
