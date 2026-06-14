// ADHD Copilot bridge — a Vite plugin (replaces the old Python server).
//
// It mounts a tiny /api/* surface on Vite's dev + preview server that reads and
// writes the local data store. It holds NO state of its own: every endpoint
// touches files under the data dir. Codex reads/writes those same files, so the
// browser and the agent share one source of truth and nothing leaves the machine.
//
// Data dir: $ADHD_COPILOT_DIR or ~/.adhd-copilot
import fs from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const DATA_DIR = process.env.ADHD_COPILOT_DIR || join(homedir(), ".adhd-copilot");
const OUTBOX = join(DATA_DIR, "outbox");
const STATE = join(DATA_DIR, "state.json");
const INTENTS = join(DATA_DIR, "intents.log");
const MEMORY = join(DATA_DIR, "memory.md");

const SEED_STATE = {
  kind: "adhd_copilot_handoff",
  version: "0.2.0",
  user_profile: { adhd_relationship: "suspicious", working_style: ["founder"], support_preference: "direct" },
  current_state: { mode: "planning", goal: "", bottleneck: "", energy: 6, urgency: 6 },
  modules: {},
  open_loops: [],
  requested_codex_action: { skill: "adhd-copilot-onboarding", output: "setup_plan" },
  retention: { write_local_memory: false, sync_to_teach_api: false },
};

function ensureStore() {
  fs.mkdirSync(OUTBOX, { recursive: true });
  if (!fs.existsSync(STATE)) fs.writeFileSync(STATE, JSON.stringify(SEED_STATE, null, 2));
  if (!fs.existsSync(INTENTS)) fs.writeFileSync(INTENTS, "");
  if (!fs.existsSync(MEMORY)) {
    fs.writeFileSync(MEMORY, "# ADHD Copilot — Continuity Memory\n\n_Empty. Codex appends here only with approval._\n");
  }
}

function storeMtime() {
  let latest = 0;
  const files = [STATE];
  try { for (const f of fs.readdirSync(OUTBOX)) files.push(join(OUTBOX, f)); } catch {}
  for (const f of files) { try { latest = Math.max(latest, fs.statSync(f).mtimeMs); } catch {} }
  return latest;
}

function readBody(req) {
  return new Promise((resolve) => { let d = ""; req.on("data", (c) => (d += c)); req.on("end", () => resolve(d)); });
}
function send(res, code, body) {
  const out = typeof body === "string" ? body : JSON.stringify(body);
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(out);
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  if (!url.pathname.startsWith("/api/")) return false;
  ensureStore();
  const p = url.pathname;
  const m = req.method;
  try {
    if (m === "GET" && p === "/api/health") { send(res, 200, { ok: true, tier: 1, data_dir: DATA_DIR }); return true; }
    if (m === "GET" && p === "/api/state") { send(res, 200, fs.readFileSync(STATE, "utf8")); return true; }
    if (m === "POST" && p === "/api/state") {
      const body = JSON.parse((await readBody(req)) || "{}");
      fs.writeFileSync(STATE, JSON.stringify(body, null, 2));
      send(res, 200, { ok: true, mtime: storeMtime() });
      return true;
    }
    if (m === "POST" && p === "/api/intent") {
      const intent = JSON.parse((await readBody(req)) || "{}");
      intent.ts = Date.now() / 1000;
      fs.appendFileSync(INTENTS, JSON.stringify(intent) + "\n");
      send(res, 200, { ok: true });
      return true;
    }
    if (m === "GET" && p === "/api/intents") {
      const lines = fs.readFileSync(INTENTS, "utf8").split("\n").filter((l) => l.trim());
      send(res, 200, lines.map((l) => JSON.parse(l)));
      return true;
    }
    if (m === "GET" && p === "/api/outbox") {
      const out = {};
      for (const f of fs.readdirSync(OUTBOX)) {
        const fp = join(OUTBOX, f);
        if (fs.statSync(fp).isFile()) out[f] = fs.readFileSync(fp, "utf8");
      }
      send(res, 200, out);
      return true;
    }
    if (m === "GET" && p === "/api/events") {
      const since = Number(url.searchParams.get("since") || 0);
      const deadline = Date.now() + 25000;
      const tick = () => {
        const mt = storeMtime();
        if (mt > since) return send(res, 200, { changed: true, mtime: mt, state: JSON.parse(fs.readFileSync(STATE, "utf8")) });
        if (Date.now() > deadline) return send(res, 200, { changed: false, mtime: mt });
        setTimeout(tick, 400);
      };
      tick();
      return true;
    }
    send(res, 404, { error: "not found", path: p });
    return true;
  } catch (e) {
    send(res, 500, { error: String(e) });
    return true;
  }
}

export function adhdBridge() {
  // Block body → returns undefined. (Returning the result of `.use()` would hand
  // Vite the connect app as a post-hook and crash with "cannot read 'url'".)
  const mw = (server) => {
    server.middlewares.use(async (req, res, next) => {
      if (!(await handle(req, res))) next();
    });
  };
  return {
    name: "adhd-copilot-bridge",
    configureServer: mw,
    configurePreviewServer: mw,
  };
}
