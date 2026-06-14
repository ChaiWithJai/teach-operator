// Client-side transport. Two tiers, graceful fallback:
//   live  — Vite dev/preview server is up with the bridge plugin (/api/*). Invisible handoff.
//   paste — app opened without the server (e.g. a bare static build). Show a paste packet.
const API = "/api";

export const bridge = {
  tier: "paste",
  lastMtime: 0,

  async detect() {
    try {
      const r = await fetch(`${API}/health`, { signal: AbortSignal.timeout(900) });
      if (r.ok) { this.tier = "live"; return; }
    } catch {}
    this.tier = "paste";
  },

  async loadState() {
    if (this.tier !== "live") return null;
    try { const r = await fetch(`${API}/state`); return r.ok ? await r.json() : null; } catch { return null; }
  },

  async saveState(state) {
    if (this.tier !== "live") return;
    try {
      await fetch(`${API}/state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
    } catch {}
  },

  async sendIntent(intent) {
    if (this.tier !== "live") return false;
    try {
      await fetch(`${API}/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intent),
      });
      return true;
    } catch { return false; }
  },

  async loadOutbox() {
    if (this.tier !== "live") return {};
    try { const r = await fetch(`${API}/outbox`); return r.ok ? await r.json() : {}; } catch { return {}; }
  },

  // Long-poll the store; call onChange() whenever Codex writes new state/drafts.
  async poll(onChange) {
    if (this.tier !== "live") return;
    while (this.tier === "live") {
      try {
        const r = await fetch(`${API}/events?since=${this.lastMtime}`, { signal: AbortSignal.timeout(30000) });
        if (r.ok) {
          const d = await r.json();
          this.lastMtime = d.mtime || this.lastMtime;
          if (d.changed) onChange();
        }
      } catch {
        await new Promise((res) => setTimeout(res, 1500));
      }
    }
  },
};
