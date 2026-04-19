import { useState } from "react";
import FlipsideWorkPlan from "./tools/FlipsideWorkPlan";
import SocialBeeGuide from "./guides/SocialBeeGuide";

const DARK   = "#1A1A1A";
const GOLD   = "#C4A84A";
const GREEN  = "#3C870E";
const WHITE  = "#FFFFFF";
const GRAY   = "#888888";

const tools = [
  {
    id: "flipside",
    section: "tools",
    label: "Flipside Work Plan",
    icon: "✍️",
    brand: "Financial Flipside",
    description: "Phase-by-phase Substack launch tracker with milestone dashboard",
    component: FlipsideWorkPlan,
  },
];

const guides = [
  {
    id: "socialbee",
    section: "guides",
    label: "SocialBee Guide",
    icon: "📱",
    brand: "SEMAJ Media",
    description: "Evergreen recycling, Marblism campaign integration, weekly workflow",
    component: SocialBeeGuide,
  },
];

const allItems = [...tools, ...guides];

export default function App() {
  const [activeId, setActiveId] = useState("flipside");
  const [navOpen, setNavOpen] = useState(true);

  const current = allItems.find(i => i.id === activeId);
  const ActiveComponent = current?.component || null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <div style={{
        width: navOpen ? 240 : 56,
        background: DARK,
        borderRight: "1px solid #2A2A2A",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}>

        {/* Logo */}
        <div style={{
          padding: navOpen ? "20px 16px 16px" : "20px 0 16px",
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: navOpen ? "flex-start" : "center",
        }}>
          <div style={{
            width: 30, height: 30,
            background: GOLD,
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: "bold", color: DARK,
            flexShrink: 0,
          }}>S</div>
          {navOpen && (
            <div>
              <div style={{ fontSize: 13, fontWeight: "bold", color: WHITE, lineHeight: 1.2 }}>SEMAJ Media</div>
              <div style={{ fontSize: 10, color: GRAY }}>Tools & Guides</div>
            </div>
          )}
        </div>

        {/* Tools section */}
        <div style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          {navOpen && (
            <div style={{ fontSize: 9, fontWeight: "bold", color: GRAY, letterSpacing: 3, padding: "0 16px 6px", textTransform: "uppercase" }}>
              Tools
            </div>
          )}
          {tools.map(item => {
            const isActive = activeId === item.id;
            return (
              <button key={item.id} onClick={() => setActiveId(item.id)}
                title={!navOpen ? item.label : undefined}
                style={{
                  width: "100%", border: "none", cursor: "pointer",
                  background: isActive ? "#252525" : "transparent",
                  borderLeft: isActive ? `3px solid ${GOLD}` : "3px solid transparent",
                  padding: navOpen ? "10px 16px" : "10px 0",
                  display: "flex", alignItems: "center", gap: 10,
                  justifyContent: navOpen ? "flex-start" : "center",
                  transition: "all 0.15s",
                }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {navOpen && (
                  <div style={{ textAlign: "left", minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", color: isActive ? GOLD : WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 10, color: GRAY }}>{item.brand}</div>
                  </div>
                )}
              </button>
            );
          })}

          {navOpen && (
            <div style={{ fontSize: 9, fontWeight: "bold", color: GRAY, letterSpacing: 3, padding: "12px 16px 6px", textTransform: "uppercase" }}>
              Guides
            </div>
          )}
          {!navOpen && <div style={{ height: 12 }} />}
          {guides.map(item => {
            const isActive = activeId === item.id;
            return (
              <button key={item.id} onClick={() => setActiveId(item.id)}
                title={!navOpen ? item.label : undefined}
                style={{
                  width: "100%", border: "none", cursor: "pointer",
                  background: isActive ? "#252525" : "transparent",
                  borderLeft: isActive ? `3px solid ${GREEN}` : "3px solid transparent",
                  padding: navOpen ? "10px 16px" : "10px 0",
                  display: "flex", alignItems: "center", gap: 10,
                  justifyContent: navOpen ? "flex-start" : "center",
                  transition: "all 0.15s",
                }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {navOpen && (
                  <div style={{ textAlign: "left", minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", color: isActive ? GREEN : WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 10, color: GRAY }}>{item.brand}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Collapse toggle */}
        <button onClick={() => setNavOpen(o => !o)} style={{
          border: "none", background: "#252525", cursor: "pointer",
          padding: "12px", color: GRAY, fontSize: 13,
          borderTop: "1px solid #2A2A2A",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6,
        }}>
          {navOpen ? <>◀ <span style={{ fontSize: 11 }}>Collapse</span></> : "▶"}
        </button>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div style={{ padding: 40, color: GRAY, fontSize: 14 }}>
            Select a tool or guide from the sidebar.
          </div>
        )}
      </div>
    </div>
  );
}
