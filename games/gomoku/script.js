const N = 15, DR = [[0,1],[1,0],[1,1],[1,-1]];
function line(s, i, p, [dr, dc]) {            // length and open ends of the line through i if p plays there
  const r = Math.floor(i / N), c = i % N; let n = 1, o = 0;
  for (const k of [1, -1]) {
    let x = r + dr * k, y = c + dc * k;
    while (x >= 0 && x < N && y >= 0 && y < N && s[x * N + y] === p) { n++; x += dr * k; y += dc * k; }
    if (x >= 0 && x < N && y >= 0 && y < N && !s[x * N + y]) o++;
  }
  return [n, o];
}
const val = (s, i, p) => DR.reduce((t, d) => { const [n, o] = line(s, i, p, d);
  return t + (n >= 5 ? 1e6 : n === 4 ? (o === 2 ? 1e4 : o ? 1e3 : 0) : n === 3 ? (o === 2 ? 500 : o ? 50 : 0) : n === 2 ? (o === 2 ? 20 : o ? 3 : 0) : 1); }, 0);
const near = (s, i) => { const r = Math.floor(i / N), c = i % N;
  for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) { const x = r + a, y = c + b; if (x >= 0 && x < N && y >= 0 && y < N && s[x * N + y]) return true; } return false; };
const G = {
  n: N, names: ["Black", "White"], place: true, plain: true,
  init: () => Array(N * N).fill(0), view: s => s, glyph: v => [v === 1 ? "blk" : "wht", ""],
  moves: s => s.flatMap((v, i) => v ? [] : [{ to: i }]),
  apply(s, m, p) { const n = s.slice(); n[m.to] = p; return n; },
  result(s, q, ms, m, p) { if (DR.some(d => line(s, m.to, p, d)[0] >= 5)) return p; return ms.length ? null : "d"; },
  ai(s, ms, lvl) {
    if (!s.some(Boolean)) return { to: 112 };
    const c = ms.filter(m => near(s, m.to));
    if (lvl === "easy") return c[Math.floor(Math.random() * c.length)];
    let best = -1, bm = c[0];
    for (const m of c) { const v = val(s, m.to, 2) * 1.1 + val(s, m.to, 1) + Math.random(); if (v > best) { best = v; bm = m; } }
    return bm;
  }
};
runGame(G);
