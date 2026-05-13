import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Emily Davies", role: "Mentee", status: "Active", joined: "Oct 12, 2025", avatar: "ED", color: "#f472b6" },
  { id: 2, name: "Sarah Connor", role: "Mentor", status: "Active", joined: "Sep 01, 2025", avatar: "SC", color: "#6366f1" },
  { id: 3, name: "David Chen", role: "Mentee", status: "Inactive", joined: "Nov 05, 2025", avatar: "DC", color: "#60a5fa" },
  { id: 4, name: "Marcus Lee", role: "Mentor", status: "Active", joined: "Aug 20, 2025", avatar: "ML", color: "#a78bfa" },
];

const mockProjects = [
  { id: 1, name: "Mobile App Dev", status: "Active", mentor: "Sarah Connor", progress: 70 },
  { id: 2, name: "UI/UX Design", status: "On Hold", mentor: "Unassigned", progress: 20 },
  { id: 3, name: "Backend API", status: "Completed", mentor: "Marcus Lee", progress: 100 },
];

const recentActivities = [
  { id: 1, text: "Sarah Connor approved a milestone for Mobile App Dev.", time: "2 hours ago", icon: "✓", color: "#16a34a", bg: "#dcfce7" },
  { id: 2, text: "New mentee David Chen registered.", time: "5 hours ago", icon: "+", color: "#2563eb", bg: "#dbeafe" },
  { id: 3, text: "UI/UX Design project placed on hold.", time: "1 day ago", icon: "!", color: "#d97706", bg: "#fef3c7" },
];

const menuData = {
  "User Management": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    items: ["Manage Users", "Assign Mentors"]
  },
  "Project Oversight": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
    items: ["All Projects"]
  },
  "Insights & Config": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    items: ["Analytics", "Settings"]
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
          background: value === 100 ? "#10b981" : "linear-gradient(90deg, #3b82f6, #60a5fa)",
          transition: "width 0.6s ease"
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>{value}%</span>
    </div>
  );
}

function StatCard({ icon, label, value, badge, badgeColor }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18, padding: "24px 28px",
      flex: 1, minWidth: 180, boxShadow: "0 2px 16px rgba(59,130,246,0.06)",
      border: "1px solid #f1f5f9", position: "relative", overflow: "hidden"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, background: "#eff6ff", borderRadius: 12, color: "#3b82f6",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
        }}>{icon}</div>
        <span style={{
          background: badgeColor === "green" ? "#dcfce7" : badgeColor === "blue" ? "#dbeafe" : "#f0fdf4",
          color: badgeColor === "green" ? "#16a34a" : badgeColor === "blue" ? "#2563eb" : "#15803d",
          padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600
        }}>{badge}</span>
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", lineHeight: 1.2, marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);

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
        boxShadow: "2px 0 20px rgba(59,130,246,0.05)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 28px" }}>
          <div style={{
            width: 40, height: 40, background: "linear-gradient(135deg, #1e293b, #334155)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 18
          }}>A</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#1e293b", letterSpacing: -0.5 }}>AdminConsole</span>
        </div>

        {/* Main Menu */}
        <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.2, marginBottom: 8, paddingLeft: 8 }}>ADMIN PANEL</div>
          
          {/* Default Dashboard Button */}
          <div style={{ marginBottom: 4 }}>
            <button onClick={() => { setActiveNav("Dashboard"); setExpandedMenu(null); }} style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%",
              padding: "11px 14px", border: "none", borderRadius: 12, cursor: "pointer",
              background: activeNav === "Dashboard" ? "linear-gradient(135deg, #3b82f6, #60a5fa)" : "transparent",
              color: activeNav === "Dashboard" ? "#fff" : "#64748b",
              fontWeight: activeNav === "Dashboard" ? 700 : 700, fontSize: 14,
              transition: "all 0.2s",
              boxShadow: activeNav === "Dashboard" ? "0 4px 14px rgba(59,130,246,0.25)" : "none"
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
                background: expandedMenu === category ? "#f8fafc" : "transparent",
                color: "#1e293b", fontWeight: 700, fontSize: 14,
                transition: "all 0.2s"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: expandedMenu === category ? "#3b82f6" : "#64748b" }}>
                  {data.icon}
                  <span style={{ color: expandedMenu === category ? "#3b82f6" : "#475569" }}>{category}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     style={{ color: expandedMenu === category ? "#3b82f6" : "#94a3b8", transform: expandedMenu === category ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              
              {expandedMenu === category && (
                <div style={{ padding: "4px 0 4px 32px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {data.items.map(item => (
                    <button key={item} onClick={() => setActiveNav(item)} style={{
                      textAlign: "left", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer",
                      fontSize: 13, fontWeight: activeNav === item ? 700 : 500,
                      background: activeNav === item ? "linear-gradient(135deg, #3b82f6, #60a5fa)" : "transparent",
                      color: activeNav === item ? "#fff" : "#64748b",
                      transition: "all 0.2s", boxShadow: activeNav === item ? "0 4px 14px rgba(59,130,246,0.25)" : "none"
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
          <Avatar initials="AD" color="#1e293b" size={40} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>System Admin</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Master Access</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 260, flex: 1, padding: "32px 30px 32px 30px", minHeight: "100vh", minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{
              fontSize: 28, fontWeight: 900, color: "#1e293b",
              margin: 0, letterSpacing: -1
            }}>SYSTEM OVERVIEW</h1>
            <p style={{ color: "#64748b", marginTop: 6, fontSize: 15 }}>Manage platform operations, users, and analytics.</p>
          </div>
          <button onClick={() => setShowCreateUser(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            color: "#fff", border: "none", borderRadius: 12,
            padding: "12px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(59,130,246,0.3)", transition: "transform 0.15s"
          }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
             onMouseOut={e => e.currentTarget.style.transform = "none"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            ADD NEW USER
          </button>
        </div>

        {activeNav === "Dashboard" ? (
          <div>
            {/* Stat Cards */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
              <StatCard icon="👥" label="Total Users" value="128" badge="+12 this month" badgeColor="blue" />
              <StatCard icon="🎓" label="Active Mentors" value="45" badge="Stable" badgeColor="green" />
              <StatCard icon="📋" label="Active Projects" value="32" badge="+4 new" badgeColor="blue" />
              <StatCard icon="📈" label="Avg Completion Rate" value="78%" badge="+5%" badgeColor="green" />
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              {/* Active Projects Table */}
              <div style={{
                flex: 2, background: "#fff", borderRadius: 20,
                boxShadow: "0 2px 16px rgba(59,130,246,0.05)",
                border: "1px solid #f1f5f9", overflow: "hidden"
              }}>
                <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Active Projects Overview</h2>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Project Name", "Mentor", "Status", "Progress"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 12, fontWeight: 700, color: "#94a3b8",
                          letterSpacing: 0.5, borderBottom: "1px solid #f1f5f9"
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockProjects.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{p.name}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{p.mentor}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            background: p.status === "Active" ? "#dcfce7" : p.status === "On Hold" ? "#fef3c7" : "#dbeafe",
                            color: p.status === "Active" ? "#16a34a" : p.status === "On Hold" ? "#d97706" : "#2563eb",
                            padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600
                          }}>{p.status}</span>
                        </td>
                        <td style={{ padding: "14px 16px" }}><ProgressBar value={p.progress} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Activity */}
              <div style={{
                flex: 1, background: "#fff", borderRadius: 20,
                boxShadow: "0 2px 16px rgba(59,130,246,0.05)",
                border: "1px solid #f1f5f9", padding: "24px 28px"
              }}>
                <h2 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Recent Activity Feed</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {recentActivities.map(act => (
                    <div key={act.id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", background: act.bg, color: act.color,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, flexShrink: 0
                      }}>{act.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, color: "#334155", fontWeight: 500, lineHeight: 1.4 }}>{act.text}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === "Manage Users" ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(59,130,246,0.05)", border: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1e293b" }}>User Management</h2>
              <input
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: "10px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0",
                  fontSize: 14, outline: "none", width: 240, fontFamily: "inherit"
                }}
              />
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["User Name", "Role", "Joined Date", "Status", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: "left",
                      fontSize: 12, fontWeight: 700, color: "#94a3b8",
                      letterSpacing: 0.5, borderBottom: "1px solid #f1f5f9"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar initials={u.avatar} color={u.color} size={36} />
                        <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b", fontWeight: 600 }}>{u.role}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#94a3b8" }}>{u.joined}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        background: u.status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: u.status === "Active" ? "#16a34a" : "#dc2626",
                        padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600
                      }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button style={{ background: "transparent", border: "1px solid #e2e8f0", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#64748b", transition: "all 0.2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#94a3b8"} onMouseOut={e=>e.currentTarget.style.borderColor="#e2e8f0"}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeNav === "Assign Mentors" ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(59,130,246,0.05)", border: "1px solid #f1f5f9" }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: "#1e293b" }}>Mentor Assignment</h2>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>1. Select Project</h3>
                <select style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", fontFamily: "inherit" }}>
                  <option>UI/UX Design (Unassigned)</option>
                  <option>Data Science Fundamentals</option>
                </select>
              </div>
              <div style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>2. Select Mentor</h3>
                <select style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", fontFamily: "inherit" }}>
                  <option>Sarah Connor (Expert: UI/UX)</option>
                  <option>Marcus Lee (Expert: Backend)</option>
                </select>
              </div>
            </div>
            <button style={{ marginTop: 24, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(59,130,246,0.3)" }}>Confirm Assignment</button>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 2px 16px rgba(59,130,246,0.05)", border: "1px solid #f1f5f9", color: "#94a3b8", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{activeNav}</h2>
            <p style={{ margin: 0, fontSize: 14 }}>The {activeNav} module is currently under development according to the flow plan.</p>
          </div>
        )}
      </main>

      {/* New User Modal */}
      {showCreateUser && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
        }} onClick={e => e.target === e.currentTarget && setShowCreateUser(false)}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "36px 40px", width: 440,
            boxShadow: "0 24px 80px rgba(59,130,246,0.15)"
          }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#1e293b" }}>Create New User</h2>
            <p style={{ margin: "0 0 28px", color: "#94a3b8", fontSize: 14 }}>Add a mentor or mentee to the system.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Full Name</label>
                <input placeholder="e.g., John Doe" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Email Address</label>
                <input placeholder="name@company.com" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Role Assignment</label>
                <select style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "#fff" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"}>
                  <option>Mentee</option>
                  <option>Mentor</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button onClick={() => setShowCreateUser(false)} style={{
                flex: 1, padding: "14px", border: "1.5px solid #e2e8f0", background: "#fff",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#64748b", cursor: "pointer"
              }}>Cancel</button>
              <button onClick={() => setShowCreateUser(false)} style={{
                flex: 1, padding: "14px", border: "none",
                background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(59,130,246,0.3)"
              }}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
