import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { 
  BookOpen, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileUp, 
  Trash2, 
  Sparkles,
  Link2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const ClassroomView = () => {
  const { data, syncClassroom, turnInAssignment, showToast } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [showFallbackModal, setShowFallbackModal] = useState(false);
  const [icsInput, setIcsInput] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncClick = () => {
    setIsSyncing(true);
    syncClassroom();
    setTimeout(() => setIsSyncing(false), 1200);
  };

  const handleManualImport = (e) => {
    e.preventDefault();
    if (!icsInput.trim()) return;
    showToast('Calendar Imported', 'Imported university course schedule from calendar feed.', 'success');
    setShowFallbackModal(false);
    setIcsInput('');
  };

  const pendingAssignmentsCount = data.classroom.assignments.filter(a => a.status === 'assigned').length;
  const completedAssignmentsCount = data.classroom.assignments.filter(a => a.status === 'turned_in').length;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 0' }}>
      {/* Top Banner */}
      <div className="glass-panel motionsites-card animate-fade-in" style={{
        padding: '28px 32px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <ShieldCheck size={12} /> Google OAuth 2.0 (Read-Only)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Connected: <strong>{data.classroom.accountEmail}</strong>
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Google Classroom Sync Hub
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '720px', marginTop: '6px', lineHeight: 1.5 }}>
            {isHinglish 
              ? 'Aapke sabhi college assignments, submission status aur due dates real-time sync hote hain. Turn-in karte hi daily task automatically "Done" mark ho jata hai.'
              : 'Direct read-only integration. Assignments seamlessly populate your daily planning constraints and auto-resolve tasks when marked turned-in.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleSyncClick}
            disabled={isSyncing}
            className="btn btn-emerald"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : (isHinglish ? 'Abhi Sync Karein' : 'Sync Classroom')}</span>
          </button>

          <button
            onClick={() => setShowFallbackModal(true)}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
            title="College firewall / admin block fallback"
          >
            <FileUp size={15} />
            <span>Manual / ICS Fallback</span>
          </button>
        </div>
      </div>

      {/* Sync Status Info Bar */}
      <div className="glass-panel" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        marginBottom: '24px',
        fontSize: '0.8rem',
        flexWrap: 'wrap',
        gap: '12px',
        background: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Last Synced: <strong style={{ color: 'var(--text-main)' }}>{data.classroom.lastSynced}</strong>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Deduplication: <strong style={{ color: 'var(--accent-emerald)' }}>Active (source=classroom)</strong>
          </span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: 'var(--accent-primary)' }}>
            {pendingAssignmentsCount} pending • {completedAssignmentsCount} turned in
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Auto-sync every 15 mins</span>
          <button 
            onClick={() => showToast('Data Disconnected', 'Google Classroom local cache cleared.', 'info')}
            className="btn btn-ghost" 
            style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', padding: '4px 8px' }}
          >
            <Trash2 size={13} /> Disconnect
          </button>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
          {isHinglish ? 'Enrolled College Courses (Sem 5)' : 'Enrolled College Courses'}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          {data.classroom.courses.map((course) => (
            <div
              key={course.id}
              className="glass-panel motionsites-card"
              style={{
                padding: '22px',
                borderLeft: `4px solid ${course.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                background: '#FFFFFF'
              }}
            >
              <div>
                <span className="badge" style={{ background: '#EAF8EE', color: '#166534', border: '1px solid #BEE8CD', marginBottom: '8px' }}>
                  {course.room}
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                  {course.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                  Instructor: {course.instructor}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.775rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                  {course.activeAssignments} Active Coursework
                </span>
                <span className="badge badge-emerald" style={{ fontSize: '0.625rem' }}>
                  Synced
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Assignments & Turn-In Stream */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
          {isHinglish ? 'Coursework & Submissions (Real-time)' : 'Coursework & Submissions'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.classroom.assignments.map((assign) => {
            const isTurnedIn = assign.status === 'turned_in';

            return (
              <div
                key={assign.id}
                className="glass-panel motionsites-card"
                style={{
                  padding: '22px 26px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '18px',
                  border: isTurnedIn ? '1px solid #BEE8CD' : '1px solid var(--border-subtle)',
                  background: isTurnedIn ? '#F0F7F1' : '#FFFFFF'
                }}
              >
                <div style={{ maxWidth: '820px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {assign.courseName}
                    </span>
                    <span className={`badge ${isTurnedIn ? 'badge-emerald' : 'badge-rose'}`}>
                      {isTurnedIn ? 'Turned In' : 'Assigned (Pending)'}
                    </span>
                    <span style={{ fontSize: '0.775rem', color: 'var(--accent-amber)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <Clock size={13} /> Due: {assign.dueDate}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {assign.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                    {assign.description}
                  </p>

                  {assign.linkedTaskId && (
                    <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Link2 size={13} /> Linked to Daily Study Task: {assign.linkedTaskId}
                    </div>
                  )}
                </div>

                {/* Turn In Trigger */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => turnInAssignment(assign.id)}
                    className={`btn ${isTurnedIn ? 'btn-secondary' : 'btn-emerald'}`}
                    style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {isTurnedIn 
                        ? 'Mark Unsubmitted' 
                        : (isHinglish ? 'Turn In & Task Complete' : 'Turn In & Complete Task')}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fallback Modal */}
      {showFallbackModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              College Firewall Fallback: Manual / ICS Sync
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {isHinglish
                ? 'PRD Fallback: Agar college IT admin ne Google OAuth permissions restrict kar rakhi hain, toh aap college portal se .ICS calendar ya syllabus feed paste kar sakte hain.'
                : 'PRD Fallback Spec: In case university Google Workspace administrators restrict third-party OAuth access, paste iCalendar feeds or syllabus deadline strings.'}
            </p>

            <form onSubmit={handleManualImport}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Paste ICS Feed URL or Raw Calendar Text:
                </label>
                <textarea
                  rows={4}
                  className="input-field"
                  placeholder="https://moodle.college.edu/calendar/export_execute.php?userid=... or BEGIN:VCALENDAR..."
                  value={icsInput}
                  onChange={(e) => setIcsInput(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowFallbackModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Import Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
