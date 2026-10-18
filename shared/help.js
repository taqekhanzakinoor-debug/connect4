/* "How to Play" popup for every game. Picks its text from the game's folder name. */
(function () {
  const MODES = "Modes: <b>2 Players</b> on the same screen, <b>Easy</b> (the computer plays random moves) or <b>Hard</b> (it thinks several moves ahead). Changing mode resets the scores.";
  const H = {
    connect4: { t: "Connect 4", goal: "Be the first to line up <b>four of your discs</b> in a row: across, up and down, or diagonally.",
      steps: ["Red goes first, then players take turns.", "Click a column. Your disc falls to the lowest empty spot. A faded disc shows where it will land.", "If the board fills up with no winner, it is a draw.", "Winning discs pulse and the score updates. Press <b>Restart</b> for another round."],
      tips: ["The middle columns give you the most ways to win.", "Always check what your opponent could do after your move."] },
    tictactoe: { t: "Tic-Tac-Toe", goal: "Get <b>three of your marks</b> in a row: across, down, or diagonally.",
      steps: ["X goes first, then O.", "Click an empty square to place your mark.", "If all nine squares fill up with no line, it is a draw.", "Press <b>New Round</b> to play again. Scores are kept until you change mode."],
      tips: ["Take the center or a corner first.", "In Unbeatable mode the best you can do is a draw. Can you get one?"] },
    othello: { t: "Othello", goal: "Finish the game with <b>more discs of your colour</b> than your opponent.",
      steps: ["Black goes first. Dots show where you can legally play.", "A move must <b>outflank</b> at least one enemy disc: place your disc so enemy discs sit in a straight line between it and another of your discs. Those discs flip to your colour.", "If you have no legal move you pass automatically.", "The game ends when neither player can move. The player with more discs wins."],
      tips: ["Corners can never be flipped. Grab them when you can.", "Taking lots of discs early is often a trap. Keep your options open."] },
    checkers: { t: "Checkers", goal: "<b>Capture all</b> of your opponent's pieces, or leave them with no legal move.",
      steps: ["White (the bottom side) goes first. Pieces sit on the dark squares.", "Click a piece, then click a highlighted square. Normal pieces move one square diagonally <b>forward</b>.", "To capture, jump diagonally over an enemy piece into the empty square behind it. <b>Captures are mandatory</b>, and you must keep jumping if you can.", "A piece that reaches the far row becomes a <b>king</b> (♚). Kings move and capture both forwards and backwards."],
      tips: ["Keep your back row filled as long as you can to stop enemy kings.", "Trade pieces when you are ahead."] },
    gomoku: { t: "Gomoku", goal: "Be the first to place <b>five stones in a row</b>: across, up and down, or diagonally.",
      steps: ["Black goes first on a 15 x 15 board.", "Click any empty spot to place a stone. Stones never move or get captured.", "Five or more in a row wins. If the board fills up it is a draw."],
      tips: ["An <b>open four</b> (four in a row with both ends free) cannot be stopped, so build toward one.", "Block your opponent's open threes before they become fours."] },
    chess: { t: "Chess", goal: "<b>Checkmate</b> the enemy king: attack it so that it has no way to escape.",
      steps: ["White goes first. Click a piece to see its moves. Dots are normal moves and rings are captures. Click a highlighted square to move.", "<b>Pieces:</b> ♟ pawn moves forward one (two on its first move) and captures diagonally. ♜ rook moves in straight lines. ♝ bishop moves diagonally. ♛ queen moves like a rook and bishop together. ♞ knight jumps in an L-shape. ♚ king moves one square any direction.", "A king under attack is in <b>check</b> and glows red. You must get out of check. You cannot make a move that leaves your own king in check.", "<b>Checkmate</b> wins the game. <b>Stalemate</b> (no legal move but not in check) is a draw.", "A pawn that reaches the far side becomes a queen automatically."],
      tips: ["Control the center and develop your knights and bishops early.", "Not included yet: castling, en passant, and the 50-move and repetition draw rules."] }
  };

  const parts = location.pathname.split("/").filter(Boolean);
  if (/\.html?$/.test(parts[parts.length - 1] || "")) parts.pop();
  const key = parts.pop(), g = H[key], bar = document.querySelector(".controls");
  if (!g || !bar) return;

  const css = document.createElement("style");
  css.textContent = `.hp-ov{position:fixed;inset:0;z-index:20;display:none;place-items:center;padding:16px;background:rgba(0,0,0,.65)}
.hp-ov.open{display:grid}.hp-card{max-width:520px;max-height:88vh;overflow:auto;text-align:left;padding:22px 24px;border-radius:18px;
background:var(--bg2,#1e293b);color:var(--text,#f8fafc);border:1px solid rgba(255,255,255,.25);box-shadow:0 20px 50px rgba(0,0,0,.6)}
.hp-card h2{margin:0 0 8px}.hp-card h3{margin:16px 0 6px;color:var(--accent,#38bdf8);font-size:1rem}
.hp-card ol,.hp-card ul{margin:0;padding-left:20px;line-height:1.5}.hp-card li{margin-bottom:6px}
.hp-card .modes{font-size:.9rem;opacity:.85;margin-top:14px}.hp-card button{margin-top:14px;padding:10px 26px;border:0;border-radius:999px;
font-weight:700;cursor:pointer;color:#0f172a;background:var(--accent,#38bdf8)}`;
  document.head.appendChild(css);

  const ov = document.createElement("div"); ov.className = "hp-ov"; ov.setAttribute("role", "dialog");
  ov.innerHTML = `<div class="hp-card"><h2>How to play ${g.t}</h2><p>🎯 ${g.goal}</p>
<h3>Rules</h3><ol>${g.steps.map(x => `<li>${x}</li>`).join("")}</ol>
<h3>Tips</h3><ul>${g.tips.map(x => `<li>${x}</li>`).join("")}</ul><p class="modes">${MODES}</p><button id="hp-close">Got it!</button></div>`;
  document.body.appendChild(ov);

  const open = () => ov.classList.add("open");
  const close = () => { ov.classList.remove("open"); try { localStorage.setItem("c4help_" + key, "1"); } catch (e) {} };
  const btn = document.createElement("button"); btn.id = "help"; btn.className = "ghost-btn"; btn.textContent = "❓ How to Play";
  btn.addEventListener("click", open); bar.appendChild(btn);
  ov.addEventListener("click", e => { if (e.target === ov) close(); });
  ov.querySelector("#hp-close").addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  let seen = false; try { seen = !!localStorage.getItem("c4help_" + key); } catch (e) {}
  if (!seen) open();                                   // shows once, the first time you visit each game
})();
