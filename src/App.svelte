<script>
  import { onMount } from "svelte";
  import { bridge } from "./lib/bridge.js";
  import { model, ui, STEPS, PHASES, MODULES, stepDone, moduleDone, hydrate, handoffMessage, flash } from "./lib/store.svelte.js";
  import Profile from "./components/Profile.svelte";
  import ModuleStep from "./components/ModuleStep.svelte";
  import Loops from "./components/Loops.svelte";
  import Finish from "./components/Finish.svelte";

  let booted = $state(false);

  const current = $derived(STEPS[ui.stepIndex]);
  const draftNames = $derived(Object.keys(ui.drafts));
  const tunedCount = $derived(MODULES.filter(moduleDone).length);

  async function refreshDrafts() {
    ui.drafts = await bridge.loadOutbox();
  }

  export async function askCodex(intent) {
    if (bridge.tier === "live") {
      intent.state = $state.snapshot(model);
      const ok = await bridge.sendIntent(intent);
      flash(ok ? "Sent to Codex →" : "Couldn't reach the bridge");
      if (ok) setTimeout(refreshDrafts, 800);
    } else {
      await copyHandoff();
    }
  }

  async function copyHandoff() {
    try { await navigator.clipboard.writeText(handoffMessage()); flash("Copied handoff — paste into Codex"); }
    catch { flash("Copy blocked — select the text below"); }
  }

  function go(i) { ui.stepIndex = Math.max(0, Math.min(STEPS.length - 1, i)); }

  // Autosave: any state change debounces a write to the store (live tier only).
  let saveTimer;
  $effect(() => {
    JSON.stringify(model); // touch all fields so the effect tracks them
    if (!booted) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => bridge.saveState($state.snapshot(model)), 400);
  });

  onMount(async () => {
    await bridge.detect();
    ui.tier = bridge.tier;
    const loaded = await bridge.loadState();
    if (loaded) hydrate(loaded);
    booted = true;
    if (bridge.tier === "live") {
      bridge.lastMtime = Date.now() / 1000;
      refreshDrafts();
      bridge.poll(refreshDrafts);
    }
  });

  let lastPhase = null;
  function phaseHeader(step) {
    if (step.phase === lastPhase) return null;
    lastPhase = step.phase;
    return step.phase;
  }
</script>

<div class="wrap">
  <header class="top">
    <div class="brand">
      <h1>ADHD <em>Copilot</em></h1>
      <p>A local control plane for late-diagnosed, suspected-ADHD, and high-agency brains. Click through the four steps to hyperfocus — your choices flow straight to Codex. Nothing leaves this machine.</p>
    </div>
    <div class="tier {ui.tier}" title="How this page talks to Codex">
      <span class="dot"></span>
      <span>{ui.tier === "live" ? "live · invisible handoff" : "paste mode"}</span>
    </div>
  </header>

  <div class="grid">
    <nav class="spine">
      {#each STEPS as step, i (step.id)}
        {@const header = phaseHeader(step)}
        {#if header}
          <div class="phase-label">{header}{PHASES[header] ? " · " + PHASES[header] : ""}</div>
        {/if}
        <button
          class="step-btn"
          class:active={i === ui.stepIndex}
          class:done={stepDone(step)}
          onclick={() => go(i)}
        >
          <span class="mark">✓</span>{step.title}
        </button>
      {/each}
    </nav>

    <main class="stage">
      {#key current.id}
        {#if current.id === "profile"}
          <Profile {go} />
        {:else if current.id === "loops"}
          <Loops {go} />
        {:else if current.id === "finish"}
          <Finish {go} {tunedCount} ask={askCodex} {copyHandoff} tier={ui.tier} />
        {:else}
          <ModuleStep module={current.module} {go} ask={askCodex} tier={ui.tier} />
        {/if}
      {/key}
    </main>

    <aside class="console">
      <h3>
        <span>Codex Channel</span>
        <span class="channel">{ui.tier === "live" ? "bridge connected" : "paste mode"}</span>
      </h3>

      {#if draftNames.length}
        <div class="drafts">
          {#each draftNames as name (name)}
            <div class="draft">
              <div class="name">{name}</div>
              <pre>{ui.drafts[name].slice(0, 4000)}</pre>
            </div>
          {/each}
        </div>
      {:else}
        <p class="empty-note">When you ask Codex to draft something, its work appears here live — setup plans, daily briefs, triage. Drafts only. Nothing touches your calendar, files, or devices without your say-so.</p>
      {/if}

      {#if ui.tier === "live"}
        <div class="console-actions">
          <button class="btn primary" onclick={() => askCodex({ type: "setup_plan" })}>Build my setup plan</button>
          <button class="btn" onclick={refreshDrafts}>Refresh</button>
        </div>
      {:else}
        <button class="btn primary" onclick={copyHandoff}>Copy handoff for Codex</button>
        <pre class="paste-box">{handoffMessage()}</pre>
      {/if}
    </aside>
  </div>
</div>

{#if ui.toast}
  <div class="toast show">{ui.toast}</div>
{/if}
