<script>
  import { model, ui, PHASES, setDecision, setChecklist, checklistDone } from "../lib/store.svelte.js";
  let { module: m, go, ask, tier } = $props();

  const label = (v) => v.replace(/_/g, " ");
  const saved = $derived(model.modules[m.id]?.decisions || {});
  const applied = $derived(model.modules[m.id]?.checklist || {});
  const appliedCount = $derived(checklistDone(m));
</script>

<div class="card">
  <span class="eyebrow">{m.phase} · {PHASES[m.phase]}</span>
  <h2>{m.title}</h2>
  <p class="obj">{m.objective}</p>

  <ul class="concept-list">
    {#each m.concepts as c (c)}<li>{c}</li>{/each}
  </ul>

  <section class="apply">
    <div class="apply-head">
      <span>Apply checklist</span>
      <b>{appliedCount}/{m.checklist.length}</b>
    </div>
    <div class="apply-list">
      {#each m.checklist as item, i (item)}
        <label class="apply-item" class:checked={applied[i]}>
          <input
            type="checkbox"
            checked={!!applied[i]}
            onchange={(event) => setChecklist(m.id, i, event.currentTarget.checked)}
          />
          <span>{item}</span>
        </label>
      {/each}
    </div>
  </section>

  {#each m.decisions as d (d.key)}
    <div class="decision">
      <span class="q">{d.q}</span>
      <div class="chips">
        {#each d.options as o (o)}
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

<style>
  .apply {
    margin: 0 0 20px;
    border: 1px solid var(--line);
    background: rgba(86, 102, 48, 0.08);
    border-radius: 14px;
    padding: 14px;
  }
  .apply-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }
  .apply-head span {
    font-weight: 700;
    color: var(--walnut);
  }
  .apply-head b {
    font-family: var(--mono);
    color: var(--olive);
    font-size: 13px;
  }
  .apply-list {
    display: grid;
    gap: 8px;
  }
  .apply-item {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 9px;
    align-items: start;
    color: var(--charcoal);
    font-size: 14px;
    cursor: pointer;
  }
  .apply-item input {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    accent-color: var(--olive);
  }
  .apply-item.checked span {
    color: var(--olive-deep);
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
</style>
