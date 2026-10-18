import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Crown, Check, X, ShieldCheck, Zap, Sparkles, CreditCard } from 'lucide-react';

export const UpgradeModal = () => {
  const { activeModal, setActiveModal, upgradePlan, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'upgrade') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'upgrade') return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradePlan('Premium');
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" style={{ maxWidth: '740px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Crown size={12} /> NexusOS Placement Edition
            </span>
          </div>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {isHinglish ? 'Apni Placement Prep ko Uncapped Banao' : 'Accelerate Your SDE Preparation'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '6px', maxWidth: '540px', margin: '6px auto 0', lineHeight: 1.5 }}>
            {isHinglish
              ? 'PRD 7.6 & 12: Unlimited AI replans, multiple classroom accounts, unlimited goal roadmaps, aur weekly performance intelligence.'
              : 'PRD Section 12 Monetization: Zero artificial constraints on your adaptive schedule, unlimited roadmap generation, and advanced reports.'}
          </p>

          {/* Billing Cycle Toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            marginTop: '18px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '7px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: billingCycle === 'monthly' ? 'var(--accent-primary)' : 'transparent',
                color: billingCycle === 'monthly' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Monthly (₹149/mo)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '7px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: billingCycle === 'annual' ? 'var(--accent-primary)' : 'transparent',
                color: billingCycle === 'annual' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Annual (₹999/yr) <span style={{ color: billingCycle === 'annual' ? '#DDF5E5' : '#166534', fontSize: '0.7rem', fontWeight: 700 }}>• SAVE 45%</span>
            </button>
          </div>
        </div>

        {/* Comparison Tier Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '18px', marginBottom: '24px' }}>
          {/* Free Tier */}
          <div className="glass-panel" style={{ padding: '22px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>FREE SCHOLAR</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0' }}>₹0</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>For occasional task tracking</div>

            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> 2 Active Goal Roadmaps</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> 5 AI Replans per month</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> 1 Google Classroom account</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> Basic DSA problem logger</li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel" style={{
            padding: '22px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7F1 100%)',
            border: '2px solid var(--accent-primary)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-11px',
              right: '20px',
              background: 'linear-gradient(135deg, #22A06B, #16A34A)',
              color: '#ffffff',
              fontSize: '0.675rem',
              fontWeight: 800,
              padding: '2px 10px',
              borderRadius: '999px',
              letterSpacing: '0.04em'
            }}>
              RECOMMENDED
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary-dark)' }}>PLACEMENT PRO</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0' }}>
              {billingCycle === 'monthly' ? '₹149' : '₹999'}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                {billingCycle === 'monthly' ? '/month' : '/year'}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#166534', marginBottom: '16px', fontWeight: 600 }}>For serious placement candidates</div>

            <ul style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={15} color="var(--accent-amber)" /> <strong>Unlimited</strong> AI Goals & Milestones</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={15} color="var(--accent-amber)" /> <strong>Unlimited</strong> Adaptive AI Replans</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> Multi-account Classroom Sync</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> Sunday AI Performance Diagnostics</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={15} color="var(--accent-primary)" /> Priority placement mock interview blocks</li>
            </ul>
          </div>
        </div>

        {/* Checkout Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="var(--accent-primary)" />
            <span>Secure 256-bit checkout • Instant UPI & Credit/Debit Card activation</span>
          </div>

          <div className="modal-actions-bar" style={{ marginTop: 0 }}>
            <button onClick={() => setActiveModal(null)} className="btn btn-secondary">
              Later
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ padding: '9px 22px' }}
            >
              <CreditCard size={15} />
              <span>{isProcessing ? 'Simulating Razorpay...' : `Pay ${billingCycle === 'monthly' ? '₹149' : '₹999'} & Upgrade`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
