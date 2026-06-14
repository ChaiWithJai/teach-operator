// Tiny dependency-free confetti burst. Spawns a handful of paper bits that arc out
// and fall, then clean themselves up. Warm-earth palette to match the board.
const COLORS = ["#974529", "#566630", "#d9a441", "#7a3720", "#c97a6a", "#3b2a1e"];
let injected = false;

function injectKeyframes() {
  if (injected) return;
  injected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes adhd-confetti-fall {
      to { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
    }`;
  document.head.appendChild(style);
}

// Burst at viewport coords (cx, cy). count scales the celebration.
export function burst(cx, cy, count = 28) {
  // Respect reduced-motion: skip the animation entirely (still ADHD-friendly via the toast).
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  injectKeyframes();
  const layer = document.createElement("div");
  layer.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;z-index:60;pointer-events:none;";
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const bit = document.createElement("span");
    const size = 6 + (i % 4) * 2;
    const angle = (Math.PI * 2 * i) / count + (i % 3) * 0.3;
    const dist = 60 + (i % 5) * 34;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 120; // gravity bias downward
    bit.style.cssText = `
      position:fixed; left:${cx}px; top:${cy}px;
      width:${size}px; height:${size * 1.6}px;
      background:${COLORS[i % COLORS.length]};
      border-radius:1px;
      --dx:${dx}px; --dy:${dy}px; --rot:${(i % 2 ? 1 : -1) * (360 + i * 40)}deg;
      animation: adhd-confetti-fall ${0.9 + (i % 4) * 0.15}s cubic-bezier(.2,.6,.3,1) forwards;`;
    layer.appendChild(bit);
  }
  setTimeout(() => layer.remove(), 1600);
}

// Convenience: burst from the center of an element.
export function burstFrom(el, count) {
  if (!el) return burst(window.innerWidth / 2, window.innerHeight / 3, count);
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, count);
}
