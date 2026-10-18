import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  Users, 
  Database, 
  Cpu, 
  DollarSign, 
  ArrowRight,
  Code2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Server
} from 'lucide-react';

export const PRDAnalysisView = () => {
  const [activeTab, setActiveTab] = useState('swot'); // 'swot' | 'persona' | 'metrics' | 'architecture'

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 0' }}>
      {/* Top Banner */}
      <div className="glass-panel motionsites-card animate-fade-in" style={{
        padding: '28px 32px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
        border: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <FileText size={12} /> PRD v0.1 Architectural & Strategic Analysis
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Status: Production Spec • Target: Indian CS/Engineering Students
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          NexusOS: Strategic & Technical PRD Deconstruction
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '820px', marginTop: '6px', lineHeight: 1.5 }}>
          A granular breakdown of the product vision, core moat (Adaptive Planning), user persona (Aarav), data models, risks, and monetization gating.
        </p>
      </div>

      {/* Section Filter Pills */}
      <div style={{ marginBottom: '24px' }}>
        <div className="motionsites-pill-container">
          {[
            { id: 'swot', label: 'SWOT Assessment', icon: Layers },
            { id: 'persona', label: 'Primary Persona (Aarav)', icon: Users },
            { id: 'metrics', label: '3-Month MVP Metrics', icon: TrendingUp },
            { id: 'architecture', label: 'System Architecture & Data Flow', icon: Server }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`motionsites-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. SWOT ASSESSMENT */}
      {activeTab === 'swot' && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Strengths */}
            <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-emerald)', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> STRENGTHS (Core Moat)
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                <li><strong style={{ color: 'var(--text-main)' }}>Acute Student Pain Point:</strong> Engineering students juggle 5-6 fragmented tools (Notion, LeetCode, Classroom, Google Calendar, GitHub).</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Day-1 Value via Classroom:</strong> Read-only OAuth pulls assignments instantly, establishing trust without manual input friction.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Adaptive Replanner as Moat:</strong> Missed tasks don't trigger guilt; the AI coach acts as an empathetic academic partner.</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-amber)', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#D97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} /> WEAKNESSES (Scope Challenges)
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                <li><strong style={{ color: 'var(--text-main)' }}>Broad Surface Area:</strong> High risk of feature overload for an MVP (Planner + Classroom + DSA + Weekly reports).</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Retention Cliff:</strong> Habit apps see steep drop-offs after weeks 2-3 if daily check-in friction is higher than 15 seconds.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Free-Tier Token Cost:</strong> LLM replanning token costs can eat margins if not constrained deterministically.</li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-primary)', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} /> OPPORTUNITIES (Growth Vectors)
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                <li><strong style={{ color: 'var(--text-main)' }}>Placement Season Urgency:</strong> SDE internship anxiety in 2nd/3rd year creates high willingness to pay (₹99-199/mo).</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Hinglish / Regional UX:</strong> Empathic, culturally relatable copy (*"Kal OS assignment due hai, isliye DSA shift kiya"*) builds emotional resonance.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>B2B Placement Cell Dashboard:</strong> Sell aggregated batch readiness dashboards to college T&P cells once student density hits 500+.</li>
              </ul>
            </div>

            {/* Threats */}
            <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-rose)', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-rose)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={16} /> THREATS (External Headwinds)
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: 1.5 }}>
                <li><strong style={{ color: 'var(--text-main)' }}>Google OAuth Delays:</strong> Verification and college IT admin firewall restrictions (mitigated via ICS / syllabus fallback).</li>
                <li><strong style={{ color: 'var(--text-main)' }}>No Official LeetCode API:</strong> Requires manual logging and CSV import until unofficial sync is vetted.</li>
                <li><strong style={{ color: 'var(--text-main)' }}>Incumbent AI Moves:</strong> Notion AI or Google Classroom adding native auto-schedulers.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIMARY PERSONA (Aarav) */}
      {activeTab === 'persona' && (
        <div className="animate-fade-in">
          <div className="glass-panel motionsites-card" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Users size={20} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Primary Persona: Aarav Sharma (3rd Year B.Tech CSE, NIT)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#F0F7F1', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '6px' }}>ACADEMIC CONTEXT</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Tier-1/2 Indian engineering student preparing for summer SDE internships. Courses: Operating Systems, DBMS, Design & Analysis of Algorithms.
                </p>
              </div>

              <div style={{ background: '#EAF8EE', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid #BEE8CD' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px' }}>CORE GOALS</div>
                <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5 }}>
                  Solve 250+ LeetCode problems across high-yield patterns, build 1 multimodal AI portfolio project, maintain 8.5+ CGPA.
                </p>
              </div>

              <div style={{ background: '#FEE2E2', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid #FECACA' }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '6px' }}>PAIN TRIGGER</div>
                <p style={{ fontSize: '0.85rem', color: '#991B1B', lineHeight: 1.5 }}>
                  Surprise college assignments clash with personal study schedule. One missed day spirals into abandoning the entire study planner.
                </p>
              </div>

              <div style={{ background: '#FEF3C7', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid #FDE68A' }}>
                <div style={{ fontWeight: 700, color: '#92400E', marginBottom: '6px' }}>NEXUSOS SOLUTION</div>
                <p style={{ fontSize: '0.85rem', color: '#78350F', lineHeight: 1.5 }}>
                  A resilient operating system that dynamically rearranges study tasks to keep placement milestones on track without human planning fatigue.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 3-MONTH MVP TARGET METRICS */}
      {activeTab === 'metrics' && (
        <div className="animate-fade-in">
          <div className="glass-panel motionsites-card" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <TrendingUp size={20} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                PRD Key Success Metrics (3-Month Targets)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {[
                { metric: 'Activation Rate (Goal + 1st check-in)', target: '60% signups', status: 'On-Track' },
                { metric: 'Week-4 Retention', target: '25%', status: 'Targeting' },
                { metric: 'Weekly Active Check-in Rate', target: '3+ days/week for 40% users', status: 'Healthy' },
                { metric: 'Google Classroom Connect Rate', target: '50% of eligible students', status: 'Achieved' },
                { metric: 'Free to Paid Conversion', target: '3 - 5%', status: 'Pricing Tuned' },
                { metric: 'AI Replan Acceptance Rate', target: '50% confirmed proposals', status: 'High Intent' }
              ].map((m, idx) => (
                <div key={idx} style={{
                  padding: '16px 20px',
                  background: '#F8FAF8',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{m.metric}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginTop: '2px', fontWeight: 600 }}>Target: {m.target}</div>
                  </div>
                  <span className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SYSTEM ARCHITECTURE & DATA FLOW */}
      {activeTab === 'architecture' && (
        <div className="animate-fade-in">
          <div className="glass-panel motionsites-card" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Server size={20} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                PRD Compliant Loop: Goals → Milestones → Daily Tasks → Auto-Replan
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                padding: '18px',
                background: '#EAF8EE',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--accent-primary)'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#166534' }}>1. Long-Term Goal Ingestion (PRD 7.1)</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  Student inputs goal (e.g. SDE Internship 250 DSA). AI synthesizes 4-12 week milestone roadmap broken into weekly commitment envelopes (18 hrs/wk).
                </p>
              </div>

              <div style={{
                padding: '18px',
                background: '#DDF5E5',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid #16A34A'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#15803D' }}>2. Daily Task Scheduling & Classroom Harmonization (PRD 7.3)</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  Every morning, system generates 3-5 focus tasks balancing personal DSA roadmap against Google Classroom university assignment deadlines.
                </p>
              </div>

              <div style={{
                padding: '18px',
                background: '#FEF3C7',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid #D97706'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400E' }}>3. Deterministic Adaptive Replanning (PRD 7.2)</h4>
                <p style={{ fontSize: '0.825rem', color: '#78350F', marginTop: '4px', lineHeight: 1.5 }}>
                  When user marks a task missed or partial, system produces 1-3 concrete rescheduling options. Crucially, the system never auto-overwrites without explicit student confirmation.
                </p>
              </div>

              <div style={{
                padding: '18px',
                background: '#EAF8EE',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--accent-emerald)'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#166534' }}>4. Sunday Performance Debrief (PRD 7.5)</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  Weekly 7-day deep-work audit evaluating consistency, planned vs actual hours, top wins, missed topics, and auto-generated sprint blueprint for next week.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
