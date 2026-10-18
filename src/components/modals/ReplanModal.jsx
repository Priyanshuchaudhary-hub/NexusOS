import React, { useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Sparkles, AlertTriangle, ArrowRight, X, Clock, Calendar, Check } from 'lucide-react';

export const ReplanModal = () => {
  const { 
    activeModal, 
    setActiveModal, 
    replanProposal, 
    applyReplanOption, 
    data 
  } = useNexus();

  const isHinglish = data.user.preferredLanguage === 'hinglish';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'replan') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'replan' || !replanProposal) return null;

  const { task, userReason, explanation, options } = replanProposal;

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '680px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={12} /> {isHinglish ? 'AI Replan Proposal' : 'Adaptive Replan Required'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Deterministic Schedule Engine
              </span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHinglish ? 'Schedule Smartly Adjust Karein?' : 'Optimize Your Daily Schedule?'}
            </h3>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="btn btn-ghost"
            style={{ padding: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Trigger Context */}
        <div style={{
          padding: '14px 18px',
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '16px',
          fontSize: '0.85rem'
        }}>
          <div style={{ color: '#B91C1C', fontWeight: 600 }}>
            {isHinglish ? 'Task Jisme Delay Aaya:' : 'Impacted Task:'} <strong>{task.title}</strong>
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Reason: {userReason}
          </div>
        </div>

        {/* AI Explanation */}
        <div style={{
          padding: '16px 18px',
          background: 'var(--bg-accent-soft)',
          borderLeft: '4px solid var(--accent-primary)',
          borderTop: '1px solid var(--border-accent)',
          borderRight: '1px solid var(--border-accent)',
          borderBottom: '1px solid var(--border-accent)',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '0.85rem',
          color: 'var(--text-main)',
          lineHeight: 1.5
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
            <Sparkles size={14} /> {isHinglish ? 'AI Coach Explanation:' : 'AI Coach Reasoning:'}
          </div>
          {explanation}
        </div>

        {/* 3 Actionable Options */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
            {isHinglish ? '3 Options Mein Se Ek Chuniye (User Confirms):' : 'Select an Adaptive Option:'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt, idx) => (
              <div
                key={opt.id}
                onClick={() => applyReplanOption(opt)}
                className="glass-panel"
                style={{
                  padding: '18px',
                  cursor: 'pointer',
                  border: idx === 0 ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: idx === 0 ? 'var(--bg-accent-soft)' : '#FFFFFF',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      Option {idx + 1} {idx === 0 && '• Recommended'}
                    </span>
                    <span style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {opt.title}
                    </span>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.75rem' }}>
                    Accept <ArrowRight size={13} />
                  </button>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {opt.details}
                </p>

                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#16A34A', fontWeight: 600 }}>
                  Impact: {opt.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={() => setActiveModal(null)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            {isHinglish ? 'Ignore Karein (Discard)' : 'Discard Proposal'}
          </button>
        </div>
      </div>
    </div>
  );
};
