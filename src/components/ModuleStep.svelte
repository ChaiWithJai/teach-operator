<script>
  import { model, ui, PHASES, setDecision } from "../lib/store.svelte.js";
  let { module: m, go, ask, tier } = $props();

  const label = (v) => v.replace(/_/g, " ");
  const saved = $derived(model.modules[m.id]?.decisions || {});
</script>

<div class="card">
  <span class="eyebrow">{m.phase} · {PHASES[m.phase]}</span>
  <h2>{m.title}</h2>
  <p class="obj">{m.objective}</p>

  <ul class="concept-list">
    {#each m.concepts as c}<li>{c}</li>{/each}
  </ul>

  {#each m.decisions as d (d.key)}
    <div class="decision">
      <span class="q">{d.q}</span>
      <div class="chips">
        {#each d.options as o}
          <button
            class="chip"
            class:on={saved[d.key] === o}
            class:good={saved[d.key] === o && o === d.good}
            onclick={() => setDecision(m.id, d.key, o)}
          >{label(o)}</button>
        {/each}
      </div>
    </div>
  {/each}

  <div class="apprentice">
    <span class="lbl">Apprentice work{tier === "live" ? " · Codex can do this" : ""}</span>
    <p>{m.apprentice}</p>
    {#if tier === "live"}
      <button class="btn pine" onclick={() => ask({ type: "apprentice", module: m.id, action: m.apprentice })}>
        Ask Codex to draft this
      </button>
    {/if}
  </div>

  <div class="nav">
    <button class="btn" onclick={() => go(ui.stepIndex - 1)}>← Back</button>
    <button class="btn primary" onclick={() => go(ui.stepIndex + 1)}>Next →</button>
  </div>
</div>
