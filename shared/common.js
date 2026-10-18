/* Shared by every game: theme, sound, confetti. Exposes window.Hub */
(function () {
  let ctx = null, muted = false;
  try { muted = localStorage.getItem("c4muted") === "1"; } catch (e) {}

  function tone(freq, dur, type = "sine", vol = 0.15, delay = 0) {
    if (muted) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      const t = ctx.currentTime + delay, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur);
    } catch (e) {}
  }
  const sfx = {
    place() { tone(440, 0.09, "triangle", 0.2); tone(330, 0.12, "sine", 0.15, 0.04); },
    win() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.35, "triangle", 0.18, i * 0.12)); },
    lose() { [392, 330, 262].forEach((f, i) => tone(f, 0.35, "sawtooth", 0.08, i * 0.18)); },
    draw() { tone(300, 0.25, "square", 0.07); tone(250, 0.3, "square", 0.07, 0.2); },
    click() { tone(650, 0.06, "square", 0.05); }
  };

  const cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv);
  const cx = cv.getContext("2d"); let parts = [], raf = 0;
  function confetti() {
    cv.width = innerWidth; cv.height = innerHeight;
    const colors = ["#ef4444", "#facc15", "#38bdf8", "#4ade80", "#f472b6", "#ffffff"];
    parts = Array.from({ length: 160 }, () => ({
      x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5,
      vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, s: 5 + Math.random() * 7,
      r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: colors[Math.floor(Math.random() * colors.length)] }));
    cancelAnimationFrame(raf); step();
  }
  function step() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
      cx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); cx.restore();
    }
    parts = parts.filter(p => p.y < cv.height + 20);
    if (parts.length) raf = requestAnimationFrame(step);
  }

  const themes = ["classic", "neon", "sunset"];
  function setTheme(t) { document.body.dataset.theme = t; try { localStorage.setItem("c4theme", t); } catch (e) {} }
  let saved = "classic"; try { saved = localStorage.getItem("c4theme") || "classic"; } catch (e) {}
  setTheme(themes.includes(saved) ? saved : "classic");

  const themeBtn = document.getElementById("theme"), soundBtn = document.getElementById("sound");
  const icon = () => { if (soundBtn) soundBtn.textContent = muted ? "🔇" : "🔊"; };
  if (themeBtn) themeBtn.addEventListener("click", () => {
    setTheme(themes[(themes.indexOf(document.body.dataset.theme) + 1) % themes.length]); sfx.click(); });
  if (soundBtn) soundBtn.addEventListener("click", () => {
    muted = !muted; try { localStorage.setItem("c4muted", muted ? "1" : "0"); } catch (e) {} icon(); sfx.click(); });
  icon();

  window.Hub = { tone, sfx, confetti };
})();
