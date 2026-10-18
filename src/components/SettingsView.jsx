import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { 
  User, 
  Settings, 
  Crown, 
  ShieldCheck, 
  BookOpen, 
  Globe, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Save, 
  RotateCcw,
  Key,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

export const SettingsView = () => {
  const { 
    data, 
    currentUser, 
    updateUserProfile, 
    resetData, 
    setActiveModal, 
    handleFirebaseUserLogout, 
    showToast,
    toggleLanguage 
  } = useNexus();

  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [activeSection, setActiveSection] = useState('profile'); // 'profile' | 'appearance' | 'integrations' | 'billing' | 'data'

  // Editable Profile Form State
  const [name, setName] = useState(data.user.name || '');
  const [college, setCollege] = useState(data.user.college || '');
  const [branch, setBranch] = useState(data.user.branch || '');
  const [year, setYear] = useState(data.user.year || '');
  const [targetDate, setTargetDate] = useState(data.user.targetDate || '2027-01-15');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      college,
      branch,
      year,
      targetDate
    });
  };

  const handleExportFullJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexusOS_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Backup Exported', 'Downloaded full NexusOS JSON backup.', 'success');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 0 60px' }}>
      {/* Settings Header */}
      <div className="glass-panel animate-fade-in" style={{
        padding: '24px 28px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-emerald">
            <Settings size={12} /> System Preferences
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            NexusOS v0.1 • Local & Cloud Synchronized
          </span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {isHinglish ? 'Settings aur Account Management' : 'Settings & Account Preferences'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '720px', marginTop: '4px' }}>
          Manage your student profile, university credentials, language preferences, Google Classroom sync, and subscription limits.
        </p>
      </div>

      {/* Main Settings Layout: Sidebar Navigation + Content Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 260px) minmax(0, 1fr)', gap: '24px' }}>
        {/* Sidebar Nav */}
        <div className="glass-panel" style={{ padding: '12px', height: 'fit-content', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'profile', label: 'Student Profile', icon: User },
            { id: 'appearance', label: 'Language & Theme', icon: Globe },
            { id: 'integrations', label: 'Integrations & Sync', icon: BookOpen },
            { id: 'billing', label: 'Plan & Quota Limits', icon: Crown },
            { id: 'data', label: 'Data & Privacy', icon: ShieldCheck }
          ].map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '4px',
                  fontSize: '0.85rem'
                }}
              >
                <Icon size={16} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section Content */}
        <div className="glass-panel" style={{ padding: '28px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          {/* PROFILE SECTION */}
          {activeSection === 'profile' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                Student Persona & Academic Details
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                This data tunes the AI planner's workload estimates and semester milestone targets.
              </p>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Full Name:
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      University / College:
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Department / Branch:
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Year & Semester:
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    SDE Internship Target Date:
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Powers the header countdown and milestone sprint compression.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '9px 20px' }}>
                    <Save size={15} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* APPEARANCE & LANGUAGE */}
          {activeSection === 'appearance' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                Language & Interface Preferences
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Toggle regional Hinglish explanations and customize interface density.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Regional Language Mode</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Current: <strong>{isHinglish ? 'Hinglish (Hindi + English) 🇮🇳' : 'Standard English 🌐'}</strong>
                    </div>
                  </div>
                  <button onClick={toggleLanguage} className="btn btn-secondary">
                    <Globe size={15} />
                    <span>Switch to {isHinglish ? 'English' : 'Hinglish'}</span>
                  </button>
                </div>

                <div style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Design System Palette</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Premium White + Fresh Light Green SaaS Theme with MotionSites Cards
                    </div>
                  </div>
                  <span className="badge badge-emerald">Light Green SaaS (Active)</span>
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATIONS */}
          {activeSection === 'integrations' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                University & Third-Party Integrations
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Connect your academic tools to enable zero-friction automatic planning.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '18px',
                  background: 'var(--bg-accent-soft)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-emerald">Connected</span>
                      <strong style={{ color: 'var(--text-main)' }}>Google Classroom Hub</strong>
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Account: {data.classroom.accountEmail} • 3 courses active • Auto-sync every 15 mins
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('Sync Refreshed', 'Google Classroom data up to date.', 'success')}
                    className="btn btn-primary" 
                    style={{ fontSize: '0.8rem' }}
                  >
                    Sync Now
                  </button>
                </div>

                <div style={{
                  padding: '18px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-emerald">CSV / Manual</span>
                      <strong style={{ color: 'var(--text-main)' }}>LeetCode & DSA Platform</strong>
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Direct problem logging, CSV batch import, and spaced repetition queue
                    </div>
                  </div>
                  <button onClick={() => setActiveModal('csvImport')} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                    Import CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BILLING & PLAN */}
          {activeSection === 'billing' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                Subscription Plan & Usage Limits
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Review active plan quotas according to PRD section 12 monetization gates.
              </p>

              <div style={{
                padding: '20px',
                background: data.user.plan === 'Free' ? '#FEF3C7' : 'var(--bg-accent-soft)',
                border: data.user.plan === 'Free' ? '1px solid #FCD34D' : '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <span className={`badge ${data.user.plan === 'Free' ? 'badge-amber' : 'badge-emerald'}`}>
                      {data.user.plan.toUpperCase()} TIER
                    </span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: data.user.plan === 'Free' ? '#92400E' : 'var(--text-main)', marginTop: '6px' }}>
                      {data.user.plan === 'Free' ? 'Free Scholar Edition' : 'Placement Pro Edition'}
                    </h4>
                  </div>
                  {data.user.plan === 'Free' && (
                    <button onClick={() => setActiveModal('upgrade')} className="btn btn-amber">
                      <Crown size={15} /> Upgrade to Pro (₹149)
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div className="glass-panel" style={{ padding: '12px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>AI Replans Remaining:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {data.user.plan === 'Free' ? `${data.user.replansLimit - data.user.replansUsedThisMonth} of ${data.user.replansLimit}` : 'Unlimited ⚡'}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '12px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Goal Roadmaps:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {data.goals.length} {data.user.plan === 'Free' ? '/ 2 Max' : 'Active'}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '12px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Classroom Accounts:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      1 Connected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DATA & PRIVACY */}
          {activeSection === 'data' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                Data Management & Privacy
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                NexusOS prioritizes student privacy. All data is persisted locally and securely cached.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Export Full JSON Backup</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Download complete snapshot of tasks, goals, DSA logs, and Classroom assignments
                    </div>
                  </div>
                  <button onClick={handleExportFullJSON} className="btn btn-secondary">
                    <Download size={15} />
                    <span>Export JSON</span>
                  </button>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#FEF2F2',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #FECACA',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#B91C1C' }}>Reset Data to Demo Seed</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Clear local modifications and reinitialize the realistic 3rd-year CS student persona
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset all data to default demo state?')) {
                        resetData();
                      }
                    }} 
                    className="btn"
                    style={{
                      background: '#FEE2E2',
                      border: '1px solid #FCA5A5',
                      color: '#B91C1C',
                      fontWeight: 600
                    }}
                  >
                    <Trash2 size={15} />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
