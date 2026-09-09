import { useState, useEffect } from "react";
import "./styles.css";
import FlipsideWorkPlan from "./tools/FlipsideWorkPlan";

const tools = [
  {
    id: "flipside",
    label: "Flipside Work Plan",
    brand: "Financial Flipside",
    component: FlipsideWorkPlan,
  },
];

const allItems = [...tools];

function Wordmark() {
  return (
    <div>
      <div className="rail-mark">
        SEMAJ<span>.</span>
      </div>
      <div className="rail-sub">Internal tools</div>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("flipside");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const current = allItems.find((i) => i.id === activeId);
  const ActiveComponent = current?.component || null;

  // Close the drawer on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pick = (id) => {
    setActiveId(id);
    setDrawerOpen(false);
  };

  const group = (title, items) => (
    <>
      <div className="rail-group">{title}</div>
      {items.map((item) => (
        <button
          key={item.id}
          className="rail-item"
          aria-current={activeId === item.id}
          onClick={() => pick(item.id)}
        >
          <span className="rail-item-label">{item.label}</span>
          <span className="rail-item-brand">{item.brand}</span>
        </button>
      ))}
    </>
  );

  return (
    <div className="shell">
      {/* Mobile bar */}
      <header className="topbar">
        <Wordmark />
        <button
          className="menu-btn"
          onClick={() => setDrawerOpen((o) => !o)}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? "Close" : "Menu"}
        </button>
      </header>

      {drawerOpen && <div className="scrim" onClick={() => setDrawerOpen(false)} />}

      <nav className={"rail" + (drawerOpen ? " open" : "")} aria-label="Tools">
        <div className="rail-head">
          <Wordmark />
        </div>

        <div className="rail-body">
          {group("Tools", tools)}
        </div>

        <div className="rail-foot">
          Heyward Management Group
          <br />
          Internal use only
        </div>
      </nav>

      <main className="stage">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="sheet-wrap">
            <p>Pick a tool to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
