import React, { useState, useEffect } from 'react';
import { NexusProvider, useNexus } from './context/NexusContext';
import { Navbar } from './components/Navbar';
import { DailyPlanView } from './components/DailyPlanView';
import { GoalsView } from './components/GoalsView';
import { ClassroomView } from './components/ClassroomView';
import { DSATrackerView } from './components/DSATrackerView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { PRDAnalysisView } from './components/PRDAnalysisView';
import { LandingPageView } from './components/LandingPageView';
import { SettingsView } from './components/SettingsView';

// UI & Navigation
import { CommandPalette } from './components/ui/CommandPalette';

// Modals
import { ReplanModal } from './components/modals/ReplanModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { AddTaskModal } from './components/modals/AddTaskModal';
import { LogDSAModal } from './components/modals/LogDSAModal';
import { CSVImportModal } from './components/modals/CSVImportModal';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { AuthModal } from './components/modals/AuthModal';

import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification = () => {
  const { toastMessage, dismissToast } = useNexus();
  if (!toastMessage) return null;

  const { title, msg, type } = toastMessage;

  return (
    <div 
      className="glass-panel toast-notification"
      style={{
        backgroundColor: '#FFFFFF',
        border: type === 'success' 
          ? '1px solid #BEE8CD' 
          : type === 'error' 
          ? '1px solid #FECACA' 
          : '1px solid #BEE8CD',
        boxShadow: '0 10px 30px -5px rgba(23, 33, 27, 0.12)',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'fadeSlideUp 220ms var(--ease-out-expo)'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: type === 'success' 
          ? '#EAF8EE' 
          : type === 'error' 
          ? '#FEE2E2' 
          : '#EAF8EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {type === 'success' ? (
          <CheckCircle2 size={18} color="var(--accent-emerald)" />
        ) : type === 'error' ? (
          <AlertCircle size={18} color="var(--accent-rose)" />
        ) : (
          <Info size={18} color="var(--accent-primary)" />
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>{msg}</div>
      </div>

      <button
        onClick={dismissToast}
        className="btn btn-ghost"
        style={{ padding: '2px', color: 'var(--text-muted)' }}
        title="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

const MainContent = ({ isCmdPaletteOpen, setIsCmdPaletteOpen }) => {
  const { activeTab } = useNexus();

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCmdPaletteOpen]);

  return (
    <main className="app-main-container">
      <div key={activeTab} className="animate-fade-in">
        {activeTab === 'daily' && <DailyPlanView />}
        {activeTab === 'goals' && <GoalsView />}
        {activeTab === 'classroom' && <ClassroomView />}
        {activeTab === 'dsa' && <DSATrackerView />}
        {activeTab === 'report' && <WeeklyReportView />}
        {activeTab === 'analysis' && <PRDAnalysisView />}
        {activeTab === 'landing' && <LandingPageView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>

      {/* Global Modals */}
      <ReplanModal />
      <AddGoalModal />
      <AddTaskModal />
      <LogDSAModal />
      <CSVImportModal />
      <UpgradeModal />
      <AuthModal />

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={isCmdPaletteOpen} 
        onClose={() => setIsCmdPaletteOpen(false)} 
      />

      {/* Toast Feedback */}
      <ToastNotification />
    </main>
  );
};

export default function App() {
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  return (
    <NexusProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onOpenCommandPalette={() => setIsCmdPaletteOpen(true)} />
        <MainContent 
          isCmdPaletteOpen={isCmdPaletteOpen} 
          setIsCmdPaletteOpen={setIsCmdPaletteOpen} 
        />
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '18px 24px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          backgroundColor: '#FFFFFF',
          marginTop: 'auto'
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              NexusOS • The AI-Powered Student Operating System • PRD Compliant Architecture
            </div>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)' }}>
              <span>Goals → Milestones → Daily Tasks → Auto-Replan</span>
              <span>•</span>
              <span>Press <kbd style={{ background: '#EAF8EE', padding: '2px 6px', borderRadius: '4px', color: '#166534', border: '1px solid #BEE8CD', fontWeight: 600 }}>⌘K</kbd> for actions</span>
            </div>
          </div>
        </footer>
      </div>
    </NexusProvider>
  );
}
