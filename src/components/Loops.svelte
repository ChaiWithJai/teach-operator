<script>
  import { model, ui } from "../lib/store.svelte.js";
  let { go } = $props();

  const lanes = ["do_now", "schedule", "delegate", "park"];
  const label = (v) => v.replace(/_/g, " ");
  let text = $state("");
  let lane = $state("schedule");

  function add() {
    const t = text.trim();
    if (!t) return;
    model.open_loops.push({ text: t, lane, time_window: "", approval_required: true });
    text = "";
  }
  function remove(i) { model.open_loops.splice(i, 1); }
</script>

<div class="card">
  <span class="eyebrow">Now · get it out of your head</span>
  <h2>Open Loops</h2>
  <p class="obj">Dump what's rattling around. Each loop gets a lane — Codex will sort and schedule on request.</p>

  <div class="loops">
    {#if model.open_loops.length === 0}
      <p class="obj" style="margin:0">No loops yet.</p>
    {/if}
    {#each model.open_loops as loop, i (i)}
      <div class="loop">
        <span>{loop.text}</span>
        <span class="lane-tag">{label(loop.lane)}</span>
        <button class="icon-btn" onclick={() => remove(i)} aria-label="remove">×</button>
      </div>
    {/each}
  </div>

  <div class="loop">
    <input type="text" placeholder="e.g. Reply to the investor email" bind:value={text}
      onkeydown={(e) => e.key === "Enter" && add()} />
    <select bind:value={lane}>
      {#each lanes as l}<option value={l}>{label(l)}</option>{/each}
    </select>
    <button class="icon-btn" onclick={add} aria-label="add">+</button>
  </div>

  <div class="nav">
    <button class="btn" onclick={() => go(ui.stepIndex - 1)}>← Back</button>
    <button class="btn primary" onclick={() => go(ui.stepIndex + 1)}>Next →</button>
  </div>
</div>
