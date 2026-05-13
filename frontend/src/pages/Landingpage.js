import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,300;9..144,0,400;9..144,1,300;9..144,1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .nav-link {
    font-size: 14px;
    color: #6B6560;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 999px;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-link:hover {
    background: rgba(26,23,20,0.06);
    color: #1A1714;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: #1A1714;
    color: #F7F4EF;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-primary:hover { background: #2E2A26; }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: #fff;
    color: #1A1714;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid #E2DDD8;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-secondary:hover { border-color: #C5BEB8; background: #FDFCFB; }

  .btn-amber {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: #E8B86D;
    color: #1A1714;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-amber:hover { background: #DDA85A; }

  .stat-card {
    background: #fff;
    border: 1px solid #E2DDD8;
    border-radius: 16px;
    padding: 24px;
    transition: border-color 0.15s;
  }
  .stat-card:hover { border-color: #C5BEB8; }

  .feature-card {
    background: #fff;
    border: 1px solid #E2DDD8;
    border-radius: 20px;
    padding: 28px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .feature-card:hover {
    border-color: #C5BEB8;
    box-shadow: 0 4px 24px rgba(26,23,20,0.06);
  }

  .preview-panel {
    background: #1A1714;
    border-radius: 28px;
    padding: 36px;
    position: relative;
    overflow: hidden;
  }
  .preview-panel::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 260px; height: 260px;
    border-radius: 50%;
    border: 1px solid rgba(247,244,239,0.07);
    pointer-events: none;
  }
  .preview-panel::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 1px solid rgba(247,244,239,0.05);
    pointer-events: none;
  }

  .footer-link {
    font-size: 13px;
    color: #9C948C;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .footer-link:hover {
    color: #1A1714;
    border-color: #C5BEB8;
  }

  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .stat-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L10.5 6.5H13.5L11 9.5L12 13.5L8 11.5L4 13.5L5 9.5L2.5 6.5H5.5L8 2Z" fill="#1A1714" />
    </svg>
  );
}

const metrics = [
  { label: 'Average attendance', value: '88%', sub: '+2.4% this week' },
  { label: 'Interventions logged', value: '156', sub: '12 pending review' },
  { label: 'Satisfaction score', value: '94%', sub: 'Based on 340 responses' },
];

const features = [
  {
    icon: '◎',
    title: 'Structured sessions',
    desc: 'Plan and track every mentoring session with built-in agendas, notes, and follow-ups.',
  },
  {
    icon: '◈',
    title: 'Progress tracking',
    desc: 'Visualise growth over time with dashboards that surface what matters most.',
  },
  {
    icon: '◇',
    title: 'Smart matching',
    desc: 'Pair mentors and mentees based on skills, goals, and availability — automatically.',
  },
];

export default function LandingPage() {
  const [activePage, setActivePage] = useState(null);
  const navigate = useNavigate();

  if (activePage === "login") {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{styles}</style>
        <div style={{ background: "#fff", border: "1px solid #E2DDD8", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#B09070", textTransform: "uppercase", marginBottom: 12 }}>Welcome back</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 30, color: "#1A1714", marginBottom: 32 }}>Sign in</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            <input placeholder="Email" style={{ padding: "13px 16px", border: "1px solid #E2DDD8", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1A1714" }} />
            <input type="password" placeholder="Password" style={{ padding: "13px 16px", border: "1px solid #E2DDD8", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1A1714" }} />
          </div>
          <button className="btn-amber" style={{ width: "100%", justifyContent: "center", marginBottom: 24 }}>Sign in</button>
          
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9C948C", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Or login as a demo user:</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <button onClick={() => navigate('/admin-dashboard')} style={{ padding: "8px 14px", border: "1px solid #E2DDD8", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#1A1714", transition: "all 0.15s" }} onMouseOver={e => e.currentTarget.style.borderColor = '#1A1714'} onMouseOut={e => e.currentTarget.style.borderColor = '#E2DDD8'}>Admin</button>
            <button onClick={() => navigate('/mentor-dashboard')} style={{ padding: "8px 14px", border: "1px solid #E2DDD8", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#1A1714", transition: "all 0.15s" }} onMouseOver={e => e.currentTarget.style.borderColor = '#1A1714'} onMouseOut={e => e.currentTarget.style.borderColor = '#E2DDD8'}>Mentor</button>
            <button onClick={() => navigate('/mentee-dashboard')} style={{ padding: "8px 14px", border: "1px solid #E2DDD8", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#1A1714", transition: "all 0.15s" }} onMouseOver={e => e.currentTarget.style.borderColor = '#1A1714'} onMouseOut={e => e.currentTarget.style.borderColor = '#E2DDD8'}>Mentee</button>
          </div>

          <button className="btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setActivePage(null)}>← Back to home</button>
        </div>
      </div>
    );
  }

  if (activePage === "signup") {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{styles}</style>
        <div style={{ background: "#fff", border: "1px solid #E2DDD8", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#B09070", textTransform: "uppercase", marginBottom: 12 }}>Join Mentora</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 30, color: "#1A1714", marginBottom: 32 }}>Create account</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            <input placeholder="Full name" style={{ padding: "13px 16px", border: "1px solid #E2DDD8", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1A1714" }} />
            <input placeholder="Email" style={{ padding: "13px 16px", border: "1px solid #E2DDD8", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1A1714" }} />
            <input type="password" placeholder="Password" style={{ padding: "13px 16px", border: "1px solid #E2DDD8", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1A1714" }} />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}>Create account</button>
          <button className="btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setActivePage(null)}>← Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: '100vh', background: '#F7F4EF', fontFamily: "'DM Sans', sans-serif", color: '#1A1714', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <header style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16, padding: '20px 0', borderBottom: '1px solid #E2DDD8',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: '#E8B86D', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StarIcon />
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#9C948C', letterSpacing: '0.04em' }}>Mentorship platform</p>
              </div>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {['Home', 'Services', 'Sessions', 'Contact'].map((item) => (
                <button key={item} className="nav-link">{item}</button>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-secondary" onClick={() => navigate('/admin-dashboard')} style={{ borderColor: '#E8B86D', background: 'rgba(232, 184, 109, 0.1)' }}>Demo Admin</button>
              <button className="btn-secondary" onClick={() => navigate('/login')}>Sign in</button>
              <button className="btn-primary" onClick={() => setActivePage("signup")}>Get Started <ArrowRight /></button>
            </div>
          </header>

          {/* Hero */}
          <main style={{ padding: '72px 0 80px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'center' }} className="hero-grid">

            {/* Left copy */}
            <section>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#B09070', textTransform: 'uppercase', marginBottom: 20 }}>
                Empower your mentorship journey
              </p>

              <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 54, lineHeight: 1.08, color: '#1A1714', marginBottom: 24, maxWidth: 520 }}>
                Your path for excellence starts{' '}
                <em style={{ fontStyle: 'italic', color: '#E8B86D' }}>here.</em>
              </h1>

              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B6560', maxWidth: 480, marginBottom: 36 }}>
                Build trust, guide talent, and grow your mentor network with a modern dashboard designed for mentors and mentees.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
                <button className="btn-amber" onClick={() => navigate('/login')}>Sign in</button>
                <button className="btn-secondary" onClick={() => setActivePage("signup")}>Create account <ArrowRight /></button>
              </div>

              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="stat-grid">
                <div className="stat-card">
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#B09070', textTransform: 'uppercase', marginBottom: 14 }}>Active mentors</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 300, color: '#1A1714', lineHeight: 1 }}>124</p>
                </div>
                <div className="stat-card">
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#B09070', textTransform: 'uppercase', marginBottom: 14 }}>Projects launched</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 300, color: '#1A1714', lineHeight: 1 }}>84</p>
                </div>
              </div>
            </section>

            {/* Right — Dashboard preview */}
            <section className="preview-panel">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  background: 'rgba(247,244,239,0.06)', border: '1px solid rgba(247,244,239,0.1)',
                  borderRadius: 16, padding: '20px 24px', marginBottom: 20,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#E8B86D', textTransform: 'uppercase', marginBottom: 8 }}>
                    Dashboard preview
                  </p>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 22, color: '#F7F4EF', lineHeight: 1.3 }}>
                    At-risk student spotlight
                  </h2>
                </div>

                {metrics.map((m) => (
                  <div key={m.label} style={{
                    background: 'rgba(247,244,239,0.04)', border: '1px solid rgba(247,244,239,0.08)',
                    borderRadius: 14, padding: '16px 20px', marginBottom: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <p style={{ fontSize: 12, color: 'rgba(247,244,239,0.45)', marginBottom: 4 }}>{m.label}</p>
                      <p style={{ fontSize: 11, color: 'rgba(232,184,109,0.7)' }}>{m.sub}</p>
                    </div>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 300, color: '#F7F4EF' }}>{m.value}</p>
                  </div>
                ))}

                <button
                  className="btn-amber"
                  onClick={() => navigate('/login')}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 20, borderRadius: 12 }}
                >
                  View full dashboard <ArrowRight />
                </button>
              </div>
            </section>
          </main>

          {/* Feature strip */}
          <section style={{ borderTop: '1px solid #E2DDD8', paddingTop: 64, paddingBottom: 80 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#B09070', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
              Why us?
            </p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 36, color: '#1A1714', textAlign: 'center', marginBottom: 48, lineHeight: 1.2 }}>
              Everything you need to <em style={{ fontStyle: 'italic', color: '#E8B86D' }}>grow.</em>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="features-grid">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div style={{
                    width: 40, height: 40, background: '#F7F4EF', border: '1px solid #E2DDD8',
                    borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, marginBottom: 20, color: '#B09070',
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: '#1A1714', marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: '#7A736C', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer style={{
            borderTop: '1px solid #E2DDD8', padding: '24px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, background: '#E8B86D', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <StarIcon />
              </div>
              <span style={{ fontSize: 13, color: '#9C948C' }}>© 2025 Mentora. All rights reserved.</span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href="#" className="footer-link">{item}</a>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}