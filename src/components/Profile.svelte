<script>
  import { model } from "../lib/store.svelte.js";
  let { go } = $props();

  const rels = ["suspicious", "diagnosed_late", "diagnosed", "self_identified", "curious"];
  const styles = ["founder", "operator", "creator", "developer", "manager"];
  const support = ["direct", "structured", "gentle"];
  const label = (v) => v.replace(/_/g, " ");

  function toggleStyle(v) {
    const arr = model.user_profile.working_style;
    const i = arr.indexOf(v);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(v);
  }
</script>

<div class="card">
  <span class="eyebrow">Start · who's at the controls</span>
  <h2>You</h2>
  <p class="obj">No diagnosis assumed, no shame. This just tunes how Codex talks to you.</p>

  <div class="decision">
    <span class="q">Your relationship with ADHD</span>
    <div class="chips">
      {#each rels as v}
        <button class="chip" class:on={model.user_profile.adhd_relationship === v}
          onclick={() => (model.user_profile.adhd_relationship = v)}>{label(v)}</button>
      {/each}
    </div>
  </div>

  <div class="decision">
    <span class="q">How you work (pick any)</span>
    <div class="chips">
      {#each styles as v}
        <button class="chip" class:on={model.user_profile.working_style.includes(v)}
          onclick={() => toggleStyle(v)}>{label(v)}</button>
      {/each}
    </div>
  </div>

  <div class="decision">
    <span class="q">How should Codex talk to you?</span>
    <div class="chips">
      {#each support as v}
        <button class="chip" class:on={model.user_profile.support_preference === v}
          onclick={() => (model.user_profile.support_preference = v)}>{label(v)}</button>
      {/each}
    </div>
  </div>

  <label class="field">
    <span>Your one current goal</span>
    <input type="text" placeholder="e.g. Ship the beta by end of month" bind:value={model.current_state.goal} />
  </label>

  <label class="field">
    <span>What's stopping you (the bottleneck)</span>
    <input type="text" placeholder="e.g. I keep context-switching and never start the hard task" bind:value={model.current_state.bottleneck} />
  </label>

  <div class="two">
    <div class="range-row">
      <span class="v">Energy · <b>{model.current_state.energy}</b>/10</span>
      <input type="range" min="0" max="10" bind:value={model.current_state.energy} />
    </div>
    <div class="range-row">
      <span class="v">Urgency · <b>{model.current_state.urgency}</b>/10</span>
      <input type="range" min="0" max="10" bind:value={model.current_state.urgency} />
    </div>
  </div>

  <div class="nav">
    <button class="btn" disabled>← Back</button>
    <button class="btn primary" onclick={() => go(1)}>Next →</button>
  </div>
</div>
