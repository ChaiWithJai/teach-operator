<script>
  import { ui, MODULES } from "../lib/store.svelte.js";
  let { go, tunedCount, ask, copyHandoff, tier } = $props();
</script>

<div class="card">
  <span class="eyebrow">Hand off · {tunedCount}/{MODULES.length} modules tuned</span>
  <h2>Send it to Codex</h2>
  <p class="obj">Your control plane is captured. Ask Codex to turn it into a setup plan — drafts first, nothing external changes without your approval.</p>

  <div class="apprentice">
    <span class="lbl">What Codex will do</span>
    <p>Read your goal, bottleneck, module choices, and open loops; produce a bounded setup plan + first-24-hours brief in the channel on the right. You approve before anything touches your calendar, files, or phone.</p>
    {#if tier === "live"}
      <button class="btn pine" onclick={() => ask({ type: "setup_plan" })}>Build my setup plan</button>
    {:else}
      <button class="btn" onclick={copyHandoff}>Copy handoff for Codex</button>
    {/if}
  </div>

  <div class="nav">
    <button class="btn" onclick={() => go(ui.stepIndex - 1)}>← Back</button>
    <button class="btn primary" disabled>Done</button>
  </div>
</div>
