import { useState, useEffect } from "react";

const mentees = [
  { id: 1, name: "Emily Davies", project: "Mobile App Dev", lastMeeting: "3 Days Ago", progress: 70, status: "On Track", avatar: "ED", color: "#f472b6" },
  { id: 2, name: "David Chen", project: "UI/UX Design", lastMeeting: "1 Day Ago", progress: 90, status: "Awaiting Review", avatar: "DC", color: "#60a5fa" },
  { id: 3, name: "David Corper", project: "Mobile App Dev", lastMeeting: "3 Days Ago", progress: 70, status: "On Track", avatar: "DC", color: "#34d399" },
  { id: 4, name: "Sarah Johnson", project: "UI/UX Design", lastMeeting: "2 Days Ago", progress: 50, status: "Paused", avatar: "SJ", color: "#fb923c" },
  { id: 5, name: "Marcus Lee", project: "Backend API", lastMeeting: "5 Days Ago", progress: 40, status: "Needs Help", avatar: "ML", color: "#a78bfa" },
  { id: 6, name: "Priya Nair", project: "Data Science", lastMeeting: "Today", progress: 85, status: "On Track", avatar: "PN", color: "#f87171" },
];

const statusColors = {
  "On Track": { bg: "#dcfce7", text: "#16a34a" },
  "Awaiting Review": { bg: "#fef9c3", text: "#b45309" },
  "Paused": { bg: "#fee2e2", text: "#dc2626" },
  "Needs Help": { bg: "#ede9fe", text: "#7c3aed" },
};

const menuData = {
  "Projects": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    items: ["View / Manage Projects", "Track Progress", "View Team Activity"]
  },
  "Task Management": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    items: ["Create Tasks", "Assign Tasks", "Set Dependencies"]
  },
  "Review System": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    items: ["View Submissions", "Actions", "Add Feedback", "Review History"]
  },
  "Guidance & Tracking": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    items: ["Track Mentee Progress", "Identify Delays", "Share Learning Resources"]
  },
  "Communication": {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    items: ["Chat", "Announcements", "Meetings"]
  }
};

const immediateActions = [
  { id: 1, text: "Review David Chen's Final Design", icon: "📋", urgent: true },
  { id: 2, text: "Schedule Next Session with Emily Davis", icon: "📅", urgent: false },
  { id: 3, text: "New Message from Sarah Johnson", icon: "💬", urgent: false },
];

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

function ProgressBar({ value, color = "#4f46e5" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 100, height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, #6366f1, #818cf8)`,
          transition: "width 0.6s ease"
        }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>{value}%</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = statusColors[status] || { bg: "#f1f5f9", text: "#64748b" };
  return (
    <span style={{
      background: s.bg, color: s.text, padding: "4px 12px",
      borderRadius: 99, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap"
    }}>{status}</span>
  );
}

function StatCard({ icon, label, value, badge, badgeColor, avatars }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18, padding: "24px 28px",
      flex: 1, minWidth: 180, boxShadow: "0 2px 16px rgba(99,102,241,0.07)",
      border: "1px solid #f1f5f9", position: "relative", overflow: "hidden"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, background: "#ede9fe", borderRadius: 12,
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
      {avatars && (
        <div style={{ display: "flex", marginTop: 10 }}>
          {avatars.map((a, i) => (
            <div key={i} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: avatars.length - i }}>
              <Avatar initials={a.initials} color={a.color} size={30} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MentorDashboard() {
  const [activeNav, setActiveNav] = useState("View / Manage Projects");
  const [expandedMenu, setExpandedMenu] = useState("Projects");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [completedActions, setCompletedActions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [selectedMenteeForTask, setSelectedMenteeForTask] = useState("");

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("mentorFlow_projects")) || [];
    setProjects(storedProjects.filter(p => p.mentor === "Sarah Connor"));

    const storedTasks = JSON.parse(localStorage.getItem("mentorFlow_tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      const defaultTasks = [
        { id: 1, title: "Create Wireframes", status: "Revision Needed", priority: "High", deadline: "Today, 11:59 PM", assigner: "Sarah Connor", mentee: "Emily Davies" },
      ];
      localStorage.setItem("mentorFlow_tasks", JSON.stringify(defaultTasks));
      setTasks(defaultTasks);
    }
  }, []);

  const handleCreateTask = () => {
    if (!newTaskDesc || !selectedMenteeForTask) {
        alert("Please provide description and select mentee.");
        return;
    }
    const newTask = {
      id: Date.now(),
      title: newTaskDesc,
      status: "To Do",
      priority: newTaskPriority,
      deadline: newTaskDeadline || "No Deadline",
      assigner: "Sarah Connor",
      mentee: selectedMenteeForTask
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("mentorFlow_tasks", JSON.stringify(updatedTasks));
    setNewTaskDesc("");
    setNewTaskDeadline("");
    alert("Task created and assigned to " + selectedMenteeForTask);
  };

  const filteredMentees = mentees.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        boxShadow: "2px 0 20px rgba(99,102,241,0.06)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 28px" }}>
          <div style={{
            width: 40, height: 40, background: "linear-gradient(135deg, #6366f1, #818cf8)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 18
          }}>M</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#1e293b", letterSpacing: -0.5 }}>MentorFlow</span>
        </div>

        {/* Main Menu */}
        <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.2, marginBottom: 8, paddingLeft: 8 }}>MAIN MENU</div>
          {Object.entries(menuData).map(([category, data]) => (
            <div key={category} style={{ marginBottom: 4 }}>
              <button onClick={() => setExpandedMenu(expandedMenu === category ? null : category)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                padding: "11px 14px", border: "none", borderRadius: 12, cursor: "pointer",
                background: expandedMenu === category ? "#f8fafc" : "transparent",
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
                      transition: "all 0.2s", boxShadow: activeNav === item ? "0 4px 14px rgba(99,102,241,0.3)" : "none"
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
          <Avatar initials="SC" color="#6366f1" size={40} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>Sarah Connor</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Senior Mentor</div>
          </div>
          <span style={{
            marginLeft: "auto", background: "#dcfce7", color: "#16a34a",
            padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 700
          }}>Active</span>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 260, flex: 1, padding: "32px 26px 32px 0px", minHeight: "100vh", minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start",marginLeft:"30px", marginBottom: 28 }}>
          <div>
            <h1 style={{
              fontSize: 28, fontWeight: 900, color: "#1e293b",
              margin: 0, letterSpacing: -1
            }}>MENTOR DASHBOARD</h1>
          </div>
          <button onClick={() => setShowNewUserModal(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            color: "#fff", border: "none", borderRadius: 12,
            padding: "12px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(99,102,241,0.35)", transition: "transform 0.15s"
          }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
             onMouseOut={e => e.currentTarget.style.transform = "none"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            NEW USER
          </button>
        </div>

        {activeNav === "Create Tasks" ? (
          <div style={{ marginLeft: "30px", background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(99,102,241,0.07)", border: "1px solid #f1f5f9", marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: "#1e293b" }}>Create New Task</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Task Title / Description</label>
                  <input value={newTaskDesc} onChange={e=>setNewTaskDesc(e.target.value)} placeholder="Task description..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontFamily: "inherit", fontSize: 14, outline: "none", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Assign To Mentee</label>
                  <select value={selectedMenteeForTask} onChange={e=>setSelectedMenteeForTask(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"}>
                    <option value="">-- Choose Mentee --</option>
                    {mentees.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Deadline</label>
                  <input type="date" value={newTaskDeadline} onChange={e=>setNewTaskDeadline(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Priority</label>
                  <select value={newTaskPriority} onChange={e=>setNewTaskPriority(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Attachments</label>
                <div style={{ border: "2px dashed #e2e8f0", borderRadius: 12, padding: 32, textAlign: "center", color: "#94a3b8", cursor: "pointer", transition: "border-color 0.2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#6366f1"} onMouseOut={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: "0 auto 12px", display: "block" }}>
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                  </svg>
                  Drag & drop files here or click to upload
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>(Optional) Link Guideline</label>
                <input placeholder="https://..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>
              <button onClick={handleCreateTask} style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", alignSelf: "flex-start", marginTop: 8, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}>
                Create Task
              </button>
            </div>
            
            <h3 style={{ margin: "32px 0 16px", fontSize: 16, fontWeight: 800, color: "#1e293b" }}>Created Tasks</h3>
            {tasks.length === 0 ? <p style={{color: "#64748b", fontSize: 14}}>No tasks created yet.</p> : (
              <div style={{display: "flex", flexDirection: "column", gap: 12}}>
                {tasks.map(t => (
                  <div key={t.id} style={{display: "flex", justifyContent: "space-between", padding: 16, background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0"}}>
                    <div>
                      <div style={{fontWeight: 700, color: "#1e293b", fontSize: 14}}>{t.title}</div>
                      <div style={{fontSize: 13, color: "#64748b"}}>Assigned to: {t.mentee} • Deadline: {t.deadline}</div>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeNav === "Actions" ? (
          <div style={{ marginLeft: "30px", background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 2px 16px rgba(99,102,241,0.07)", border: "1px solid #f1f5f9", marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: "#1e293b" }}>Review Actions</h2>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 32, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#16a34a"} onMouseOut={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28, boxShadow: "0 4px 14px rgba(22,163,74,0.2)" }}>✓</div>
                <h3 style={{ margin: "0 0 8px", color: "#1e293b", fontSize: 18 }}>Approve</h3>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>Approve the submission and notify the mentee of successful completion.</p>
              </div>
              <div style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 32, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#d97706"} onMouseOut={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28, boxShadow: "0 4px 14px rgba(217,119,6,0.2)", fontWeight: 800 }}>!</div>
                <h3 style={{ margin: "0 0 8px", color: "#1e293b", fontSize: 18 }}>Request Changes</h3>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>Provide specific feedback and return the task to the mentee for revisions.</p>
              </div>
            </div>
          </div>
        ) : activeNav === "View / Manage Projects" || activeNav === "Track Progress" || activeNav === "Track Mentee Progress" || activeNav === "View Submissions" ? (
          <div>
            {/* Stat Cards */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28, flexWrap: "wrap",marginLeft:"30px" }}>
              <StatCard
                icon="👥" label="Active Mentees" value="8" badge="+10%" badgeColor="green"
                avatars={[
                  { initials: "ED", color: "#f472b6" },
                  { initials: "DC", color: "#60a5fa" },
                  { initials: "ML", color: "#a78bfa" },
                ]}
              />
              <StatCard icon="📋" label="Completed Projects" value="22" badge="Completed" badgeColor="blue"
                avatars={[
                  { initials: "22", color: "#34d399" },
                  { initials: "✓", color: "#6366f1" },
                ]}
              />
              <StatCard icon="📅" label="Upcoming Sessions" value="3" badge="Confirmed" badgeColor="green" />
              <StatCard icon="⭐" label="Average Rating" value="4.9" badge="Excellent" badgeColor="green" />
            </div>

            {/* Bottom section */}
            {/* Mentor's Projects */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(99,102,241,0.07)", border: "1px solid #f1f5f9", marginLeft: "30px", marginBottom: 28 }}>
               <h2 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 800, color: "#1e293b" }}>My Assigned Projects (Assigned by Admin)</h2>
               {projects.length === 0 ? (
                 <p style={{color: "#64748b", fontSize: 14}}>No projects assigned yet.</p>
               ) : (
                 <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
                   {projects.map(p => (
                     <div key={p.id} style={{padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, minWidth: 200}}>
                        <div style={{fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6}}>{p.name}</div>
                        <div style={{fontSize: 13, color: "#64748b"}}>Status: <StatusBadge status={p.status} /></div>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "flex-start",marginLeft:"30px" }}>
              {/* Mentees Table */}
              <div style={{
                flex: 1, background: "#fff", borderRadius: 20,
                boxShadow: "0 2px 16px rgba(99,102,241,0.07)",
                border: "1px solid #f1f5f9", overflow: "hidden"
              }}>
                <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Current Mentees Overview</h2>
                  <input
                    placeholder="Search mentees…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0",
                      fontSize: 13, outline: "none", color: "#334155", width: 180,
                      background: "#f8fafc"
                    }}
                  />
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["#", "Mentee Name", "Assigned Project", "Last Meeting", "Progress Bar", "Status"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 12, fontWeight: 700, color: "#94a3b8",
                          letterSpacing: 0.5, borderBottom: "1px solid #f1f5f9"
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMentees.map((m, i) => (
                      <tr key={m.id} style={{
                        borderBottom: "1px solid #f8fafc",
                        transition: "background 0.15s",
                        cursor: "pointer"
                      }}
                        onMouseOver={e => e.currentTarget.style.background = "#fafaff"}
                        onMouseOut={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{i + 1}.</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar initials={m.avatar} color={m.color} size={34} />
                            <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{m.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{m.project}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{m.lastMeeting}</td>
                        <td style={{ padding: "14px 16px" }}><ProgressBar value={m.progress} /></td>
                        <td style={{ padding: "14px 16px" }}><StatusBadge status={m.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Immediate Actions */}
              <div style={{
                width: 260, background: "#fff", borderRadius: 20,
                boxShadow: "0 2px 16px rgba(99,102,241,0.07)",
                border: "1px solid #f1f5f9", padding: "24px 20px", flexShrink: 0
              }}>
                <h2 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 800, color: "#1e293b" }}>Immediate Actions</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {immediateActions.map(action => (
                    <div key={action.id} onClick={() => setCompletedActions(p => p.includes(action.id) ? p.filter(x => x !== action.id) : [...p, action.id])}
                      style={{
                        background: completedActions.includes(action.id) ? "#f0fdf4" : "#f8fafc",
                        border: `1px solid ${completedActions.includes(action.id) ? "#86efac" : "#f1f5f9"}`,
                        borderRadius: 12, padding: "14px 14px", cursor: "pointer",
                        transition: "all 0.2s", position: "relative", overflow: "hidden"
                      }}
                      onMouseOver={e => !completedActions.includes(action.id) && (e.currentTarget.style.borderColor = "#c7d2fe")}
                      onMouseOut={e => !completedActions.includes(action.id) && (e.currentTarget.style.borderColor = "#f1f5f9")}
                    >
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 18 }}>{action.icon}</span>
                        <span style={{
                          fontSize: 13, fontWeight: 600, color: completedActions.includes(action.id) ? "#16a34a" : "#334155",
                          lineHeight: 1.4, textDecoration: completedActions.includes(action.id) ? "line-through" : "none"
                        }}>{action.text}</span>
                      </div>
                      {completedActions.includes(action.id) && (
                        <div style={{ fontSize: 11, color: "#16a34a", marginTop: 6, marginLeft: 28, fontWeight: 600 }}>✓ Done</div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: "14px", background: "linear-gradient(135deg, #ede9fe, #dbeafe)", borderRadius: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>💡 Quick Tip</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                    David Chen's project is at 90% — a review now keeps momentum strong!
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginLeft: "30px", background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 2px 16px rgba(99,102,241,0.07)", border: "1px solid #f1f5f9", color: "#94a3b8", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{activeNav}</h2>
            <p style={{ margin: 0, fontSize: 14 }}>This section is currently under development.</p>
          </div>
        )}
      </main>

      {/* New User Modal */}
      {showNewUserModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)",
          display: "flex", alignItems: "center",width: "90%", justifyContent: "center", zIndex: 999
        }} onClick={e => e.target === e.currentTarget && setShowNewUserModal(false)}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "36px 40px", width: 420,
            boxShadow: "0 24px 80px rgba(99,102,241,0.2)"
          }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#1e293b" }}>Add New User</h2>
            <p style={{ margin: "0 0 28px", color: "#94a3b8", fontSize: 14 }}>Invite a new mentee to MentorFlow</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Full Name", "Email Address", "Project"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>{f}</label>
                  <input placeholder={`Enter ${f.toLowerCase()}`}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12,
                      border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none",
                      color: "#334155", boxSizing: "border-box", fontFamily: "inherit",
                      transition: "border-color 0.2s"
                    }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button onClick={() => setShowNewUserModal(false)} style={{
                flex: 1, padding: "13px", border: "1.5px solid #e2e8f0", background: "#fff",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#64748b", cursor: "pointer"
              }}>Cancel</button>
              <button onClick={() => setShowNewUserModal(false)} style={{
                flex: 1, padding: "13px", border: "none",
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                borderRadius: 12, fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(99,102,241,0.35)"
              }}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}