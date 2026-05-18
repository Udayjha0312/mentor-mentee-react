import { useState, useEffect } from "react";

const assignedProjects = [
  { id: 1, name: "Mobile App Development", mentor: "Sarah Connor", progress: 75, nextDeadline: "Tomorrow, 5:00 PM", avatar: "SC", color: "#6366f1" },
  { id: 2, name: "UI/UX Design System", mentor: "Marcus Lee", progress: 40, nextDeadline: "Oct 15, 2025", avatar: "ML", color: "#a78bfa" }
];

const tasks = [
  { id: 1, title: "Create Wireframes", status: "Revision Needed", priority: "High", deadline: "Today, 11:59 PM", assigner: "Sarah Connor" },
  { id: 2, title: "User Flow Diagram", status: "In Progress", priority: "Medium", deadline: "Oct 10, 2025", assigner: "Sarah Connor" },
  { id: 3, title: "Design System Tokens", status: "Under Review", priority: "High", deadline: "Oct 12, 2025", assigner: "Marcus Lee" },
  { id: 4, title: "Competitor Analysis", status: "Completed", priority: "Low", deadline: "Oct 01, 2025", assigner: "Marcus Lee" },
  { id: 5, title: "Set up React Native env", status: "To Do", priority: "Medium", deadline: "Oct 15, 2025", assigner: "Sarah Connor" }
];

const recentFeedback = [
  { id: 1, task: "Create Wireframes", mentor: "Sarah Connor", text: "Good start, but we need to rethink the navigation bar. Please revise the layout.", date: "2 hours ago" },
  { id: 2, task: "Competitor Analysis", mentor: "Marcus Lee", text: "Excellent analysis. Great insights on user onboarding flows.", date: "2 days ago" }
];

const notificationsList = [
  { id: 1, text: "Sarah requested changes on 'Create Wireframes'", time: "2 hours ago", unread: true },
  { id: 2, text: "Upcoming deadline: Create Wireframes in 12 hours", time: "5 hours ago", unread: true },
  { id: 3, text: "Marcus Lee reviewed your submission for 'Design System Tokens'", time: "1 day ago", unread: false },
];

const menuData = {
  "My Workspace": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
    items: ["Assigned Projects", "Task Management"]
  },
  "Growth & Comms": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    items: ["Progress & Feedback", "Messages & Meetings", "Notifications"]
  }
};

function Avatar({ initials, color, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", color: "#fff", fontWeight: 700,
      fontSize: size * 0.35, flexShrink: 0, fontFamily: "'DM Sans', sans-serif",
      boxShadow: `0 2px 8px ${color}55`
    }}>
      {initials}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 100, height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%", borderRadius: 99,
          background: value === 100 ? "#10b981" : "linear-gradient(90deg, #6366f1, #818cf8)",
          transition: "width 0.6s ease"
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>{value}%</span>
    </div>
  );
}

export default function MenteeDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [menteeTasks, setMenteeTasks] = useState(tasks);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("mentorFlow_tasks"));
    if (storedTasks) {
      setMenteeTasks(storedTasks.filter(t => t.mentee === "Emily Davies"));
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Revision Needed": return { bg: "#fef2f2", text: "#ef4444" };
      case "To Do": return { bg: "#f1f5f9", text: "#64748b" };
      case "In Progress": return { bg: "#eff6ff", text: "#3b82f6" };
      case "Under Review": return { bg: "#fef3c7", text: "#d97706" };
      case "Completed": return { bg: "#dcfce7", text: "#16a34a" };
      default: return { bg: "#f1f5f9", text: "#64748b" };
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowSubmitModal(true);
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      overflowX: 'hidden', width: '100%'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, background: "#fff", borderRight: "1px solid #f1f5f9",
        display: "flex", flexDirection: "column", padding: "28px 0", position: "fixed",
        top: 0, left: 0, bottom: 0, zIndex: 100,
        boxShadow: "2px 0 20px rgba(99,102,241,0.05)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 28px" }}>
          <div style={{
            width: 40, height: 40, background: "linear-gradient(135deg, #6366f1, #818cf8)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 18
          }}>M</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#1e293b", letterSpacing: -0.5 }}>MenteeHub</span>
        </div>

        {/* Main Menu */}
        <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.2, marginBottom: 8, paddingLeft: 8 }}>MENU</div>
          
          {/* Default Dashboard Button */}
          <div style={{ marginBottom: 4 }}>
            <button onClick={() => { setActiveNav("Dashboard"); setExpandedMenu(null); }} style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%",
              padding: "11px 14px", border: "none", borderRadius: 12, cursor: "pointer",
              background: activeNav === "Dashboard" ? "linear-gradient(135deg, #6366f1, #818cf8)" : "transparent",
              color: activeNav === "Dashboard" ? "#fff" : "#64748b",
              fontWeight: activeNav === "Dashboard" ? 700 : 600, fontSize: 14,
              transition: "all 0.2s",
              boxShadow: activeNav === "Dashboard" ? "0 4px 14px rgba(99,102,241,0.25)" : "none"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </button>
          </div>

          {Object.entries(menuData).map(([category, data]) => (
            <div key={category} style={{ marginBottom: 4 }}>
              <button onClick={() => setExpandedMenu(expandedMenu === category ? null : category)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                padding: "11px 14px", border: "none", borderRadius: 12, cursor: "pointer",
                background: expandedMenu === category ? "#eef2ff" : "transparent",
                color: "#1e293b", fontWeight: 700, fontSize: 14,
                transition: "all 0.2s"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: expandedMenu === category ? "#6366f1" : "#64748b" }}>
                  {data.icon}
                  <span style={{ color: expandedMenu === category ? "#6366f1" : "#475569" }}>{category}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     style={{ color: expandedMenu === category ? "#6366f1" : "#94a3b8", transform: expandedMenu === category ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              
              {expandedMenu === category && (
                <div style={{ padding: "4px 0 4px 32px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {data.items.map(item => (
                    <button key={item} onClick={() => setActiveNav(item)} style={{
                      textAlign: "left", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer",
                      fontSize: 13, fontWeight: activeNav === item ? 700 : 500,
                      background: activeNav === item ? "linear-gradient(135deg, #6366f1, #818cf8)" : "transparent",
                      color: activeNav === item ? "#fff" : "#64748b",
                      transition: "all 0.2s", boxShadow: activeNav === item ? "0 4px 14px rgba(99,102,241,0.25)" : "none"
                    }}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User */}
        <div style={{
          margin: "0 16px", padding: "14px", borderTop: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <Avatar initials="ED" color="#f472b6" size={40} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>Emily Davies</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Mentee</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 260, flex: 1, padding: "32px 30px", minHeight: "100vh", minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{
              fontSize: 28, fontWeight: 900, color: "#1e293b",
              margin: 0, letterSpacing: -1, textTransform: "uppercase"
            }}>{activeNav === "Dashboard" ? "My Dashboard" : activeNav}</h1>
            <p style={{ color: "#64748b", marginTop: 6, fontSize: 15 }}>Track your progress, manage tasks, and connect with your mentors.</p>
          </div>
          
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setActiveNav("Messages & Meetings")} style={{
              display: "flex", alignItems: "center", gap: 8, background: "#fff",
              color: "#1e293b", border: "1.5px solid #e2e8f0", borderRadius: 12,
              padding: "10px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
            }} onMouseOver={e => e.currentTarget.style.borderColor = "#cbd5e1"} onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Message Mentor
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              color: "#fff", border: "none", borderRadius: 12,
              padding: "10px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer",
              boxShadow: "0 4px 16px rgba(99,102,241,0.3)"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Request Meeting
            </button>
          </div>
        </div>

        {activeNav === "Dashboard" ? (
          <div>
            {/* Quick Stats */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200, background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Overall Progress</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>58%</span>
                  <span style={{ fontSize: 14, color: "#10b981", fontWeight: 600 }}>+12%</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 200, background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Tasks Completed</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>14</span>
                  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>/ 24</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 200, background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Avg Feedback Score</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>4.8</span>
                  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>/ 5.0</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
              
              <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Assigned Projects */}
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1e293b" }}>Assigned Projects</h2>
                    <button onClick={() => setActiveNav("Assigned Projects")} style={{ background: "transparent", border: "none", color: "#6366f1", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View All</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {assignedProjects.map(p => (
                      <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 20, padding: 16, border: "1px solid #f1f5f9", borderRadius: 16, background: "#f8fafc" }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{p.name}</h3>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
                            <Avatar initials={p.avatar} color={p.color} size={24} />
                            Mentor: <strong style={{ color: "#334155" }}>{p.mentor}</strong>
                          </div>
                        </div>
                        <div style={{ width: 140 }}>
                          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 600 }}>Progress</div>
                          <ProgressBar value={p.progress} />
                        </div>
                        <div style={{ width: 140, textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4, fontWeight: 600 }}>Next Deadline</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: p.nextDeadline.includes("Tomorrow") ? "#ef4444" : "#1e293b" }}>{p.nextDeadline}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task List */}
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1e293b" }}>My Tasks</h2>
                    <button onClick={() => setActiveNav("Task Management")} style={{ background: "transparent", border: "none", color: "#6366f1", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Manage Tasks</button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                        <th style={{ padding: "0 0 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Task Name</th>
                        <th style={{ padding: "0 0 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Status</th>
                        <th style={{ padding: "0 0 12px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Deadline</th>
                        <th style={{ padding: "0 0 12px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menteeTasks.map(t => {
                        const sColors = getStatusColor(t.status);
                        return (
                          <tr key={t.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                            <td style={{ padding: "16px 0", fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{t.title}</td>
                            <td style={{ padding: "16px 0" }}>
                              <span style={{ background: sColors.bg, color: sColors.text, padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{t.status}</span>
                            </td>
                            <td style={{ padding: "16px 0", fontSize: 13, color: t.status === "Revision Needed" ? "#ef4444" : "#64748b", fontWeight: 600 }}>{t.deadline}</td>
                            <td style={{ padding: "16px 0", textAlign: "right" }}>
                              {t.status !== "Completed" && t.status !== "Under Review" && (
                                <button onClick={() => handleTaskClick(t)} style={{ background: "#fff", border: "1.5px solid #e2e8f0", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#1e293b", cursor: "pointer", transition: "all 0.15s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#1e293b"} onMouseOut={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
                                  {t.status === "Revision Needed" ? "Resubmit" : "Submit"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Recent Feedback */}
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" }}>
                  <h2 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Recent Feedback</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {recentFeedback.map(fb => (
                      <div key={fb.id} style={{ padding: 16, background: "#f8fafc", borderRadius: 16, border: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#6366f1" }}>{fb.task}</span>
                          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{fb.date}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.5, marginBottom: 10 }}>"{fb.text}"</p>
                        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>- {fb.mentor}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Notifications</h2>
                    <span style={{ background: "#fef2f2", color: "#ef4444", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 800 }}>2 New</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {notificationsList.map(n => (
                      <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f8fafc" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.unread ? "#6366f1" : "#cbd5e1", marginTop: 6, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13, color: n.unread ? "#1e293b" : "#64748b", fontWeight: n.unread ? 600 : 500, lineHeight: 1.4, marginBottom: 4 }}>{n.text}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : activeNav === "Task Management" ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9" }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: "#1e293b" }}>All Tasks</h2>
            {["Revision Needed", "To Do", "In Progress", "Under Review", "Completed"].map(statusGroup => {
              const groupTasks = menteeTasks.filter(t => t.status === statusGroup);
              if (groupTasks.length === 0) return null;
              return (
                <div key={statusGroup} style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#475569", marginBottom: 16, borderBottom: "2px solid #f1f5f9", paddingBottom: 8 }}>{statusGroup}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {groupTasks.map(t => (
                      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 12 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>{t.title}</div>
                          <div style={{ fontSize: 13, color: "#64748b" }}>Deadline: <strong style={{ color: t.status === "Revision Needed" ? "#ef4444" : "inherit" }}>{t.deadline}</strong> • Assigner: {t.assigner}</div>
                        </div>
                        {t.status !== "Completed" && t.status !== "Under Review" && (
                          <button onClick={() => handleTaskClick(t)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                            {t.status === "Revision Needed" ? "Resubmit Task" : "Submit Task"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9", color: "#94a3b8", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{activeNav}</h2>
            <p style={{ margin: 0, fontSize: 14 }}>The {activeNav} module is currently under development according to the Mentee Flow Plan.</p>
          </div>
        )}
      </main>

      {/* Task Submission Modal */}
      {showSubmitModal && selectedTask && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
        }} onClick={e => e.target === e.currentTarget && setShowSubmitModal(false)}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "36px 40px", width: 500,
            boxShadow: "0 24px 80px rgba(0,0,0,0.15)"
          }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#1e293b" }}>
              {selectedTask.status === "Revision Needed" ? "Resubmit Task" : "Submit Task"}
            </h2>
            <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14, fontWeight: 500 }}>
              {selectedTask.title} • Deadline: <span style={{ color: "#ef4444" }}>{selectedTask.deadline}</span>
            </p>
            
            {selectedTask.status === "Revision Needed" && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: 16, borderRadius: 12, marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", marginBottom: 6, textTransform: "uppercase" }}>Mentor Feedback:</div>
                <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>"Good start, but we need to rethink the navigation bar. Please revise the layout before final submission."</div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 8 }}>Submission Notes</label>
                <textarea placeholder="Describe what you've done..." style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", minHeight: 100 }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 8 }}>Upload Files</label>
                <div style={{ border: "2px dashed #cbd5e1", borderRadius: 12, padding: "24px", textAlign: "center", background: "#f8fafc", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "#6366f1"} onMouseOut={e => e.currentTarget.style.borderColor = "#cbd5e1"}>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Drag & Drop files here, or click to browse</div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 8 }}>Project URL / Link (Optional)</label>
                <input placeholder="https://github.com/..." style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button onClick={() => setShowSubmitModal(false)} style={{
                flex: 1, padding: "14px", border: "1.5px solid #e2e8f0", background: "#fff",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#64748b", cursor: "pointer"
              }}>Cancel</button>
              <button onClick={() => {
                const storedTasks = JSON.parse(localStorage.getItem("mentorFlow_tasks")) || [];
                const updatedTasks = storedTasks.map(t => t.id === selectedTask.id ? { ...t, status: "Under Review" } : t);
                localStorage.setItem("mentorFlow_tasks", JSON.stringify(updatedTasks));
                setMenteeTasks(updatedTasks.filter(t => t.mentee === "Emily Davies"));
                setShowSubmitModal(false);
                alert("Task submitted for review!");
              }} style={{
                flex: 2, padding: "14px", border: "none",
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(99,102,241,0.3)"
              }}>{selectedTask.status === "Revision Needed" ? "Resubmit for Review" : "Submit for Review"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
