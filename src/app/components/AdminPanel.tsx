import { useEffect, useState, useCallback } from "react";

interface Submission {
  id: string;
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

const PINK = "#fb6491";
const BG = "#000";
const CARD_BG = "#050505";
const BORDER = "rgba(251,100,145,0.18)";

export function AdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      setSubmissions(data);
    } catch {
      // server not running yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Poll every 15s for new submissions
  useEffect(() => {
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  const markRead = async (id: string) => {
    await fetch(`/api/submissions/${id}/read`, { method: "PATCH" });
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, read: true } : s));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read: true } : null);
  };

  const markAllRead = async () => {
    await fetch("/api/submissions/read-all", { method: "PATCH" });
    setSubmissions(prev => prev.map(s => ({ ...s, read: true })));
    if (selected) setSelected(prev => prev ? { ...prev, read: true } : null);
  };

  const openSubmission = (s: Submission) => {
    setSelected(s);
    if (!s.read) markRead(s.id);
  };

  const unreadCount = submissions.filter(s => !s.read).length;
  const filtered = filter === "unread" ? submissions.filter(s => !s.read) : submissions;

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    marginBottom: "4px",
    display: "block",
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#fff",
    fontWeight: 400,
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", direction: "ltr" }}>

      {/* Top bar */}
      <div style={{
        background: CARD_BG,
        borderBottom: `1px solid ${BORDER}`,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.04em", color: "#fff" }}>
              THREE <span style={{ color: PINK }}>SISTERS</span> KSA
            </span>
            <span style={{ marginLeft: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
              Admin Panel
            </span>
          </div>
          {unreadCount > 0 && (
            <div style={{
              background: PINK,
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "2px",
              letterSpacing: "0.05em",
            }}>
              {unreadCount} NEW
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              background: filter === "all" ? "rgba(251,100,145,0.12)" : "transparent",
              border: `1px solid ${filter === "all" ? BORDER : "rgba(255,255,255,0.08)"}`,
              color: filter === "all" ? PINK : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              padding: "7px 18px",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={{
              background: filter === "unread" ? "rgba(251,100,145,0.12)" : "transparent",
              border: `1px solid ${filter === "unread" ? BORDER : "rgba(255,255,255,0.08)"}`,
              color: filter === "unread" ? PINK : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              padding: "7px 18px",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            Unread ({unreadCount})
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
                cursor: "pointer",
                padding: "7px 18px",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              Mark all read
            </button>
          )}
          <button
            onClick={load}
            style={{
              background: PINK,
              border: "none",
              color: "#000",
              cursor: "pointer",
              padding: "7px 18px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>

        {/* List */}
        <div style={{
          width: selected ? "380px" : "100%",
          minWidth: "320px",
          borderRight: `1px solid ${BORDER}`,
          overflowY: "auto",
          flexShrink: 0,
          transition: "width 0.3s ease",
        }}>
          {loading ? (
            <div style={{ padding: "60px 40px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.9rem" }}>
              Loading submissions...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "80px 40px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px", opacity: 0.3 }}>✦</div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
                {filter === "unread" ? "No unread submissions" : "No submissions yet"}
              </p>
            </div>
          ) : (
            filtered.map(s => (
              <div
                key={s.id}
                onClick={() => openSubmission(s)}
                style={{
                  padding: "20px 28px",
                  borderBottom: `1px solid rgba(255,255,255,0.05)`,
                  cursor: "pointer",
                  background: selected?.id === s.id
                    ? "rgba(251,100,145,0.07)"
                    : !s.read
                    ? "rgba(251,100,145,0.03)"
                    : "transparent",
                  borderLeft: !s.read ? `2px solid ${PINK}` : "2px solid transparent",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => {
                  if (selected?.id !== s.id)
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={e => {
                  if (selected?.id !== s.id)
                    (e.currentTarget as HTMLElement).style.background = !s.read ? "rgba(251,100,145,0.03)" : "transparent";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {!s.read && (
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: PINK, flexShrink: 0 }} />
                    )}
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#fff" }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {new Date(s.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>{s.email}</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                  {s.projectType && (
                    <span style={{
                      background: "rgba(251,100,145,0.1)",
                      border: "1px solid rgba(251,100,145,0.2)",
                      color: PINK,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      padding: "3px 10px",
                      textTransform: "uppercase",
                    }}>
                      {s.projectType}
                    </span>
                  )}
                  {s.budget && (
                    <span style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      padding: "3px 10px",
                    }}>
                      {s.budget}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail pane */}
        {selected && (
          <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px", background: "#020202" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px" }}>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: PINK, textTransform: "uppercase", marginBottom: "8px" }}>
                  Inquiry Details
                </div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#fff", margin: 0 }}>
                  {selected.name}
                </h2>
                {selected.company && (
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginTop: "4px" }}>{selected.company}</p>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >×</button>
            </div>

            {/* Detail grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${BORDER}`,
              marginBottom: "28px",
            }}>
              {[
                ["Email", selected.email],
                ["Submitted", new Date(selected.submittedAt).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })],
                ["Project Type", selected.projectType || "—"],
                ["Budget", selected.budget || "—"],
              ].map(([label, value]) => (
                <div key={label} style={{ background: CARD_BG, padding: "20px 24px" }}>
                  <span style={labelStyle}>{label}</span>
                  <span style={valueStyle}>{value}</span>
                </div>
              ))}
            </div>

            {selected.message && (
              <div style={{
                border: `1px solid ${BORDER}`,
                padding: "24px 28px",
                marginBottom: "32px",
                background: "rgba(251,100,145,0.04)",
              }}>
                <span style={labelStyle}>Message</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                  {selected.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selected.email)}&su=${encodeURIComponent("Let's schedule a meeting — Three Sisters KSA")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: PINK,
                  color: "#000",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "14px 28px",
                }}
              >
                ✉ Reply in Gmail
              </a>
              <a
                href="https://calendar.google.com/calendar/u/0/r/eventedit"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: PINK,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "14px 28px",
                  border: `1px solid ${BORDER}`,
                }}
              >
                📅 Schedule Meet
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
