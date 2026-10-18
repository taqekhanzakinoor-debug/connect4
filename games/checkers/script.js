const own = v => v.toLowerCase() === "w" ? 1 : 2;
const dirs = v => v === v.toUpperCase() ? [[-1,-1],[-1,1],[1,-1],[1,1]] : [[own(v) === 1 ? -1 : 1, -1], [own(v) === 1 ? -1 : 1, 1]];
function jumps(s, st, i, v, caps, out) {
  const r = i >> 3, c = i & 7, p = own(v), man = v === v.toLowerCase(); let f = false;
  for (const [dr, dc] of dirs(v)) {
    const tr = r + 2 * dr, tc = c + 2 * dc; if (tr < 0 || tr > 7 || tc < 0 || tc > 7) continue;
    const m = (r + dr) * 8 + c + dc, t = tr * 8 + tc;
    if (s[m] && own(s[m]) !== p && !s[t] && !caps.includes(m)) {
      f = true; const cp = [...caps, m];
      if (man && tr === (p === 1 ? 0 : 7)) out.push({ from: st, to: t, caps: cp }); else jumps(s, st, t, v, cp, out);
    }
  }
  if (!f && caps.length) out.push({ from: st, to: i, caps });
}
const G = {
  n: 8, names: ["White", "Black"], depth: 5,
  init() { return Array.from({ length: 64 }, (_, i) => { const r = i >> 3; return (r + (i & 7)) % 2 ? (r < 3 ? "b" : r > 4 ? "w" : "") : ""; }); },
  view: s => s, glyph: v => [own(v) === 1 ? "p1" : "p2", v === v.toUpperCase() ? "♚\uFE0E" : ""],
  moves(s, p) {
    const caps = [], steps = [];
    s.forEach((v, i) => {
      if (!v || own(v) !== p) return;
      const s2 = s.slice(); s2[i] = ""; jumps(s2, i, i, v, [], caps);
      for (const [dr, dc] of dirs(v)) { const r = (i >> 3) + dr, c = (i & 7) + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && !s[r * 8 + c]) steps.push({ from: i, to: r * 8 + c, caps: [] }); }
    });
    return caps.length ? caps : steps;
  },
  apply(s, m) {
    const n = s.slice(); let v = n[m.from]; n[m.from] = ""; m.caps.forEach(i => n[i] = "");
    if (v === v.toLowerCase() && (m.to >> 3) === (own(v) === 1 ? 0 : 7)) v = v.toUpperCase();
    n[m.to] = v; return n;
  },
  eval(s) { let t = 0; s.forEach((v, i) => { if (!v) return; const k = v === v.toUpperCase(), r = i >> 3;
    const x = k ? 170 : 100 + 3 * (own(v) === 2 ? r : 7 - r); t += own(v) === 2 ? x : -x; }); return t; },
  end: (s, p, d) => p === 2 ? -1e4 - d : 1e4 + d,
  result: (s, q, ms) => ms.length ? null : 3 - q
};
runGame(G);
