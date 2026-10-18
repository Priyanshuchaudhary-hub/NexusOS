import React, { useState, useEffect, useRef } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Search, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Code2, 
  BarChart3, 
  FileText, 
  Plus, 
  RotateCcw, 
  Crown, 
  ShieldCheck, 
  Globe, 
  Settings, 
  Layers, 
  FileSpreadsheet,
  X,
  ArrowRight
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const { 
    setActiveTab, 
    setActiveModal, 
    toggleLanguage, 
    syncClassroom,
    data,
    markTaskStatus
  } = useNexus();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const commands = [
    // Navigation
    { id: 'nav-daily', title: isHinglish ? 'Aaj Ka Plan (Today’s Plan)' : 'Today’s Plan', category: 'Navigation', icon: CheckCircle2, action: () => { setActiveTab('daily'); onClose(); } },
    { id: 'nav-goals', title: isHinglish ? 'AI Goals & Roadmap' : 'Goals & Roadmaps', category: 'Navigation', icon: Sparkles, action: () => { setActiveTab('goals'); onClose(); } },
    { id: 'nav-classroom', title: 'Google Classroom Hub', category: 'Navigation', icon: BookOpen, action: () => { setActiveTab('classroom'); onClose(); } },
    { id: 'nav-dsa', title: 'DSA Placement Tracker', category: 'Navigation', icon: Code2, action: () => { setActiveTab('dsa'); onClose(); } },
    { id: 'nav-report', title: isHinglish ? 'Hafte Ka Report' : 'Weekly Report', category: 'Navigation', icon: BarChart3, action: () => { setActiveTab('report'); onClose(); } },
    { id: 'nav-analysis', title: 'PRD Technical Analysis', category: 'Navigation', icon: FileText, action: () => { setActiveTab('analysis'); onClose(); } },
    { id: 'nav-landing', title: 'Product Overview & Landing Page', category: 'Navigation', icon: Layers, action: () => { setActiveTab('landing'); onClose(); } },
    { id: 'nav-settings', title: 'Account Settings & Preferences', category: 'Navigation', icon: Settings, action: () => { setActiveTab('settings'); onClose(); } },

    // Quick Actions
    { id: 'act-add-task', title: isHinglish ? 'Naya Task Jodein' : 'Schedule New Task', category: 'Actions', icon: Plus, badge: 'Shortcut', action: () => { setActiveModal('addTask'); onClose(); } },
    { id: 'act-add-goal', title: isHinglish ? 'AI ke saath Naya Goal' : 'Synthesize AI Goal Roadmap', category: 'Actions', icon: Sparkles, badge: 'AI', action: () => { setActiveModal('addGoal'); onClose(); } },
    { id: 'act-log-dsa', title: isHinglish ? 'DSA Problem Log Karein' : 'Log Solved DSA Problem', category: 'Actions', icon: Code2, badge: 'P0', action: () => { setActiveModal('logDSA'); onClose(); } },
    { id: 'act-import-csv', title: 'Batch Import DSA Problems (CSV)', category: 'Actions', icon: FileSpreadsheet, action: () => { setActiveModal('csvImport'); onClose(); } },
    { id: 'act-replan', title: isHinglish ? 'AI Adaptive Replan Trigger' : 'Trigger AI Adaptive Replanner', category: 'Actions', icon: RotateCcw, badge: 'AI', action: () => { 
      const target = data.tasks.find(t => t.status !== 'done') || data.tasks[0];
      markTaskStatus(target.id, 'missed', 'Manual Replan Triggered');
      onClose(); 
    }},
    { id: 'act-sync-cls', title: 'Sync Google Classroom Data', category: 'Actions', icon: BookOpen, action: () => { syncClassroom(); onClose(); } },
    { id: 'act-toggle-lang', title: isHinglish ? 'Switch to English UI' : 'Switch to Hinglish UI (🇮🇳)', category: 'Preferences', icon: Globe, action: () => { toggleLanguage(); onClose(); } },
    { id: 'act-upgrade', title: 'Upgrade to NexusOS Pro (₹149/mo)', category: 'Billing', icon: Crown, badge: 'Pro', action: () => { setActiveModal('upgrade'); onClose(); } },
    { id: 'act-auth', title: 'Firebase Authentication / Account Sync', category: 'Account', icon: ShieldCheck, action: () => { setActiveModal('auth'); onClose(); } }
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={onClose}>
      <div 
        className="cmd-palette-box" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 20px 50px -10px rgba(0,0,0,0.12), 0 0 0 1px var(--border-subtle)'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)'
        }}>
          <Search size={18} color="var(--accent-primary)" />
          <input
            ref={inputRef}
            type="text"
            className="input-field"
            placeholder="Type a command, feature, or navigate anywhere... (Esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: '0.95rem',
              boxShadow: 'none',
              color: 'var(--text-main)'
            }}
          />
          <button 
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '4px', color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No commands found matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  style={{
                    background: isSelected ? 'var(--bg-accent-soft)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-accent)' : '1px solid transparent',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    marginBottom: '2px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: isSelected ? 'var(--accent-light)' : 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: isSelected ? 'var(--accent-primary-dark)' : 'var(--text-main)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {item.badge && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.625rem' }}>
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        Select <ArrowRight size={12} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
          fontSize: '0.725rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span><kbd style={{ background: '#EAF8EE', border: '1px solid #BEE8CD', color: 'var(--text-main)', padding: '2px 5px', borderRadius: '4px' }}>↑</kbd> <kbd style={{ background: '#EAF8EE', border: '1px solid #BEE8CD', color: 'var(--text-main)', padding: '2px 5px', borderRadius: '4px' }}>↓</kbd> to navigate</span>
            <span><kbd style={{ background: '#EAF8EE', border: '1px solid #BEE8CD', color: 'var(--text-main)', padding: '2px 5px', borderRadius: '4px' }}>↵</kbd> to select</span>
            <span><kbd style={{ background: '#EAF8EE', border: '1px solid #BEE8CD', color: 'var(--text-main)', padding: '2px 5px', borderRadius: '4px' }}>esc</kbd> to close</span>
          </div>
          <span style={{ color: 'var(--accent-primary-dark)', fontWeight: 600 }}>NexusOS Intelligence</span>
        </div>
      </div>
    </div>
  );
};
