import { useState, useEffect } from "react";

const GREEN     = "#3C870E";
const GREEN_DK  = "#2A5E0A";
const GOLD      = "#C4A84A";
const GOLD_DK   = "#8B7A2E";
const DARK      = "#1A1A1A";
const CHARCOAL  = "#2E2E2E";
const GRAY      = "#888888";
const LGRAY     = "#F4F4F4";
const MGRAY     = "#CCCCCC";
const WHITE     = "#FFFFFF";
const ORANGE_DK = "#CC4A18";
const RED       = "#CC2222";

const PRIORITY_COLOR = { Critical: ORANGE_DK, High: GREEN_DK, Medium: GOLD_DK, Low: GRAY };
const PRIORITY_BG    = { Critical: "#FFF0EA", High: "#EAF3E3", Medium: "#FAF4E3", Low: LGRAY };

const STORAGE_KEY_TASKS     = "flipside-tasks-v1";
const STORAGE_KEY_MILESTONES = "flipside-milestones-v1";

const phases = [
  {
    id: 1, label: "Phase 1", title: "Foundation", timeframe: "Week 1–2",
    color: GOLD, lightText: false, icon: "🏗️",
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
    ]
  },
  {
    id: 2, label: "Phase 2", title: "Content Engine", timeframe: "Week 2–4",
    color: GREEN, lightText: true, icon: "✍️",
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
    ]
  },
  {
    id: 3, label: "Phase 3", title: "Audience Growth", timeframe: "Month 2–3",
    color: CHARCOAL, lightText: true, icon: "📈",
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
    ]
  },
  {
    id: 4, label: "Phase 4", title: "Paid Tier Prep", timeframe: "Month 3–4",
    color: "#8B4000", lightText: true, icon: "💰",
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
    ]
  },
  {
    id: 5, label: "Phase 5", title: "Steady State", timeframe: "Month 4+",
    color: DARK, lightText: true, icon: "🔄",
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
    ]
  }
];

const decisions = [
  ["Platform", "Staying on Substack. No Beehiiv migration for now. Revisit at 1,000 subscribers."],
  ["Paid tier timing", "Free only for 60–90 days. Paid tier launches when list hits 200+ subscribers with 40%+ open rate."],
  ["Paid tier price", "$8–$10/month or $80–$100/year. Founding member rate for first 30 days."],
  ["Cadence", "Every 2 weeks minimum. Quality and consistency over frequency."],
  ["Free vs. paid split", "Free = what to do. Paid = how to do it — frameworks, templates, deep application."],
  ["Migration trigger", "Evaluate Beehiiv at Month 12 if list exceeds 1,000 subscribers."],
];

// ── Milestone gauge component ─────────────────────────────────────────────────
function Gauge({ value, target, label, unit, color, hint }) {
  const pct = Math.min(Math.round((value / target) * 100), 100);
  const reached = value >= target;
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: "bold", color: GRAY, letterSpacing: 1 }}>{label.toUpperCase()}</span>
        <span style={{ fontSize: 11, color: reached ? GREEN : GRAY }}>{reached ? "✓ Reached" : `${target - value} to go`}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span style={{ fontSize: 28, fontWeight: "bold", color: reached ? GREEN : CHARCOAL, lineHeight: 1 }}>{value.toLocaleString()}</span>
        <span style={{ fontSize: 13, color: GRAY }}>{unit} / target: {target.toLocaleString()}{unit}</span>
      </div>
      <div style={{ background: "#E8E8E8", borderRadius: 6, height: 10, overflow: "hidden", marginBottom: 4 }}>
        <div style={{
          background: reached ? GREEN : color,
          width: pct + "%", height: "100%",
          borderRadius: 6, transition: "width 0.5s ease"
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: GRAY }}>{pct}% of target</span>
        <span style={{ fontSize: 10, color: GRAY, fontStyle: "italic" }}>{hint}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FlipsideWorkPlan() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({ 1: true, 2: false, 3: false, 4: false, 5: false });
  const [saveStatus, setSaveStatus] = useState("saved");

  // Task state — loaded from persistent storage
  const [tasks, setTasks] = useState(() => {
    const init = {};
    phases.forEach(p => p.tasks.forEach(t => { init[t.id] = false; }));
    return init;
  });

  // Milestone state — loaded from persistent storage
  const [milestones, setMilestones] = useState({
    subscribers: 0,
    openRate: 0,
    issuesPublished: 0,
    paidSubscribers: 0,
    lastUpdated: null,
  });

  const [editingMilestone, setEditingMilestone] = useState(false);
  const [draftMilestone, setDraftMilestone] = useState({ ...milestones });

  // ── Load from storage on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        const savedTasks = await window.storage.get(STORAGE_KEY_TASKS);
        if (savedTasks && savedTasks.value) {
          setTasks(JSON.parse(savedTasks.value));
        }
      } catch (e) { /* first load — no saved tasks yet */ }

      try {
        const savedMilestones = await window.storage.get(STORAGE_KEY_MILESTONES);
        if (savedMilestones && savedMilestones.value) {
          const m = JSON.parse(savedMilestones.value);
          setMilestones(m);
          setDraftMilestone(m);
        }
      } catch (e) { /* first load */ }
    }
    loadData();
  }, []);

  // ── Save tasks to storage ───────────────────────────────────────────────────
  const saveTasksToStorage = async (newTasks) => {
    setSaveStatus("saving");
    try {
      await window.storage.set(STORAGE_KEY_TASKS, JSON.stringify(newTasks));
      setSaveStatus("saved");
    } catch (e) {
      setSaveStatus("error");
    }
  };

  const toggleTask = (id) => {
    const newTasks = { ...tasks, [id]: !tasks[id] };
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  // ── Save milestones to storage ──────────────────────────────────────────────
  const saveMilestones = async () => {
    const updated = { ...draftMilestone, lastUpdated: new Date().toLocaleDateString() };
    setMilestones(updated);
    setEditingMilestone(false);
    setSaveStatus("saving");
    try {
      await window.storage.set(STORAGE_KEY_MILESTONES, JSON.stringify(updated));
      setSaveStatus("saved");
    } catch (e) {
      setSaveStatus("error");
    }
  };

  const togglePhase = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const progress = (phase) => {
    const total = phase.tasks.length;
    const done  = phase.tasks.filter(t => tasks[t.id]).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const totalTasks = phases.reduce((a, p) => a + p.tasks.length, 0);
  const totalDone  = Object.values(tasks).filter(Boolean).length;
  const overallPct = Math.round((totalDone / totalTasks) * 100);

  const getFiltered = (phase) => {
    if (filter === "All")       return phase.tasks;
    if (filter === "Done")      return phase.tasks.filter(t => tasks[t.id]);
    if (filter === "Remaining") return phase.tasks.filter(t => !tasks[t.id]);
    return phase.tasks.filter(t => t.priority === filter);
  };

  // Paid tier readiness
  const subsReady  = milestones.subscribers >= 200;
  const openReady  = milestones.openRate >= 40;
  const paidReady  = subsReady && openReady;

  const inputStyle = {
    width: "100%", padding: "8px 12px", borderRadius: 6,
    border: "2px solid " + MGRAY, fontSize: 14,
    fontFamily: "Arial, sans-serif", color: CHARCOAL,
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#EBEBEB", minHeight: "100vh", paddingBottom: 48 }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{ background: DARK, padding: "24px 24px 20px", borderBottom: "5px solid " + GOLD }}>
        <div style={{ fontSize: 10, fontWeight: "bold", color: GOLD, letterSpacing: 4, marginBottom: 8 }}>
          THE FINANCIAL FLIPSIDE  ·  SUBSTACK WORK PLAN
        </div>
        <div style={{ fontSize: 26, fontWeight: "bold", color: WHITE, lineHeight: 1.15, marginBottom: 2 }}>
          Staying on Substack.
        </div>
        <div style={{ fontSize: 26, fontWeight: "bold", color: GOLD, lineHeight: 1.15, marginBottom: 12 }}>
          Building it right.
        </div>

        {/* Overall progress */}
        <div style={{ background: "#252525", borderRadius: 8, padding: "12px 16px", marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ color: WHITE, fontWeight: "bold", fontSize: 12 }}>Overall Progress</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 10, color: saveStatus === "saved" ? GREEN : saveStatus === "saving" ? GOLD : RED,
                fontWeight: "bold"
              }}>
                {saveStatus === "saved" ? "✓ Saved" : saveStatus === "saving" ? "Saving..." : "⚠ Save error"}
              </span>
              <span style={{ color: GOLD, fontWeight: "bold", fontSize: 15 }}>{totalDone} / {totalTasks}</span>
            </div>
          </div>
          <div style={{ background: "#3A3A3A", borderRadius: 6, height: 10, overflow: "hidden" }}>
            <div style={{
              background: "linear-gradient(90deg, " + GOLD + ", " + GREEN + ")",
              height: "100%", width: overallPct + "%",
              borderRadius: 6, transition: "width 0.4s ease"
            }} />
          </div>
          <div style={{ color: "#AAAAAA", fontSize: 10, marginTop: 4 }}>{overallPct}% complete · Progress saves automatically</div>
        </div>
      </div>

      {/* ── TABS ───────────────────────────────────────────────────────────── */}
      <div style={{ background: WHITE, display: "flex", borderBottom: "2px solid #EEEEEE" }}>
        {[
          { id: "tasks", label: "📋 Work Plan" },
          { id: "milestones", label: "📈 Milestones" },
          { id: "decisions", label: "✅ Key Decisions" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 20px", border: "none", background: "none",
            cursor: "pointer", fontSize: 13, fontWeight: "bold",
            color: activeTab === tab.id ? GREEN : GRAY,
            borderBottom: activeTab === tab.id ? "3px solid " + GREEN : "3px solid transparent",
            transition: "all 0.15s"
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TASK PLAN TAB ──────────────────────────────────────────────────── */}
      {activeTab === "tasks" && (
        <div>
          {/* Filter bar */}
          <div style={{
            background: WHITE, padding: "10px 24px",
            display: "flex", gap: 6, alignItems: "center",
            borderBottom: "1px solid #DDDDDD", flexWrap: "wrap"
          }}>
            <span style={{ fontSize: 10, fontWeight: "bold", color: GRAY, marginRight: 4, letterSpacing: 2 }}>FILTER:</span>
            {["All", "Remaining", "Done", "Critical", "High", "Medium", "Low"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "4px 12px", borderRadius: 20, border: "none",
                cursor: "pointer", fontSize: 11, fontWeight: "bold",
                background: filter === f ? (PRIORITY_COLOR[f] || DARK) : "#EEEEEE",
                color: filter === f ? WHITE : CHARCOAL,
                transition: "all 0.15s"
              }}>{f}</button>
            ))}
          </div>

          {/* Phase cards */}
          <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {phases.map(phase => {
              const { done, total, pct } = progress(phase);
              const isOpen = expanded[phase.id];
              const items  = getFiltered(phase);
              const htc    = phase.lightText ? WHITE : DARK;
              const hsc    = phase.lightText ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)";

              return (
                <div key={phase.id} style={{ background: WHITE, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <div onClick={() => togglePhase(phase.id)} style={{
                    background: phase.color, padding: "12px 16px",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 12
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{phase.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: "bold", color: hsc, letterSpacing: 2, marginBottom: 1 }}>
                        {phase.label.toUpperCase()}  ·  {phase.timeframe.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: "bold", color: htc, marginBottom: 1 }}>{phase.title}</div>
                      <div style={{ fontSize: 11, color: hsc }}>{phase.summary}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, minWidth: 64 }}>
                      <div style={{ fontSize: 18, fontWeight: "bold", color: htc }}>{done}/{total}</div>
                      <div style={{
                        background: phase.lightText ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)",
                        borderRadius: 4, height: 5, width: 64, marginTop: 3
                      }}>
                        <div style={{
                          background: phase.lightText ? WHITE : DARK,
                          width: pct + "%", height: "100%", borderRadius: 4, transition: "width 0.3s"
                        }} />
                      </div>
                      <div style={{ fontSize: 10, color: hsc, marginTop: 3 }}>{isOpen ? "▲" : "▼"}</div>
                    </div>
                  </div>

                  {isOpen && (
                    <div>
                      {items.length === 0 ? (
                        <div style={{ padding: "16px", color: GRAY, fontSize: 12, fontStyle: "italic" }}>
                          No tasks match this filter in this phase.
                        </div>
                      ) : items.map((t, i) => {
                        const isDone = tasks[t.id];
                        return (
                          <div key={t.id} onClick={() => toggleTask(t.id)} style={{
                            display: "flex", alignItems: "flex-start", gap: 12,
                            padding: "11px 16px",
                            background: isDone ? "#F0FBF0" : (i % 2 === 0 ? WHITE : "#FAFAFA"),
                            borderBottom: "1px solid #F0F0F0", cursor: "pointer"
                          }}>
                            <div style={{
                              width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
                              border: "2px solid " + (isDone ? GREEN : MGRAY),
                              background: isDone ? GREEN : WHITE,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "all 0.15s"
                            }}>
                              {isDone && <span style={{ color: WHITE, fontSize: 12, fontWeight: "bold" }}>✓</span>}
                            </div>
                            <div style={{
                              flex: 1, fontSize: 13, lineHeight: 1.45,
                              color: isDone ? GRAY : CHARCOAL,
                              textDecoration: isDone ? "line-through" : "none"
                            }}>{t.task}</div>
                            <div style={{
                              padding: "2px 9px", borderRadius: 20, flexShrink: 0,
                              fontSize: 10, fontWeight: "bold",
                              color: PRIORITY_COLOR[t.priority], background: PRIORITY_BG[t.priority]
                            }}>{t.priority}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MILESTONES TAB ─────────────────────────────────────────────────── */}
      {activeTab === "milestones" && (
        <div style={{ padding: "20px 24px" }}>

          {/* Paid tier readiness banner */}
          <div style={{
            background: paidReady ? GREEN : DARK,
            borderRadius: 10, padding: "16px 20px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 16
          }}>
            <span style={{ fontSize: 28 }}>{paidReady ? "🎉" : "🔒"}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: WHITE, marginBottom: 2 }}>
                {paidReady
                  ? "Paid Tier Ready — Time to Launch"
                  : "Paid Tier Locked — Keep Building"}
              </div>
              <div style={{ fontSize: 12, color: paidReady ? "rgba(255,255,255,0.8)" : "#AAAAAA" }}>
                {paidReady
                  ? "Both milestones reached. Move to Phase 4 and launch the founding member offer."
                  : "Hit 200 subscribers AND 40% open rate to unlock the paid tier. Both required."}
              </div>
            </div>
          </div>

          {/* Gauge cards */}
          <div style={{ background: WHITE, borderRadius: 10, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 11, fontWeight: "bold", color: GRAY, letterSpacing: 2, marginBottom: 16 }}>
              PAID TIER TRIGGERS
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <Gauge
                value={milestones.subscribers}
                target={200}
                label="Free Subscribers"
                unit=""
                color={GOLD}
                hint="Target: 200+ before paid launch"
              />
              <Gauge
                value={milestones.openRate}
                target={40}
                label="Open Rate"
                unit="%"
                color={GREEN}
                hint="Target: 40%+ before paid launch"
              />
            </div>
          </div>

          {/* Progress metrics */}
          <div style={{ background: WHITE, borderRadius: 10, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 11, fontWeight: "bold", color: GRAY, letterSpacing: 2, marginBottom: 16 }}>
              PUBLICATION PROGRESS
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <Gauge
                value={milestones.issuesPublished}
                target={6}
                label="Issues Published"
                unit=""
                color={CHARCOAL}
                hint="6 issues = consistent cadence proven"
              />
              <Gauge
                value={milestones.paidSubscribers}
                target={100}
                label="Paid Subscribers"
                unit=""
                color="#8B4000"
                hint="100 paid = ~$9,600/yr at $8/mo"
              />
            </div>
          </div>

          {/* Update form */}
          <div style={{ background: WHITE, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background: DARK, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: "bold", color: GOLD, letterSpacing: 2 }}>UPDATE YOUR NUMBERS</span>
              {milestones.lastUpdated && (
                <span style={{ fontSize: 10, color: GRAY }}>Last updated: {milestones.lastUpdated}</span>
              )}
            </div>

            {!editingMilestone ? (
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 12, color: GRAY, margin: "0 0 12px" }}>
                  Log your current Substack numbers to track progress toward the paid tier triggers.
                </p>
                <button onClick={() => { setDraftMilestone({ ...milestones }); setEditingMilestone(true); }} style={{
                  padding: "10px 24px", background: GREEN, color: WHITE,
                  border: "none", borderRadius: 6, fontSize: 13, fontWeight: "bold",
                  cursor: "pointer"
                }}>
                  Update Numbers
                </button>
              </div>
            ) : (
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { key: "subscribers", label: "Free Subscriber Count", placeholder: "e.g. 47" },
                    { key: "openRate", label: "Latest Open Rate (%)", placeholder: "e.g. 38" },
                    { key: "issuesPublished", label: "Issues Published", placeholder: "e.g. 3" },
                    { key: "paidSubscribers", label: "Paid Subscribers (after launch)", placeholder: "e.g. 0" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label style={{ fontSize: 11, fontWeight: "bold", color: CHARCOAL, display: "block", marginBottom: 4 }}>
                        {label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={draftMilestone[key] || ""}
                        placeholder={placeholder}
                        onChange={e => setDraftMilestone(prev => ({ ...prev, [key]: Number(e.target.value) || 0 }))}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button onClick={saveMilestones} style={{
                    padding: "10px 24px", background: GREEN, color: WHITE,
                    border: "none", borderRadius: 6, fontSize: 13, fontWeight: "bold", cursor: "pointer"
                  }}>
                    Save Numbers
                  </button>
                  <button onClick={() => setEditingMilestone(false)} style={{
                    padding: "10px 20px", background: LGRAY, color: CHARCOAL,
                    border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer"
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DECISIONS TAB ──────────────────────────────────────────────────── */}
      {activeTab === "decisions" && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ background: WHITE, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background: DARK, padding: "13px 18px" }}>
              <span style={{ fontSize: 10, fontWeight: "bold", color: GOLD, letterSpacing: 3 }}>
                KEY DECISIONS MADE
              </span>
            </div>
            {decisions.map(([label, value], i) => (
              <div key={i} style={{
                display: "flex", gap: 16, padding: "14px 18px",
                background: i % 2 === 0 ? "#FAF4E3" : WHITE,
                borderBottom: i < decisions.length - 1 ? "1px solid #EEEEEE" : "none"
              }}>
                <div style={{ fontSize: 11, fontWeight: "bold", color: GOLD_DK, minWidth: 150, flexShrink: 0 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: CHARCOAL, lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", fontSize: 10, color: GRAY, padding: "24px 24px 0" }}>
        The Financial Flipside  ·  financialflipside.substack.com  ·  A SEMAJ Media Publication  ·  Heyward Management Group
      </div>
    </div>
  );
}
