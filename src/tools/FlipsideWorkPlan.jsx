import { useState, useEffect } from "react";

const STORAGE_KEY_TASKS = "flipside-tasks-v1";
const STORAGE_KEY_MILESTONES = "flipside-milestones-v1";

/* Priority styling, keyed to the brand palette. */
const FLAG = {
  Critical: { color: "#A63D1D", border: "#E8B9A8", bg: "#FCF0EB" },
  High:     { color: "#213E68", border: "#B9C6D8", bg: "#EFF3F8" },
  Medium:   { color: "#7A6839", border: "#DCCFAE", bg: "#F9F5EB" },
  Low:      { color: "#5F6C80", border: "#D3DAE4", bg: "#F6F8FB" },
};

/* ── Storage ────────────────────────────────────────────────────────────────
   Browser localStorage. Wrapped because Safari private mode and blocked
   third-party storage both throw on access rather than returning null.      */
const store = {
  read(key) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};

const phases = [
  {
    id: 1, label: "Phase 1", title: "Foundation", timeframe: "Week 1–2",
    summary: "Set up Substack properly before the first subscriber arrives.",
    tasks: [
      { id: "1a", task: "Create Substack publication at financialflipside.substack.com", priority: "Critical" },
      { id: "1b", task: "Set publication name: The Financial Flipside", priority: "Critical" },
      { id: "1c", task: "Write the About page using the approved mission statement (Version 2 — The Invitation)", priority: "Critical" },
      { id: "1d", task: "Upload profile photo and header image consistent with SEMAJ Media brand", priority: "High" },
      { id: "1e", task: "Connect custom domain: financialflipside.com pointing to Substack publication", priority: "High" },
      { id: "1f", task: "Write and activate the welcome email using the approved copy from the SEMAJ Media document", priority: "Critical" },
      { id: "1g", task: "Set tagline: Financial knowledge for people who had to figure it out themselves", priority: "High" },
      { id: "1h", task: "Configure free tier only — no paid tier yet", priority: "Critical" },
      { id: "1i", task: "Set up Substack Notes profile for short-form content between issues", priority: "Medium" },
      { id: "1j", task: "Update all social bios and link-in-bio to point to the Substack URL", priority: "High" },
    ],
  },
  {
    id: 2, label: "Phase 2", title: "Content Engine", timeframe: "Week 2–4",
    summary: "Build the editorial foundation — first posts, consistent voice, content pillars.",
    tasks: [
      { id: "2a", task: "Write and publish Issue 1 — the launch post. Introduce yourself, the mission, and what subscribers can expect.", priority: "Critical" },
      { id: "2b", task: "Map the four content pillars: Business Finance, Tax Strategy, Personal Finance, Wealth Building", priority: "High" },
      { id: "2c", task: "Plan Issues 2 through 6 — one topic per issue from the four pillars", priority: "High" },
      { id: "2d", task: "Establish posting cadence: every 2 weeks minimum. Block dates on your calendar now.", priority: "Critical" },
      { id: "2e", task: "Write Issue 2 — the first real issue after the launch intro. Lead with your strongest pillar topic.", priority: "High" },
      { id: "2f", task: "Create a standard post template: hook, context, the insight, the takeaway, CTA", priority: "Medium" },
      { id: "2g", task: "Repurpose 2 existing Heyward CPA blog posts as early Substack issues to reduce writing burden in Month 1", priority: "Medium" },
      { id: "2h", task: "Write 3 Substack Notes per week — short observations, financial takes, conversation starters", priority: "Medium" },
    ],
  },
  {
    id: 3, label: "Phase 3", title: "Audience Growth", timeframe: "Month 2–3",
    summary: "Get the first 200 subscribers. Every subscriber now is a potential paid member later.",
    tasks: [
      { id: "3a", task: "Import existing Heyward CPA email list — anyone who has opted into general firm communication", priority: "High" },
      { id: "3b", task: "Send announcement email to both AWeber lists (clients and leads) linking to Substack", priority: "Critical" },
      { id: "3c", task: "Cross-promote Flipside in every Heyward CPA Live YouTube description and episode outro", priority: "High" },
      { id: "3d", task: "Add Substack link to email signature on every outbound email from heywardcpa.com", priority: "High" },
      { id: "3e", task: "Activate Substack Recommendations — recommend 3 to 5 finance or entrepreneurship Substacks", priority: "Medium" },
      { id: "3f", task: "Post one Substack Notes thread per week to X (Twitter) to drive new subscribers", priority: "Medium" },
      { id: "3g", task: "Share each issue to LinkedIn Personal within 24 hours of publication", priority: "High" },
      { id: "3h", task: "Share each issue to Facebook Company Page with a quote pull and link", priority: "Medium" },
      { id: "3i", task: "Turn each issue into a LinkedIn text post — summarize the key insight in 150 words", priority: "Medium" },
      { id: "3j", task: "Create an Instagram Reel or carousel from each issue — The Prescription format works here", priority: "Medium" },
    ],
  },
  {
    id: 4, label: "Phase 4", title: "Paid Tier Prep", timeframe: "Month 3–4",
    summary: "Evaluate readiness and prepare the paid tier launch. Credibility before conversion.",
    tasks: [
      { id: "4a", task: "Evaluate subscriber count — target 200 or more free subscribers before launching paid tier", priority: "Critical" },
      { id: "4b", task: "Evaluate open rates — target 40 percent average or higher before monetizing", priority: "High" },
      { id: "4c", task: "Define what paid subscribers get — 2 to 3 specific benefits such as deep dives, templates, or Q&A access", priority: "Critical" },
      { id: "4d", task: "Set paid tier pricing: $8 to $10 per month or $80 to $100 per year with an annual discount", priority: "High" },
      { id: "4e", task: "Write the founding member launch email — offer a discounted rate for the first 30 days only", priority: "High" },
      { id: "4f", task: "Create one paid-only post before the launch to prove the content exists before people pay for it", priority: "High" },
      { id: "4g", task: "Configure Stripe payment processing through Substack", priority: "Critical" },
      { id: "4h", task: "Announce the paid tier launch to the free list with the founding member offer", priority: "Critical" },
    ],
  },
  {
    id: 5, label: "Phase 5", title: "Steady State", timeframe: "Month 4+",
    summary: "Consistent output, growing audience, compounding revenue. The machine runs itself.",
    tasks: [
      { id: "5a", task: "Maintain every-2-week free issue cadence — consistency above all else", priority: "Critical" },
      { id: "5b", task: "Publish one paid-only deep dive per month — templates, frameworks, or extended analysis", priority: "High" },
      { id: "5c", task: "Review subscriber growth monthly — track free vs paid conversion rate", priority: "High" },
      { id: "5d", task: "Activate Substack cross-promotion with one peer newsletter per month", priority: "Medium" },
      { id: "5e", task: "Use the Heyward CPA Live Tool Spotlight segment to drive Substack signups with a free resource offer", priority: "High" },
      { id: "5f", task: "Repurpose to Medium — post best free issues there with a Substack CTA at the bottom", priority: "Medium" },
      { id: "5g", task: "Evaluate Substack growth at Month 6 — if under 500 subscribers, reassess growth tactics", priority: "High" },
      { id: "5h", task: "Evaluate Beehiiv migration at Month 12 — revisit if list exceeds 1,000 subscribers", priority: "Low" },
    ],
  },
];

const decisions = [
  ["Platform", "Staying on Substack. No Beehiiv migration for now. Revisit at 1,000 subscribers."],
  ["Paid tier timing", "Free only for 60–90 days. Paid tier launches when list hits 200+ subscribers with 40%+ open rate."],
  ["Paid tier price", "$8–$10/month or $80–$100/year. Founding member rate for first 30 days."],
  ["Cadence", "Every 2 weeks minimum. Quality and consistency over frequency."],
  ["Free vs. paid split", "Free = what to do. Paid = how to do it — frameworks, templates, deep application."],
  ["Migration trigger", "Evaluate Beehiiv at Month 12 if list exceeds 1,000 subscribers."],
];

const TABS = [
  { id: "tasks", label: "Work plan" },
  { id: "milestones", label: "Milestones" },
  { id: "decisions", label: "Key decisions" },
];

const FILTERS = ["All", "Remaining", "Done", "Critical", "High", "Medium", "Low"];

/* ── Gauge ───────────────────────────────────────────────────────────────── */
function Gauge({ value, target, label, unit, color, hint }) {
  const pct = Math.min(Math.round((value / target) * 100), 100);
  const met = value >= target;

  return (
    <div>
      <div className="gauge-top">
        <span className="gauge-label">{label}</span>
        <span className="gauge-status" data-met={met}>
          {met ? "Reached" : `${(target - value).toLocaleString()} to go`}
        </span>
      </div>

      <div className="gauge-figure" data-met={met}>
        {value.toLocaleString()}{unit}
        <small>of {target.toLocaleString()}{unit}</small>
      </div>

      <div className="gauge-track">
        <i style={{ width: pct + "%", background: met ? "var(--good)" : color }} />
      </div>

      <p className="gauge-hint">{hint}</p>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function FlipsideWorkPlan() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({ 1: true, 2: false, 3: false, 4: false, 5: false });
  const [saveStatus, setSaveStatus] = useState("saved");

  const [tasks, setTasks] = useState(() => {
    const init = {};
    phases.forEach((p) => p.tasks.forEach((t) => { init[t.id] = false; }));
    return init;
  });

  const [milestones, setMilestones] = useState({
    subscribers: 0,
    openRate: 0,
    issuesPublished: 0,
    paidSubscribers: 0,
    lastUpdated: null,
  });

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...milestones });

  /* Load saved progress */
  useEffect(() => {
    const savedTasks = store.read(STORAGE_KEY_TASKS);
    if (savedTasks) setTasks((prev) => ({ ...prev, ...savedTasks }));

    const savedMilestones = store.read(STORAGE_KEY_MILESTONES);
    if (savedMilestones) {
      setMilestones(savedMilestones);
      setDraft(savedMilestones);
    }
  }, []);

  const persist = (key, value) => {
    setSaveStatus(store.write(key, value) ? "saved" : "error");
  };

  const toggleTask = (id) => {
    const next = { ...tasks, [id]: !tasks[id] };
    setTasks(next);
    persist(STORAGE_KEY_TASKS, next);
  };

  const saveMilestones = () => {
    const updated = { ...draft, lastUpdated: new Date().toLocaleDateString() };
    setMilestones(updated);
    setEditing(false);
    persist(STORAGE_KEY_MILESTONES, updated);
  };

  const togglePhase = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const progress = (phase) => {
    const total = phase.tasks.length;
    const done = phase.tasks.filter((t) => tasks[t.id]).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const totalTasks = phases.reduce((a, p) => a + p.tasks.length, 0);
  const totalDone = Object.values(tasks).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalTasks) * 100);

  const getFiltered = (phase) => {
    if (filter === "All") return phase.tasks;
    if (filter === "Done") return phase.tasks.filter((t) => tasks[t.id]);
    if (filter === "Remaining") return phase.tasks.filter((t) => !tasks[t.id]);
    return phase.tasks.filter((t) => t.priority === filter);
  };

  const subsReady = milestones.subscribers >= 200;
  const openReady = milestones.openRate >= 40;
  const paidReady = subsReady && openReady;

  const saveLabel =
    saveStatus === "error"
      ? "Not saved — storage is blocked in this browser"
      : "Saved to this browser";

  return (
    <div>
      {/* ── Head ─────────────────────────────────────────────────────────── */}
      <div className="doc-head">
        <div className="doc-kicker">The Financial Flipside</div>
        <h1 className="doc-title">Staying on Substack. Building it right.</h1>
        <p className="doc-lede">
          Five phases from an empty publication to a paid tier that has earned its price.
          Tick items as you finish them; the count keeps itself.
        </p>

        <div className="balance">
          <div>
            <div className="balance-figure">
              {totalDone}<em>/{totalTasks}</em>
            </div>
            <div className="balance-caption">
              Tasks complete — {overallPct}%
            </div>
          </div>
          <div className="balance-meter">
            <i style={{ width: overallPct + "%" }} />
          </div>
          <div className="save-state" data-state={saveStatus}>{saveLabel}</div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className="tab"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Work plan ────────────────────────────────────────────────────── */}
      {activeTab === "tasks" && (
        <div>
          <div className="filters">
            <span className="filters-label">Show</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="sheet-wrap">
            {phases.map((phase) => {
              const { done, total, pct } = progress(phase);
              const isOpen = expanded[phase.id];
              const items = getFiltered(phase);

              return (
                <section className="ledger" key={phase.id}>
                  <button
                    className="ledger-head"
                    onClick={() => togglePhase(phase.id)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="ledger-phase">
                        {phase.label} — {phase.timeframe}
                      </div>
                      <h2 className="ledger-title">{phase.title}</h2>
                      <p className="ledger-summary">{phase.summary}</p>
                    </div>

                    <div className="ledger-count">
                      <b>{done}<em>/{total}</em></b>
                      <div className="bar"><i style={{ width: pct + "%" }} /></div>
                      <div className="caret">{isOpen ? "Hide" : "Show"}</div>
                    </div>
                  </button>

                  {isOpen && (
                    items.length === 0 ? (
                      <p className="empty">Nothing in this phase matches “{filter}”.</p>
                    ) : (
                      items.map((t) => {
                        const isDone = !!tasks[t.id];
                        const flag = FLAG[t.priority];
                        return (
                          <button
                            key={t.id}
                            className="row"
                            data-done={isDone}
                            onClick={() => toggleTask(t.id)}
                            aria-pressed={isDone}
                          >
                            <span className="row-gutter">
                              <span className="tick">{isDone ? "✓" : ""}</span>
                              <span className="row-id">{t.id}</span>
                            </span>
                            <span className="row-task">{t.task}</span>
                            <span
                              className="flag"
                              style={{ color: flag.color, borderColor: flag.border, background: flag.bg }}
                            >
                              {t.priority}
                            </span>
                          </button>
                        );
                      })
                    )
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Milestones ───────────────────────────────────────────────────── */}
      {activeTab === "milestones" && (
        <div className="sheet-wrap">
          <div className="gate" data-open={paidReady}>
            <h2 className="gate-title">
              {paidReady ? "The paid tier is ready to launch" : "The paid tier stays closed for now"}
            </h2>
            <p className="gate-note">
              {paidReady
                ? "Both conditions are met. Move to Phase 4 and send the founding member offer."
                : "Two conditions have to clear together before you charge for this. Log your numbers below to see where you stand."}
            </p>

            <div className="gate-conds">
              <span className="cond" data-met={subsReady}>
                {subsReady ? "✓" : "○"} 200 free subscribers — <b>{milestones.subscribers.toLocaleString()} now</b>
              </span>
              <span className="cond" data-met={openReady}>
                {openReady ? "✓" : "○"} 40% open rate — <b>{milestones.openRate}% now</b>
              </span>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">Paid tier triggers</div>
            <div className="panel-body">
              <div className="gauges">
                <Gauge
                  value={milestones.subscribers}
                  target={200}
                  label="Free subscribers"
                  unit=""
                  color="var(--amber)"
                  hint="The list has to be big enough that a small conversion rate still means real money."
                />
                <Gauge
                  value={milestones.openRate}
                  target={40}
                  label="Open rate"
                  unit="%"
                  color="var(--coral)"
                  hint="A big list nobody opens will not convert. This is the quality check."
                />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">Publication progress</div>
            <div className="panel-body">
              <div className="gauges">
                <Gauge
                  value={milestones.issuesPublished}
                  target={6}
                  label="Issues published"
                  unit=""
                  color="var(--navy)"
                  hint="Six issues is where a cadence stops being a claim and starts being a track record."
                />
                <Gauge
                  value={milestones.paidSubscribers}
                  target={100}
                  label="Paid subscribers"
                  unit=""
                  color="var(--coral)"
                  hint="100 paid at $8/month is roughly $9,600 a year."
                />
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">Your numbers</div>
            <div className="panel-body">
              {!editing ? (
                <>
                  <p className="gauge-hint" style={{ maxWidth: "58ch", marginBottom: 16 }}>
                    Pull these from your Substack dashboard whenever you publish. Everything above updates from here.
                  </p>
                  <button
                    className="btn"
                    onClick={() => { setDraft({ ...milestones }); setEditing(true); }}
                  >
                    Update numbers
                  </button>
                  {milestones.lastUpdated && (
                    <p className="stamp">Last updated {milestones.lastUpdated}</p>
                  )}
                </>
              ) : (
                <>
                  {[
                    { key: "subscribers", label: "Free subscribers", placeholder: "47" },
                    { key: "openRate", label: "Latest open rate (%)", placeholder: "38" },
                    { key: "issuesPublished", label: "Issues published", placeholder: "3" },
                    { key: "paidSubscribers", label: "Paid subscribers", placeholder: "0" },
                  ].map(({ key, label, placeholder }) => (
                    <div className="field" key={key}>
                      <label htmlFor={"m-" + key}>{label}</label>
                      <input
                        id={"m-" + key}
                        type="number"
                        min="0"
                        value={draft[key] || ""}
                        placeholder={placeholder}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, [key]: Number(e.target.value) || 0 }))
                        }
                      />
                    </div>
                  ))}
                  <div className="btn-row">
                    <button className="btn" onClick={saveMilestones}>Save numbers</button>
                    <button className="btn btn-quiet" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Decisions ────────────────────────────────────────────────────── */}
      {activeTab === "decisions" && (
        <div className="sheet-wrap">
          <div className="panel">
            <div className="panel-head">Settled — do not relitigate</div>
            <dl>
              {decisions.map(([label, value]) => (
                <div className="decision" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <footer className="doc-foot">
        The Financial Flipside — financialflipside.substack.com
        <br />
        A SEMAJ Media publication, Heyward Management Group
      </footer>
    </div>
  );
}
