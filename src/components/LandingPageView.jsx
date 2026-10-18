import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  BarChart3, 
  RotateCcw, 
  ShieldCheck, 
  Crown, 
  Flame, 
  Clock, 
  Layers, 
  Zap,
  ChevronDown,
  Check,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const LandingPageView = () => {
  const { setActiveTab, setActiveModal, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const [activePreviewTab, setActivePreviewTab] = useState('daily');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does the AI Adaptive Replanner prevent burnout?",
      a: "Unlike static to-do lists that pile up overdue tasks and trigger guilt, NexusOS detects academic deadline spikes (like surprise OS assignments) and automatically presents 3 balanced solutions: shift to weekend buffer, compress to 25 mins, or postpone to evening."
    },
    {
      q: "Does Google Classroom sync require administrator approval?",
      a: "NexusOS uses read-only Google OAuth 2.0 coursework scopes. In case university IT policies block 3rd-party OAuth, we provide an instant ICS calendar and syllabus schedule manual fallback."
    },
    {
      q: "How does the DSA Tracker connect with placement goals?",
      a: "Every solved problem updates topic saturation across 6 essential interview patterns (Trees, Graphs, DP, etc.), logs time spent, and feeds into spaced repetition review queues."
    },
    {
      q: "What is included in the Free vs Pro plan?",
      a: "The Free plan supports 2 active goal roadmaps, 5 AI replans/month, and basic tracking. Pro (₹149/mo) unlocks unlimited roadmaps, unlimited AI replanning, multi-account Classroom sync, and weekly AI diagnostics."
    }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 0 60px' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '60px 24px 80px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Glow blob */}
        <div className="hero-glow-blob" style={{
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '280px',
          background: 'radial-gradient(ellipse at center, rgba(34, 160, 107, 0.18), transparent 70%)'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
              <Sparkles size={13} /> The Student Operating System • Built for CS & Engineering
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            marginBottom: '20px'
          }}>
            Your entire student life.<br />
            <span style={{
              background: 'linear-gradient(135deg, #166534 0%, #22A06B 60%, #16A34A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              One intelligent system.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 32px'
          }}>
            Plan your day, master your skills, track your long-term goals, and prepare for your next opportunity with one connected workspace.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('daily')}
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
            >
              <span>Get Started with Today's Plan</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => setActiveTab('goals')}
              className="btn btn-secondary"
              style={{ padding: '12px 24px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
            >
              <span>Explore AI Roadmaps</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            marginTop: '44px',
            flexWrap: 'wrap',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--accent-primary)" />
              <span>Zero Guilt Adaptive Replanning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--accent-primary)" />
              <span>Google Classroom 2-Way Sync</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={16} color="var(--accent-primary)" />
              <span>250+ SDE Interview Roadmap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Preview Section */}
      <section style={{ padding: '0 20px 70px' }}>
        <div className="glass-panel motionsites-card" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          {/* Preview Tab Control */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            <div className="motionsites-pill-container">
              {[
                { id: 'daily', label: 'Adaptive Daily Plan', icon: CheckCircle2 },
                { id: 'goals', label: 'Milestone Roadmaps', icon: Sparkles },
                { id: 'dsa', label: 'DSA Placement Tracker', icon: Code2 },
                { id: 'classroom', label: 'Google Classroom Hub', icon: BookOpen },
                { id: 'report', label: 'Weekly Debrief', icon: BarChart3 }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id)}
                    className={`motionsites-pill-btn ${activePreviewTab === tab.id ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            minHeight: '340px'
          }}>
            {activePreviewTab === 'daily' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span className="badge badge-emerald">AI Daily Adaptive Engine</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      Today's Focus: 3 Core Tasks (3.5 hrs Planned)
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('daily')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    Open Live Today's Plan <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid var(--accent-rose)', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>
                      <span>CS301 Operating Systems</span>
                      <span>Tomorrow 11:59 PM</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '6px 0' }}>
                      Assignment 3: CPU Scheduling Algorithms Simulation
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Est. 90 mins • Linked to Google Classroom submission
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid var(--accent-primary)', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      <span>DSA Placement (Goal 1)</span>
                      <span>Today 11:00 AM</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '6px 0' }}>
                      Solve 2 LeetCode Mediums on Binary Trees (LCA & Diameter)
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Est. 60 mins • Preserves 14-day study streak
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', borderLeft: '4px solid #16A34A', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                      <span>Adaptive Replanner</span>
                      <span>Quota: 2 left</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '6px 0' }}>
                      Detected CS301 lab clash. Shifting evening slot.
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      One-click non-intrusive rebalance
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'goals' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-emerald">AI Roadmap Generator</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      Crack Top-Tier SDE Internship (DSA 250+ & LLD)
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('goals')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    View Live Roadmap <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    { week: 'Week 1-3', title: 'Arrays, Two Pointers & Binary Search', status: 'Completed' },
                    { week: 'Week 4-6', title: 'Trees, BST & Graph Traversals', status: 'In-Progress' },
                    { week: 'Week 7-9', title: 'Dynamic Programming & Greedy', status: 'Upcoming' },
                    { week: 'Week 10-12', title: 'LLD & Mock Interviews', status: 'Upcoming' }
                  ].map((m, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '14px', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderTop: idx <= 1 ? '3px solid var(--accent-primary)' : '3px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.7rem', color: idx === 1 ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: 700 }}>
                        {m.week}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                        {m.title}
                      </div>
                      <span className={`badge ${idx === 0 ? 'badge-emerald' : idx === 1 ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.625rem', marginTop: '8px' }}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePreviewTab === 'dsa' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-emerald">Placement Mastery</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      148 / 250 Solved (59% Progress) • 14-Day Consistency Streak
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('dsa')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    Open DSA Tracker <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 600 }}>EASY PROBLEMS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>58</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>MEDIUM PROBLEMS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>76</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>HARD PROBLEMS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>14</div>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'classroom' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-emerald">Google Workspace Sync</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      3 Connected University Courses • Auto-Sync Active
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('classroom')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    Open Classroom Hub <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="glass-panel" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>CS301: Operating Systems Simulation in C++</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Due Tomorrow, 11:59 PM • Preemptive SJF & Round Robin</div>
                    </div>
                    <span className="badge badge-rose">Pending Submission</span>
                  </div>
                  <div className="glass-panel" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>CS302: Database Management Systems Lab Practical 5</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Submitted • EXPLAIN ANALYZE Cost Plan</div>
                    </div>
                    <span className="badge badge-emerald">Turned In ✓</span>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'report' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-emerald">Weekly Debrief</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      84% Weekly Completion Rate • 34.5 hrs Deep Work Logged
                    </h3>
                  </div>
                  <button onClick={() => setActiveTab('report')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                    View Weekly Analytics <ArrowRight size={14} />
                  </button>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'var(--bg-accent-soft)', borderLeft: '4px solid var(--accent-primary)', border: '1px solid var(--border-accent)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary-dark)', marginBottom: '4px' }}>
                    AI COACH DEBRIEF
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    "Outstanding academic momentum! Your DSA discipline is in the top 5% of placement candidates. Moving heavy tasks to morning blocks before college hours successfully protected your streak."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bento Grid: 6 Core Superpowers */}
      <section style={{ padding: '20px 20px 70px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <span className="badge badge-emerald">Unified Student Architecture</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '8px' }}>
            Engineered specifically for engineering students
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px' }}>
            Not a generic task list. NexusOS solves the exact friction points Indian CS students face every semester.
          </p>
        </div>

        <div className="bento-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Card 1 */}
          <div className="bento-col-4 glass-panel motionsites-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-accent-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              color: 'var(--accent-primary)'
            }}>
              <RotateCcw size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Adaptive AI Replanning</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              When surprise viva, fest preparation, or illness derails your day, the AI replanner presents 3 feasible schedules instead of letting tasks pile up.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bento-col-4 glass-panel motionsites-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#DDF5E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              color: '#166534'
            }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Google Classroom Two-Way</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Automatic assignment ingestion with instant turn-in synchronization. Submitting coursework in Classroom auto-completes your daily study task.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bento-col-4 glass-panel motionsites-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#EAF8EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              color: 'var(--accent-primary)'
            }}>
              <Code2 size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>DSA Placement Hub</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Structured topic saturation matrix, daily 2-problem quota tracking, CSV import/export, and 48-hour spaced repetition revision reminders.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bento-col-6 glass-panel motionsites-card" style={{ padding: '26px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              color: 'var(--accent-amber)'
            }}>
              <Flame size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Spaced Repetition & Streak Protection</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Never lose sight of hard interview problems solved weeks ago. Smart check-ins reward consistency and protect your streak during exam weeks.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bento-col-6 glass-panel motionsites-card" style={{ padding: '26px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#EAF8EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              color: '#166534'
            }}>
              <BarChart3 size={20} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Sunday AI Coach Debrief</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Comprehensive 7-day workload analysis identifying planned vs executed hours, top wins, missed topics, and an auto-generated blueprint for next week.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section style={{ padding: '20px 20px 70px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <span className="badge badge-amber">Simple & Honest Pricing</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '8px' }}>
            Built for college budgets
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px' }}>
            Start completely free. Upgrade when you need uncapped AI replans and unlimited roadmaps for placement season.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Free Tier */}
          <div className="glass-panel" style={{ padding: '32px 28px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>FREE SCHOLAR</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0' }}>₹0</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Essential planning for individual students</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none', paddingLeft: 0, marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> 2 Active AI Goal Roadmaps</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> 5 AI Adaptive Replans per month</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> 1 Google Classroom Connected Account</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> DSA Problem Logger & CSV Export</li>
            </ul>

            <button
              onClick={() => setActiveTab('daily')}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '11px', justifyContent: 'center' }}
            >
              Continue with Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel" style={{
            padding: '32px 28px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
            border: '2px solid var(--accent-primary)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              background: 'linear-gradient(135deg, #22A06B, #16A34A)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '3px 12px',
              borderRadius: '999px',
              letterSpacing: '0.04em'
            }}>
              MOST POPULAR
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary-dark)' }}>PLACEMENT PRO</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0' }}>
              ₹149 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#166534', marginBottom: '24px', fontWeight: 600 }}>For candidates aiming for top-tier internships & jobs</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-main)', listStyle: 'none', paddingLeft: 0, marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} color="var(--accent-amber)" /> <strong>Unlimited</strong> AI Goals & Milestones</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} color="var(--accent-amber)" /> <strong>Unlimited</strong> Adaptive AI Replans</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> Multi-Account Classroom Sync</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> Sunday AI Performance Diagnostics</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> Priority Mock Interview Scheduling</li>
            </ul>

            <button
              onClick={() => setActiveModal('upgrade')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '11px', justifyContent: 'center' }}
            >
              <Crown size={16} />
              <span>Upgrade to Pro Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '20px 20px 70px', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge badge-emerald">Frequently Asked Questions</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '8px' }}>
            Everything you need to know
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{ padding: '18px 22px', cursor: 'pointer', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
                onClick={() => setOpenFaq(isOpen ? -1 : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{faq.q}</h4>
                  <ChevronDown
                    size={18}
                    color="var(--accent-primary)"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </div>
                {isOpen && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section style={{
        padding: '50px 24px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #EAF8EE 0%, #DDF5E5 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Ready to bring order to your student life?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', margin: '10px auto 26px' }}>
          Join Aarav and thousands of university students building sustainable daily momentum for exams and placements.
        </p>
        <button
          onClick={() => setActiveTab('daily')}
          className="btn btn-primary"
          style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
        >
          <span>Launch Your Workspace</span>
          <ArrowRight size={17} />
        </button>
      </section>
    </div>
  );
};
