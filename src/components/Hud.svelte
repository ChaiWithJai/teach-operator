<script>
  import { MODULES, ACTS, clearedCount, allCleared, focusScore, maxScore, moduleGrade, actCleared, ui, STEPS, checklistCleared, checklistTotal, routineStreak, routineMarks, routineWeekCount, toggleRoutineMark } from "../lib/store.svelte.js";

  const cleared = $derived(clearedCount());
  const score = $derived(focusScore());
  const max = $derived(maxScore());
  const pct = $derived(max ? Math.round((score / max) * 100) : 0);
  const won = $derived(allCleared());
  const applied = $derived(checklistCleared());
  const applyTotal = $derived(checklistTotal());
  const streak = $derived(routineStreak());
  const weekCount = $derived(routineWeekCount());
  const marks = $derived(routineMarks());

  // jump the wizard to a module's step
  function goToModule(id) {
    const i = STEPS.findIndex((s) => s.id === id);
    if (i >= 0) ui.stepIndex = i;
  }
</script>

<div class="hud" class:won>
  <div class="hud-left">
    <span class="hud-kicker">4 Steps to Hyperfocus</span>
    <div class="acts">
      {#each ACTS as act (act)}
        <div class="act" class:done={actCleared(act)}>
          <span class="act-name">{act}</span>
          <div class="stars">
            {#each MODULES.filter((m) => m.phase === act) as m (m.id)}
              {@const grade = moduleGrade(m)}
              <button
                class="star"
                class:gold={grade === "gold"}
                class:pass={grade === "pass"}
                title={m.title}
                onclick={() => goToModule(m.id)}
                aria-label={m.title}
              >{grade ? "★" : "☆"}</button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="hud-right">
    {#if won}
      <span class="trophy">🏆 Hyperfocus</span>
    {/if}
    <div class="checkin" aria-label="Routine adherence">
      <div class="checkin-score">
        <b>{streak}</b>
        <i>day streak · {weekCount}/7</i>
      </div>
      <button class:done={marks.morning} onclick={() => toggleRoutineMark("morning")}>AM</button>
      <button class:done={marks.evening} onclick={() => toggleRoutineMark("evening")}>PM</button>
    </div>
    <div class="score">
      <div class="score-head"><span>Focus points</span><b>{score}<i>/{max}</i></b></div>
      <div class="bar"><div class="fill" style="width:{pct}%"></div></div>
      <span class="cleared-note">{cleared}/{MODULES.length} modules · {applied}/{applyTotal} actions</span>
    </div>
  </div>
</div>

<style>
  .hud {
    display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
    background: var(--bright); border: 1px solid var(--line); border-radius: var(--radius-lg);
    padding: 14px 20px; margin-bottom: 18px; box-shadow: var(--shadow-card);
    transition: border-color .3s, box-shadow .3s;
  }
  .hud.won { border-color: var(--olive); box-shadow: 0 0 0 1px var(--olive), var(--shadow-card); }
  .hud-kicker { font-family: var(--display); font-style: italic; font-weight: 600; font-size: 15px; color: var(--walnut); }
  .acts { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 6px; }
  .act { display: grid; gap: 3px; }
  .act-name { font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--charcoal-soft); }
  .act.done .act-name { color: var(--olive); }
  .stars { display: flex; gap: 2px; }
  .star {
    border: 0; background: none; cursor: pointer; font-size: 20px; line-height: 1; padding: 0 1px;
    color: var(--line); transition: transform .12s; font-family: serif;
  }
  .star:hover { transform: scale(1.18); }
  .star.gold { color: #d9a441; animation: pop .35s cubic-bezier(.2,.8,.3,1.4); }
  .star.pass { color: var(--olive); animation: pop .35s cubic-bezier(.2,.8,.3,1.4); }
  @keyframes pop { 0% { transform: scale(.4); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .hud-right { display: flex; align-items: center; gap: 14px; }
  .trophy { font-family: var(--display); font-style: italic; font-weight: 600; color: var(--olive); white-space: nowrap; }
  .checkin {
    border: 1px solid var(--line);
    background: var(--cream);
    color: var(--walnut);
    border-radius: 14px;
    padding: 7px;
    min-width: 132px;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 5px;
  }
  .checkin-score { display: grid; line-height: 1.1; padding: 0 3px; }
  .checkin b { font-family: var(--mono); color: var(--terracotta); font-size: 18px; }
  .checkin i { font-style: normal; font-size: 9px; color: var(--charcoal-soft); text-transform: uppercase; letter-spacing: .05em; white-space: nowrap; }
  .checkin button {
    border: 1px solid var(--line);
    background: var(--bright);
    color: var(--charcoal-soft);
    border-radius: 8px;
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    min-width: 30px;
    min-height: 30px;
    cursor: pointer;
  }
  .checkin button.done { border-color: var(--olive); background: var(--olive); color: var(--bright); }
  .score { min-width: 180px; display: grid; gap: 5px; }
  .score-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--charcoal-soft); }
  .score-head b { font-family: var(--mono); font-size: 15px; color: var(--terracotta); }
  .score-head b i { color: var(--charcoal-soft); font-style: normal; font-size: 12px; }
  .bar { height: 7px; background: var(--oat); border-radius: 999px; overflow: hidden; }
  .fill { height: 100%; background: linear-gradient(90deg, var(--terracotta), #d9a441); border-radius: 999px; transition: width .5s cubic-bezier(.2,.7,.2,1); }
  .cleared-note { font-size: 11px; color: var(--charcoal-soft); }

  @media (max-width: 1040px) { .hud { flex-direction: column; align-items: stretch; } .hud-right { justify-content: space-between; } }
</style>
