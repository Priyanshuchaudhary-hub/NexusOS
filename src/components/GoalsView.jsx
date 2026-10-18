import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { 
  Sparkles, 
  Target, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Plus, 
  Layers, 
  AlertCircle,
  Crown,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';

export const GoalsView = () => {
  const { data, setActiveModal } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [expandedGoalId, setExpandedGoalId] = useState(data.goals[0]?.id || null);

  // Overview metrics derived from real data
  const totalGoals = data.goals.length;
  const totalMilestones = data.goals.reduce((acc, g) => acc + g.milestones.length, 0);
  const completedMilestones = data.goals.reduce((acc, g) => 
    acc + g.milestones.filter(m => m.status === 'completed').length, 0);
  const totalWeeklyHours = data.goals.reduce((acc, g) => acc + (g.hoursPerWeek || 0), 0);
  const overallProgressPct = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const toggleExpand = (goalId) => {
    setExpandedGoalId(prev => prev === goalId ? null : goalId);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 0' }}>
      {/* Page Header */}
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
              <Sparkles size={12} /> {isHinglish ? 'AI Milestone Engine' : 'AI Goal Engine'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {totalGoals} Active Roadmaps Configured
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {isHinglish ? 'Goals aur AI Roadmaps' : 'Goals & Roadmaps'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '720px', marginTop: '6px', lineHeight: 1.5 }}>
            {isHinglish 
              ? 'Turn ambitious goals into focused, measurable progress. AI deterministic constraints ke hisaab se 4-12 hafte ke actionable milestones aur daily tasks generate karta hai.'
              : 'Turn ambitious goals into focused, measurable progress. AI synthesizes 4-12 week structured sprints tailored around university exam schedules.'}
          </p>
        </div>

        <button
          onClick={() => setActiveModal('addGoal')}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' }}
        >
          <Sparkles size={16} />
          <span>{isHinglish ? 'AI ke saath Naya Goal' : 'Synthesize AI Goal'}</span>
        </button>
      </div>

      {/* Goal Overview Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Roadmaps</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
            {totalGoals}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Continuous tracking</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Completed Milestones</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
            {completedMilestones} / {totalMilestones}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{overallProgressPct}% sprint velocity</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Weekly Commitment</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
            {totalWeeklyHours} hrs/wk
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Across active goals</div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Average Target Date</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '4px' }}>
            Jan 2027
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SDE Placement Season</div>
        </div>
      </div>

      {/* Free Plan Limit Notice (Informative & Non-Intrusive) */}
      {data.user.plan === 'Free' && data.goals.length >= 2 && (
        <div className="glass-panel animate-fade-in" style={{
          padding: '16px 22px',
          marginBottom: '24px',
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={20} color="#D97706" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400E' }}>
                Free-Tier Limit Reached (2 Active Roadmaps)
              </div>
              <div style={{ fontSize: '0.775rem', color: '#78350F', marginTop: '2px' }}>
                Your current plan allows 2 active goal roadmaps simultaneously. Upgrade to Placement Pro (₹149/mo) for unlimited concurrent roadmaps and deep weekly milestone AI.
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveModal('upgrade')} 
            className="btn btn-amber" 
            style={{ fontSize: '0.8rem', padding: '6px 16px' }}
          >
            <Crown size={14} /> Upgrade Plan
          </button>
        </div>
      )}

      {/* Goals & Roadmaps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.goals.map((goal, gIdx) => {
          const completedCount = goal.milestones.filter(m => m.status === 'completed').length;
          const inProgressMilestone = goal.milestones.find(m => m.status === 'in-progress');
          const progressPercent = Math.round((completedCount / goal.milestones.length) * 100);
          const isExpanded = expandedGoalId === goal.id;

          return (
            <div 
              key={goal.id} 
              className={`glass-panel motionsites-card animate-fade-in stagger-${Math.min(gIdx + 1, 5)}`}
              style={{ 
                padding: '26px 30px', 
                borderTop: `4px solid ${goal.color || 'var(--accent-primary)'}`,
                background: '#FFFFFF'
              }}
            >
              {/* Goal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: '#EAF8EE', color: '#166534', border: '1px solid #BEE8CD' }}>
                      {goal.category}
                    </span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                      {goal.priority.toUpperCase()} PRIORITY
                    </span>
                    {inProgressMilestone && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                        Active: {inProgressMilestone.week}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {goal.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <Clock size={15} color="var(--accent-primary)" />
                    <span>{goal.hoursPerWeek} hrs/week</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={15} color="var(--accent-emerald)" />
                    <span>Target: {goal.targetDate}</span>
                  </div>
                  <button 
                    onClick={() => toggleExpand(goal.id)}
                    className="btn btn-ghost"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                  >
                    <span>{isExpanded ? 'Collapse' : 'Inspect Milestones'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Progress Bar with Sheen */}
              <div style={{ marginBottom: isExpanded ? '24px' : '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Roadmap Progression ({completedCount}/{goal.milestones.length} milestones conquered)
                  </span>
                  <span style={{ color: goal.color || 'var(--accent-primary)', fontWeight: 700 }}>{progressPercent}%</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: '#EAF8EE', borderRadius: '999px', overflow: 'hidden' }} className="progress-sheen">
                  <div style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: goal.color || 'var(--accent-primary)',
                    borderRadius: '999px',
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
              </div>

              {/* Collapsible Roadmap Timeline Visualization */}
              {isExpanded && (
                <div className="animate-fade-in" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                  <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
                    Structured Sprint Progression
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                    {goal.milestones.map((m, mIdx) => {
                      const isDone = m.status === 'completed';
                      const isInProgress = m.status === 'in-progress';

                      return (
                        <div
                          key={m.id}
                          style={{
                            background: isDone 
                              ? '#EAF8EE' 
                              : isInProgress 
                              ? '#DDF5E5' 
                              : '#F8FAF8',
                            border: isDone 
                              ? '1px solid #BEE8CD' 
                              : isInProgress 
                              ? '1px solid #A8E3BD' 
                              : '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '12px',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ 
                                fontSize: '0.725rem', 
                                fontWeight: 700, 
                                color: isDone ? 'var(--accent-emerald)' : isInProgress ? '#166534' : 'var(--text-muted)' 
                              }}>
                                Phase {mIdx + 1} • {m.week}
                              </span>
                              {isDone ? (
                                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                              ) : isInProgress ? (
                                <span className="badge badge-indigo" style={{ fontSize: '0.6rem' }}>Current Sprint</span>
                              ) : (
                                <Circle size={15} color="var(--text-muted)" />
                              )}
                            </div>

                            <div style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: isDone ? 'var(--text-muted)' : 'var(--text-main)',
                              lineHeight: 1.4
                            }}>
                              {m.title}
                            </div>
                          </div>

                          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                            Status: <strong style={{ color: isDone ? 'var(--accent-emerald)' : isInProgress ? '#166534' : 'var(--text-muted)' }}>
                              {m.status.toUpperCase()}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
