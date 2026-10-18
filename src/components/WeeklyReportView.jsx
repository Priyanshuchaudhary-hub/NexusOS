import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  AlertTriangle, 
  Sparkles, 
  Share2, 
  Download, 
  ArrowRight,
  Clock,
  BookOpen,
  Code2,
  Calendar,
  Activity,
  Award,
  TrendingUp
} from 'lucide-react';

export const WeeklyReportView = () => {
  const { data, showToast } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const report = data.weeklyReport;
  const [activeDayHover, setActiveDayHover] = useState(null);

  // Animated counters
  const animatedCompletion = useAnimatedCounter(report.completionRate);
  const animatedCompletedTasks = useAnimatedCounter(report.completedTasks);
  const animatedDSACount = useAnimatedCounter(report.dsaSolvedThisWeek);
  const animatedStreak = useAnimatedCounter(report.streakMaintained);
  const animatedHours = useAnimatedCounter(report.studyHoursLogged);

  // Weekly 7-day breakdown
  const weekDays = [
    { day: 'Mon', date: 'Oct 09', hours: 5.5, dsa: 2, tasksDone: 3 },
    { day: 'Tue', date: 'Oct 10', hours: 6.0, dsa: 2, tasksDone: 4 },
    { day: 'Wed', date: 'Oct 11', hours: 4.5, dsa: 1, tasksDone: 2 },
    { day: 'Thu', date: 'Oct 12', hours: 6.5, dsa: 3, tasksDone: 4 },
    { day: 'Fri', date: 'Oct 13', hours: 5.0, dsa: 2, tasksDone: 3 },
    { day: 'Sat', date: 'Oct 14', hours: 7.0, dsa: 2, tasksDone: 3 },
    { day: 'Sun', date: 'Oct 15', hours: 4.0, dsa: 1, tasksDone: 2 },
  ];

  const maxDailyHours = 8.0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `NexusOS Weekly Report — ${data.user.name}`,
        text: `Achieved ${report.completionRate}% completion rate, 14-day streak, and ${report.dsaSolvedThisWeek} DSA problems solved!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Report Copied to Clipboard', 'Summary copied! You can share with your mentor or peer group.', 'success');
    }
  };

  const handleDownloadReport = () => {
    const reportText = `NexusOS AI Student Operating System — Weekly Performance Summary
Student: ${data.user.name} (${data.user.college})
Week: ${report.weekRange}
-------------------------------------------------------
• Completion Rate: ${report.completionRate}%
• Tasks Completed: ${report.completedTasks} / ${report.plannedTasks}
• DSA Solved: ${report.dsaSolvedThisWeek} problems
• Assignments Turned In: ${report.assignmentsTurnedIn}
• Total Deep Work: ${report.studyHoursLogged} hours
• Active Streak: ${report.streakMaintained} Days

AI COACH DEBRIEF:
${isHinglish ? report.aiCoachAnalysis.hinglish : report.aiCoachAnalysis.english}

TOP WINS:
${report.topWins.map(w => `- ${w}`).join('\n')}

MISSED FOCUS:
${report.topMisses.map(m => `- ${m}`).join('\n')}

NEXT WEEK SPRINT:
${report.suggestedNextWeekFocus.map(f => `[ ] ${f}`).join('\n')}
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexusOS_Report_${data.user.name.replace(/\s+/g, '_')}_Week.txt`;
    a.click();
    showToast('Report Downloaded', 'Exported comprehensive text performance debrief.', 'success');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 0' }}>
      {/* Header */}
      <div 
        className="glass-panel motionsites-card animate-fade-in"
        style={{
          padding: '28px 32px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">
              <Sparkles size={12} /> {isHinglish ? 'AI Coach Weekly Debrief' : 'AI Performance Debrief'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Period: <strong>{report.weekRange}</strong>
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {isHinglish ? 'Hafte Ka Performance Report' : 'Weekly Performance Review'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '720px', marginTop: '6px', lineHeight: 1.5 }}>
            {isHinglish 
              ? 'Auto-generated audit: kya planned tha, kya complete hua, kya chhoota, aur agle hafte ka suggested blueprint.'
              : 'Holistic performance breakdown analyzing planned vs executed workload, DSA consistency, and adaptive replan frequency.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleShare} className="btn btn-secondary" style={{ padding: '9px 16px', fontSize: '0.85rem' }}>
            <Share2 size={15} />
            <span>Share</span>
          </button>
          <button onClick={handleDownloadReport} className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
            <Download size={15} />
            <span>{isHinglish ? 'Report Card Export' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Hero Stats Bento Grid with Staggered Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Metric 1 */}
        <div className="glass-panel motionsites-card" style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '8px' }}>
            <Activity size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Completion Rate</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedCompletion}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +6% vs last week
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel motionsites-card" style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', marginBottom: '8px' }}>
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Tasks Executed</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedCompletedTasks} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {report.plannedTasks}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {report.missedTasks} tasks safely replanned
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel motionsites-card" style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '8px' }}>
            <Code2 size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>DSA Solved</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedDSACount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>problems</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginTop: '4px', fontWeight: 600 }}>
            Top 5% candidate velocity
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel motionsites-card" style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', marginBottom: '8px' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Deep Work</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedHours} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>hours</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Avg 4.9 hrs/day focused study
          </div>
        </div>
      </div>

      {/* Interactive 7-Day Bar Chart & AI Debrief */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: '24px', marginBottom: '28px' }}>
        {/* Left: 7-Day Activity Chart */}
        <div className="glass-panel motionsites-card" style={{ padding: '26px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Daily Deep Work Hours (7-Day Trend)
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Hover a bar to inspect daily metrics breakdown
              </span>
            </div>
            <span className="badge badge-indigo">Max: 7.0h (Sat)</span>
          </div>

          {/* Bar Chart Container */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '12px',
            height: '180px',
            padding: '10px 10px 0',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            {weekDays.map((d) => {
              const heightPct = Math.round((d.hours / maxDailyHours) * 100);
              const isHovered = activeDayHover?.day === d.day;

              return (
                <div
                  key={d.day}
                  onMouseEnter={() => setActiveDayHover(d)}
                  onMouseLeave={() => setActiveDayHover(null)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '100%',
                    maxWidth: '42px',
                    height: `${heightPct}%`,
                    background: isHovered 
                      ? 'linear-gradient(180deg, #15803D, #22A06B)' 
                      : 'linear-gradient(180deg, #22A06B, #DDF5E5)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all var(--transition-fast)',
                    boxShadow: isHovered ? '0 0 12px rgba(34, 160, 107, 0.3)' : 'none'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: isHovered ? 'var(--text-main)' : 'var(--text-muted)', marginTop: '8px', fontWeight: isHovered ? 700 : 500 }}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Hover Inspection Card */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: '#F0F7F1',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {activeDayHover ? (
              <>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{activeDayHover.day} ({activeDayHover.date}):</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{activeDayHover.hours} Hours Logged</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{activeDayHover.dsa} DSA Problems</span>
                <span style={{ color: '#166534', fontWeight: 600 }}>{activeDayHover.tasksDone} Tasks Done</span>
              </>
            ) : (
              <span style={{ color: 'var(--text-secondary)' }}>
                💡 Tip: Saturday was your highest deep-work marathon with 7.0 hours logged.
              </span>
            )}
          </div>
        </div>

        {/* Right: AI Coach Debrief */}
        <div className="glass-panel motionsites-card" style={{ padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={18} color="var(--accent-primary)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                AI Coach Synthesis
              </h3>
            </div>

            <div style={{
              padding: '16px',
              background: '#EAF8EE',
              borderLeft: '4px solid var(--accent-primary)',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#166534',
              lineHeight: 1.6
            }}>
              {isHinglish ? report.aiCoachAnalysis.hinglish : report.aiCoachAnalysis.english}
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Suggested Next Week Focus
            </div>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {report.suggestedNextWeekFocus.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Wins & Misses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Top Wins */}
        <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-emerald)', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Trophy size={18} color="var(--accent-emerald)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Top Highlights & Wins
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {report.topWins.map((w, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 12px',
                background: '#EAF8EE',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #BEE8CD',
                fontSize: '0.825rem',
                color: '#166534'
              }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Misses */}
        <div className="glass-panel motionsites-card" style={{ padding: '24px', borderTop: '4px solid var(--accent-amber)', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertTriangle size={18} color="#D97706" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Missed Areas & Adjustments
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {report.topMisses.map((m, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 12px',
                background: '#FEF3C7',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #FDE68A',
                fontSize: '0.825rem',
                color: '#92400E'
              }}>
                <XCircle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
