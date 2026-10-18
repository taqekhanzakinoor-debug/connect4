const games = [
  { name: "Connect 4", icon: "🔴", desc: "Drop discs, connect four.", href: "games/connect4/index.html" },
  { name: "Tic-Tac-Toe", icon: "❌", desc: "Three in a row. Try to beat the AI.", href: "games/tictactoe/index.html" },
  { name: "Othello", icon: "⚫", desc: "Flip your opponent's discs.", href: "games/othello/index.html" },
  { name: "Checkers", icon: "🏁", desc: "Jump and capture pieces.", href: "games/checkers/index.html" },
  { name: "Gomoku", icon: "⭕", desc: "Five in a row on a big grid.", href: "games/gomoku/index.html" },
  { name: "Chess", icon: "♟️", desc: "The classic game of kings.", href: "games/chess/index.html" }
];
const list = document.getElementById("games");
for (const g of games) {
  const el = document.createElement(g.href ? "a" : "div");
  el.className = "card" + (g.href ? "" : " soon");
  if (g.href) { el.href = g.href; el.addEventListener("click", () => Hub.sfx.click()); }
  el.innerHTML = `<div class="icon">${g.icon}</div><h2>${g.name}</h2><p>${g.desc}</p><span class="tag">${g.href ? "Play" : "Coming soon"}</span>`;
  list.appendChild(el);
}
