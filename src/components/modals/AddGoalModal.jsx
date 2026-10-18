import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Sparkles, X, Target, Clock, Calendar, ShieldCheck } from 'lucide-react';

export const AddGoalModal = () => {
  const { activeModal, setActiveModal, addGoalWithAI, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Placement');
  const [targetDate, setTargetDate] = useState('2027-02-15');
  const [hoursPerWeek, setHoursPerWeek] = useState('12');
  const [priority, setPriority] = useState('high');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'addGoal') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'addGoal') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      addGoalWithAI({
        title,
        category,
        targetDate,
        hoursPerWeek,
        priority,
        color: category === 'Placement' ? '#22A06B' : category === 'Projects' ? '#16A34A' : '#15803D'
      });
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald">
                <Sparkles size={12} /> AI Milestones Synthesizer
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHinglish ? 'Naya Goal aur AI Roadmap Banayein' : 'Create New Goal & AI Roadmap'}
            </h3>
          </div>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          {isHinglish
            ? 'PRD 7.1: Free-text ya structured goal dalein. AI 4-12 hafte ke milestones aur weekly study load generate karega.'
            : 'PRD Section 7.1: Provide high-level goal constraints. AI synthesizes a 4-12 week milestone roadmap tailored to your semester capacity.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Goal Title / Objective:
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g. Master System Design & LLD for Tier-1 Off-Campus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Category:
              </label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Placement">Placement / SDE</option>
                <option value="Projects">AI / Engineering Project</option>
                <option value="Academics">College Academics / CGPA</option>
                <option value="Core CS">Core CS (OS/DBMS/CN)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Priority:
              </label>
              <select
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High Priority</option>
                <option value="critical">Critical Deadline</option>
                <option value="medium">Medium Priority</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Target Completion Date:
              </label>
              <input
                type="date"
                required
                className="input-field"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Available Hours / Week:
              </label>
              <input
                type="number"
                min="2"
                max="40"
                className="input-field"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isGenerating}
              className="btn btn-primary"
            >
              <Sparkles size={15} />
              <span>{isGenerating ? 'Generating Milestones...' : 'Synthesize AI Milestones'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
