import React, { useState, useMemo } from 'react';
import { useNexus } from '../context/NexusContext';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { 
  Code2, 
  Target, 
  Plus, 
  FileSpreadsheet, 
  ExternalLink, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Download, 
  Search, 
  X,
  BookMarked,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';

export const DSATrackerView = () => {
  const { data, setActiveModal, showToast } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';
  
  const [topicFilter, setTopicFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectProblem, setInspectProblem] = useState(null);

  const { targetProblems, solvedCount, dailyTarget, todaySolved, byDifficulty, byTopic, recentLogs } = data.dsa;

  // Animated counters
  const animatedSolved = useAnimatedCounter(solvedCount);
  const animatedToday = useAnimatedCounter(todaySolved);
  const animatedEasy = useAnimatedCounter(byDifficulty.easy);
  const animatedMedium = useAnimatedCounter(byDifficulty.medium);
  const animatedHard = useAnimatedCounter(byDifficulty.hard);

  const progressPercent = Math.min(Math.round((solvedCount / targetProblems) * 100), 100);
  const totalDifficultyProblems = (byDifficulty.easy + byDifficulty.medium + byDifficulty.hard) || 1;
  const easyPct = Math.round((byDifficulty.easy / totalDifficultyProblems) * 100);
  const medPct = Math.round((byDifficulty.medium / totalDifficultyProblems) * 100);
  const hardPct = Math.round((byDifficulty.hard / totalDifficultyProblems) * 100);

  // Filtered problems
  const filteredLogs = useMemo(() => {
    return recentLogs.filter(log => {
      const matchesTopic = topicFilter === 'All' || log.topic.toLowerCase().includes(topicFilter.toLowerCase());
      const matchesDiff = difficultyFilter === 'All' || log.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' || 
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.platform.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesDiff && matchesSearch;
    });
  }, [recentLogs, topicFilter, difficultyFilter, searchQuery]);

  const handleExportCSV = () => {
    let csv = "Title,Platform,Difficulty,Topic,SolvedAt,TimeSpentMins\n";
    recentLogs.forEach(l => {
      csv += `"${l.title}","${l.platform}","${l.difficulty}","${l.topic}","${l.solvedAt}",${l.timeSpentMins || 30}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NexusOS_DSA_Export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    showToast('Exported DSA Log', 'Saved CSV export of your solved problems.', 'success');
  };

  const handleMarkRevision = (problem) => {
    showToast(
      isHinglish ? 'Revision Scheduled' : 'Added to Revision Queue',
      `${problem.title} scheduled for 48h Spaced Repetition review.`,
      'success'
    );
    setInspectProblem(null);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 0' }}>
      {/* Header & Main Stats Banner */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-cyan">
              <Code2 size={12} /> SDE Placement Tracker (P0)
            </span>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> Internship Season: 48d left (Jan 15)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Striver SDE / LeetCode Roadmap
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {isHinglish ? 'DSA Placement Mastery Tracker' : 'DSA Placement Mastery Tracker'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '720px', marginTop: '6px', lineHeight: 1.5 }}>
            {isHinglish 
              ? 'Roz 2 DSA problem ka quota track karein. Topic-wise coverage, difficulty distribution aur CSV export ke saath apni placement preparation par full grip rakhein.'
              : 'Benchmark your journey to 250 high-yield interview problems. Topic saturation, time tracking, difficulty distribution, and CSV workflow.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveModal('logDSA')}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <Plus size={15} />
            <span>{isHinglish ? 'Problem Log Karein' : 'Log Solved Problem'}</span>
          </button>

          <button
            onClick={() => setActiveModal('csvImport')}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
          >
            <FileSpreadsheet size={15} />
            <span>CSV Import</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="btn btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
            title="Download CSV Export"
          >
            <Download size={15} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Top Bento Metrics: Overall Progress, Daily Quota, Difficulty Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Metric 1: Solved vs Target */}
        <div className="glass-panel motionsites-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Progress to Target (250 Problems)
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {progressPercent}%
            </span>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedSolved} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {targetProblems}</span>
          </div>

          <div style={{ height: '7px', width: '100%', background: '#EAF8EE', borderRadius: '999px', overflow: 'hidden', margin: '14px 0 8px' }} className="progress-sheen">
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #22A06B, #16A34A)',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {targetProblems - solvedCount} problems remaining to achieve top-tier interview readiness.
          </div>
        </div>

        {/* Metric 2: Daily Quota & Streak */}
        <div className="glass-panel motionsites-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Daily Consistency Quota
            </span>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={12} /> {data.user.streakDays} Day Streak
            </span>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedToday} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {dailyTarget} today</span>
          </div>

          <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {todaySolved >= dailyTarget ? (
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                ✓ Daily quota satisfied! Streak protected for today.
              </span>
            ) : (
              <span>Solve 1 more problem before midnight to maintain your 14-day streak.</span>
            )}
          </div>
        </div>

        {/* Metric 3: Difficulty Distribution */}
        <div className="glass-panel motionsites-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Difficulty Breakdown
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>Easy: <strong>{animatedEasy}</strong></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)' }}>Medium: <strong>{animatedMedium}</strong></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)' }}>Hard: <strong>{animatedHard}</strong></span>
          </div>

          {/* Segmented bar */}
          <div style={{ display: 'flex', height: '8px', borderRadius: '999px', overflow: 'hidden', background: '#EAF8EE', marginBottom: '12px' }}>
            <div style={{ width: `${easyPct}%`, background: 'var(--accent-emerald)' }} title={`Easy: ${easyPct}%`} />
            <div style={{ width: `${medPct}%`, background: 'var(--accent-amber)' }} title={`Medium: ${medPct}%`} />
            <div style={{ width: `${hardPct}%`, background: 'var(--accent-rose)' }} title={`Hard: ${hardPct}%`} />
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            High-yield focus: <strong>{medPct}% Mediums</strong> aligns with standard Big-Tech hiring bars.
          </div>
        </div>
      </div>

      {/* Topic Saturation Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
          Topic Coverage Matrix
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {byTopic.map((top) => {
            const pct = Math.round((top.solved / top.total) * 100);
            const isSelected = topicFilter.toLowerCase() === top.topic.toLowerCase();

            return (
              <div
                key={top.topic}
                onClick={() => setTopicFilter(isSelected ? 'All' : top.topic)}
                className="glass-panel"
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? '#EAF8EE' : '#FFFFFF',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#166534' : 'var(--text-main)' }}>
                    {top.topic}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {pct}%
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {top.solved} / {top.total} solved
                </div>

                <div style={{ height: '4px', width: '100%', background: '#EAF8EE', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent-primary)', borderRadius: '999px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Problem Logs Stream & Filter Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Solved Problems Repository
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Showing {filteredLogs.length} of {recentLogs.length} problems
            </span>
          </div>

          {/* Search & Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px'
            }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search problem, topic, platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.8rem',
                  width: '180px'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="btn btn-ghost" style={{ padding: '2px' }}>
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="motionsites-pill-container">
              {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`motionsites-pill-btn ${difficultyFilter === d ? 'active' : ''}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredLogs.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No problems found matching active search and filters.
            </div>
          ) : (
            filteredLogs.map((p) => {
              const diffBadgeClass = p.difficulty.toLowerCase() === 'easy' 
                ? 'badge-emerald' 
                : p.difficulty.toLowerCase() === 'hard' 
                ? 'badge-rose' 
                : 'badge-amber';

              return (
                <div
                  key={p.id}
                  onClick={() => setInspectProblem(p)}
                  className="glass-panel interactive-row"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexWrap: 'wrap',
                    gap: '12px',
                    background: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#EAF8EE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)'
                    }}>
                      <Code2 size={16} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {p.title}
                        </span>
                        <span className={`badge ${diffBadgeClass}`}>
                          {p.difficulty}
                        </span>
                        <span className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>
                          {p.topic}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        Platform: {p.platform} • Solved: {p.solvedAt} • {p.timeSpentMins || 30} mins logged
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      Inspect <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Slide-Over Drawer for Problem Inspection & Spaced Repetition */}
      {inspectProblem && (
        <div className="drawer-backdrop" onClick={() => setInspectProblem(null)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-cyan">Problem Dossier</span>
              </div>
              <button onClick={() => setInspectProblem(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span className={`badge ${inspectProblem.difficulty.toLowerCase() === 'easy' ? 'badge-emerald' : inspectProblem.difficulty.toLowerCase() === 'hard' ? 'badge-rose' : 'badge-amber'}`} style={{ marginBottom: '8px' }}>
                  {inspectProblem.difficulty}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {inspectProblem.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Platform: {inspectProblem.platform} • Topic: {inspectProblem.topic}
                </div>
              </div>

              <div style={{
                background: '#F0F7F1',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>✓ Solved & Benchmark Logged</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Time Spent:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{inspectProblem.timeSpentMins || 30} Minutes</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Logged At:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{inspectProblem.solvedAt}</strong>
                </div>
              </div>

              {inspectProblem.url && (
                <a
                  href={inspectProblem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ExternalLink size={15} />
                  <span>Open on {inspectProblem.platform}</span>
                </a>
              )}

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  48-Hour Spaced Repetition
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                  Schedule this problem into your revision queue to review the optimal space & time complexity before mock interviews.
                </p>
                <button
                  onClick={() => handleMarkRevision(inspectProblem)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <BookMarked size={15} />
                  <span>Schedule Spaced Revision</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
