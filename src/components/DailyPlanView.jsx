import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  BookOpen, 
  Code2, 
  Layers, 
  Flame,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Target,
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const DailyPlanView = () => {
  const { 
    data, 
    currentUser,
    completeTask, 
    markTaskStatus, 
    setActiveModal, 
    syncClassroom,
    setActiveTab
  } = useNexus();

  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const studentName = currentUser?.displayName || data.user.name || 'Scholar';
  const firstName = studentName.split(' ')[0];

  // Calculated Real Metrics
  const totalTasks = data.tasks.length;
  const completedTasksCount = data.tasks.filter(t => t.status === 'done').length;
  const pendingTasksCount = totalTasks - completedTasksCount;
  const totalMinutes = data.tasks.reduce((sum, t) => sum + (t.estMinutes || 0), 0);
  const completedMinutes = data.tasks
    .filter(t => t.status === 'done')
    .reduce((sum, t) => sum + (t.estMinutes || 0), 0);

  const completionPct = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
  const upcomingDeadlinesCount = data.classroom.assignments.filter(a => a.status === 'assigned').length;

  const animatedTotalMin = useAnimatedCounter(totalMinutes);
  const animatedCompletedMin = useAnimatedCounter(completedMinutes);
  const animatedCompletionPct = useAnimatedCounter(completionPct);
  const animatedStreak = useAnimatedCounter(data.user.streakDays);

  // Recommended Next Action (Top pending task)
  const nextActionTask = data.tasks.find(t => t.status !== 'done' && t.priority === 'critical') || 
                         data.tasks.find(t => t.status !== 'done') || null;

  const filteredTasks = data.tasks.filter(t => {
    if (filter === 'pending') return t.status !== 'done';
    if (filter === 'completed') return t.status === 'done';
    return true;
  });

  const getCategoryBadge = (category, source) => {
    if (source === 'classroom') {
      return (
        <span className="badge badge-emerald">
          <BookOpen size={11} /> Google Classroom
        </span>
      );
    }
    if (category === 'DSA') {
      return (
        <span className="badge badge-cyan">
          <Code2 size={11} /> DSA Practice
        </span>
      );
    }
    return (
      <span className="badge badge-indigo">
        <Layers size={11} /> {category}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 0' }}>
      {/* 1. Primary Page Header: Title, Date & Greeting */}
      <div 
        className="glass-panel motionsites-card animate-fade-in" 
        style={{
          padding: 'clamp(18px, 4vw, 28px) clamp(16px, 4vw, 32px)',
          marginBottom: '20px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '0',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 160, 107, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-indigo">
              <Sparkles size={12} /> Today's Command Center
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Thursday, 15 October 2026
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
            Good morning, {firstName}.
          </h1>

          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: '#166534', marginTop: '4px' }}>
            Build momentum today.
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '680px', marginTop: '6px', lineHeight: 1.5 }}>
            All your deadlines, goals, and study tasks in one place. Your daily plan adapts quickly whenever college assignments change.
          </p>
        </div>
      </div>

      {/* 2. Secondary Metrics Strip: Daily Progress, Upcoming Deadlines, Streak, Planned Focus */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Streak Indicator (Secondary) */}
        <div className="glass-panel motionsites-card flame-animated" style={{ padding: '18px 20px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Consistency Streak
            </span>
            <Flame size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-main)' }}>
            {animatedStreak} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Consecutive Days</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-emerald)', marginTop: '4px' }}>
            ✓ Streak active • Solve 1 DSA to maintain
          </div>
        </div>

        {/* Daily Progress Meter (Secondary) */}
        <div className="glass-panel motionsites-card" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Day Completion
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {animatedCompletionPct}%
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-main)' }}>
            {completedTasksCount} / {totalTasks} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Tasks Done</span>
          </div>
          {/* Progress sheen */}
          <div style={{ height: '6px', width: '100%', background: '#EAF8EE', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: '10px' }} className="progress-sheen">
            <div style={{
              height: '100%',
              width: `${completionPct}%`,
              background: 'linear-gradient(90deg, #22A06B, #16A34A)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Planned Focus Time (Secondary) */}
        <div className="glass-panel motionsites-card" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Planned Focus Time
            </span>
            <Clock size={16} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-main)' }}>
            {Math.round(animatedTotalMin / 60 * 10) / 10}h <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>({animatedTotalMin}m)</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {animatedCompletedMin}m completed today
          </div>
        </div>

        {/* Upcoming Deadlines (Secondary) */}
        <div className="glass-panel motionsites-card" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Classroom Deadlines
            </span>
            <BookOpen size={16} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: upcomingDeadlinesCount > 0 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>
            {upcomingDeadlinesCount} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Submissions Due</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Next: CS301 OS (Tomorrow 11:59 PM)
          </div>
        </div>
      </div>

      {/* 3. Hero Focus Panel (Recommended Next Action) */}
      {nextActionTask && (
        <div 
          className="glass-panel animate-fade-in stagger-1 hero-action-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #BEE8CD',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flex: '1 1 280px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-sm)',
              background: '#DDF5E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              flexShrink: 0
            }}>
              <Target size={22} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-indigo">
                  Recommended Next Action
                </span>
                {nextActionTask.priority === 'critical' && (
                  <span className="badge badge-rose">
                    Critical Deadline
                  </span>
                )}
                {nextActionTask.dueTime && (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-amber)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Due: {nextActionTask.dueTime}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px', wordBreak: 'break-word' }}>
                {nextActionTask.title}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Estimated: {nextActionTask.estMinutes} mins • {nextActionTask.courseName || nextActionTask.category}
              </div>
            </div>
          </div>

          <div className="hero-action-buttons">
            <button
              onClick={() => completeTask(nextActionTask.id)}
              className="btn btn-primary"
            >
              <CheckCircle2 size={15} />
              <span>Mark Complete</span>
            </button>
            <button
              onClick={() => markTaskStatus(nextActionTask.id, 'missed', 'College schedule clash')}
              className="btn btn-secondary"
              title="Reshuffle with AI Replanner"
            >
              <RotateCcw size={15} />
              <span>Replan</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Bento Dashboard Layout */}
      <div className="daily-dashboard-grid">
        {/* Left Column: Tasks List & Controls */}
        <div>
          <h2 className="sr-only">Today's Focus Tasks</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div className="motionsites-pill-container">
              {['all', 'pending', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`motionsites-pill-btn ${filter === f ? 'active' : ''}`}
                >
                  {f === 'all' && (isHinglish ? 'Sabhi Tasks' : 'All Tasks')}
                  {f === 'pending' && (isHinglish ? `Pending (${pendingTasksCount})` : `Pending (${pendingTasksCount})`)}
                  {f === 'completed' && (isHinglish ? `Done (${completedTasksCount})` : `Done (${completedTasksCount})`)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveModal('addTask')}
              className="btn btn-primary"
            >
              <Plus size={14} />
              <span>{isHinglish ? 'Naya Task' : 'Add Task'}</span>
            </button>
          </div>

          {/* Tasks Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredTasks.length === 0 ? (
              <div className="glass-panel animate-fade-in" style={{ padding: '50px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <CalendarCheck size={42} color="var(--accent-primary)" style={{ margin: '0 auto 12px', opacity: 0.8 }} />
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {isHinglish ? 'Is filter mein koi task nahi hai.' : 'No tasks in this category.'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {filter === 'completed' ? 'Complete your focus tasks to see them logged here.' : 'All pending tasks have been completed!'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task, index) => {
                const isDone = task.status === 'done';
                return (
                  <div
                    key={task.id}
                    className={`glass-panel glass-panel-interactive animate-fade-in stagger-${Math.min(index + 1, 6)}`}
                    style={{
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      borderLeft: isDone 
                        ? '4px solid var(--accent-emerald)' 
                        : task.priority === 'critical'
                        ? '4px solid var(--accent-rose)'
                        : '4px solid var(--accent-primary)',
                      opacity: isDone ? 0.78 : 1,
                      backgroundColor: isDone ? '#F8FAF8' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', minWidth: 0, flex: '1 1 180px' }}>
                        {/* Checkbox trigger */}
                        <button
                          onClick={() => completeTask(task.id)}
                          className={`task-checkbox ${isDone ? 'checked' : ''}`}
                          style={{ marginTop: '2px', flexShrink: 0 }}
                          title={isDone ? 'Mark as incomplete' : 'Mark as done'}
                        >
                          {isDone && <CheckCircle2 size={15} color="#ffffff" />}
                        </button>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: 'var(--text-base)',
                              fontWeight: 600,
                              color: isDone ? 'var(--text-muted)' : 'var(--text-main)',
                              textDecoration: isDone ? 'line-through' : 'none',
                              transition: 'all var(--transition-fast)',
                              wordBreak: 'break-word'
                            }}>
                              {task.title}
                            </span>
                            {getCategoryBadge(task.category, task.source)}
                            {task.priority === 'critical' && (
                              <span className="badge badge-rose" style={{ fontSize: 'var(--text-xs)' }}>
                                🔥 High Deadline
                              </span>
                            )}
                          </div>

                          {task.notes && (
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px', wordBreak: 'break-word' }}>
                              💡 {task.notes}
                            </div>
                          )}

                          {task.courseName && (
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-emerald)', marginTop: '3px', wordBreak: 'break-word' }}>
                              📚 Connected to {task.courseName}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Estimated Time & Due */}
                      <div className="task-item-time" style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', justifyContent: 'flex-end' }}>
                          <Clock size={13} />
                          <span>{task.estMinutes} mins</span>
                        </div>
                        {task.dueTime && (
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-amber)', marginTop: '2px', fontWeight: 600 }}>
                            Due: {task.dueTime}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Check-in Action Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '10px',
                      marginTop: '4px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        {isHinglish ? 'Daily Check-in:' : 'Check-in Action:'}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {/* Done */}
                        <button
                          onClick={() => markTaskStatus(task.id, 'done')}
                          className={`btn btn-sm ${isDone ? 'btn-primary' : 'btn-secondary'}`}
                        >
                          <CheckCircle2 size={13} />
                          <span>{isHinglish ? 'Ho Gaya' : 'Done'}</span>
                        </button>

                        {/* Partial */}
                        <button
                          onClick={() => markTaskStatus(task.id, 'partial', 'Partial progress made')}
                          className="btn btn-sm btn-warning-subtle"
                        >
                          <span>{isHinglish ? 'Aadha Hua' : 'Partial'}</span>
                        </button>

                        {/* Missed -> Triggers AI Replan */}
                        <button
                          onClick={() => markTaskStatus(task.id, 'missed', 'College assignment clash')}
                          className="btn btn-sm btn-danger-subtle"
                        >
                          <AlertTriangle size={13} />
                          <span>{isHinglish ? 'Miss Ho Gaya (Replan)' : 'Missed (AI Replan)'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Contextual Sidebars (Countdown, AI Replanner, Classroom Deadlines) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 className="sr-only">Productivity Tools and Academic Deadlines</h2>
          {/* Contextual Widget: Internship Countdown Card */}
          <div className="glass-panel motionsites-card animate-fade-in stagger-2" style={{
            padding: '18px 20px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-cyan" style={{ fontSize: 'var(--text-xs)' }}>
                <Calendar size={12} /> Contextual Milestone
              </span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--accent-primary)' }}>
                48 Days Left
              </span>
            </div>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-main)' }}>
              Summer SDE Internship Season
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Target: Jan 15, 2027 • 148 / 250 DSA Problems Benchmark
            </div>
            <button
              onClick={() => setActiveTab('dsa')}
              className="btn btn-ghost btn-sm"
              style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View DSA Roadmap</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* AI Adaptive Replanner Card */}
          <div className="glass-panel motionsites-card animate-fade-in stagger-3" style={{ padding: '22px', border: '1px solid #BEE8CD', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={18} color="var(--accent-primary)" />
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-main)' }}>
                Adaptive AI Replanner
              </h3>
            </div>
            
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#166534', marginBottom: '4px' }}>
              Your plan, intelligently adjusted.
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Catch schedule clashes and reshuffle your tasks when plans change. Stay on track and protect your target dates without stress.
            </p>

            <div style={{
              background: '#F0F7F1',
              border: '1px solid var(--border-subtle)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              margin: '14px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Monthly Quota:
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {data.user.plan === 'Free' ? `${data.user.replansUsedThisMonth} of ${data.user.replansLimit} used` : 'Unlimited ⚡'}
                </div>
              </div>

              {data.user.plan === 'Free' && (
                <button 
                  onClick={() => setActiveModal('upgrade')}
                  className="btn btn-sm btn-warning-subtle"
                >
                  Uncap with Pro
                </button>
              )}
            </div>

            <button
              onClick={() => {
                const target = data.tasks.find(t => t.status !== 'done') || data.tasks[0];
                markTaskStatus(target.id, 'missed', 'Exam / Assignment overlap');
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <RotateCcw size={14} />
              <span>{isHinglish ? 'Simulate AI Replan' : 'Trigger AI Replan'}</span>
            </button>
          </div>

          {/* Google Classroom Live Integration Peek */}
          <div className="glass-panel motionsites-card animate-fade-in stagger-4" style={{ padding: '22px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={17} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Classroom Deadlines</h3>
              </div>
              <button 
                onClick={syncClassroom}
                className="btn btn-ghost btn-sm" 
                title="Sync now"
                aria-label="Sync classroom deadlines"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.classroom.assignments.map(a => (
                <div key={a.id} style={{
                  padding: '12px 14px',
                  background: '#F8FAF8',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 'var(--text-xs)',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="hover:border-green-300"
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{a.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: '4px' }}>
                    <span>{a.courseName.split(':')[0]}</span>
                    <span style={{ color: a.status === 'turned_in' ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 600 }}>
                      {a.status === 'turned_in' ? '✓ Turned In' : a.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('classroom')}
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
            >
              <span>View Classroom Hub</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
