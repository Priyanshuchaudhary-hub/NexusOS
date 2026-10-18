import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  signUpWithEmail, 
  isFirebaseConfigured 
} from '../../firebase/config';
import { 
  ShieldCheck, 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const AuthModal = () => {
  const { activeModal, setActiveModal, showToast, triggerConfetti, handleFirebaseUserLogin } = useNexus();
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'auth') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'auth') return null;

  const hasConfig = isFirebaseConfigured();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      if (!hasConfig) {
        // Demo Firebase Google Auth
        handleFirebaseUserLogin({
          uid: 'demo-google-uid-101',
          displayName: 'Aarav Sharma (Google User)',
          email: 'aarav.sharma@nit.edu.in',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          provider: 'google.com'
        });
        triggerConfetti();
        setActiveModal(null);
        showToast('Connected via Google Auth! 🚀', 'Successfully signed in with Google credentials.', 'success');
        return;
      }

      const user = await loginWithGoogle();
      handleFirebaseUserLogin({
        uid: user.uid,
        displayName: user.displayName || 'Nexus Scholar',
        email: user.email,
        photoURL: user.photoURL,
        provider: 'google.com'
      });
      triggerConfetti();
      setActiveModal(null);
      showToast('Welcome back!', `Signed in as ${user.displayName || user.email}`, 'success');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (!hasConfig) {
        const name = displayName.trim() || email.split('@')[0] || 'Nexus Scholar';
        handleFirebaseUserLogin({
          uid: `demo-email-${Date.now()}`,
          displayName: name,
          email: email.trim(),
          photoURL: null,
          provider: 'password'
        });
        triggerConfetti();
        setActiveModal(null);
        showToast(
          tab === 'signin' ? 'Signed In!' : 'Account Created!',
          `Signed in as ${email}. (Demo Auth active - add Firebase keys in .env for live sync)`,
          'success'
        );
        return;
      }

      if (tab === 'signin') {
        const user = await loginWithEmail(email, password);
        handleFirebaseUserLogin({
          uid: user.uid,
          displayName: user.displayName || email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL,
          provider: 'password'
        });
        triggerConfetti();
        setActiveModal(null);
        showToast('Signed In Successfully', `Welcome back, ${user.displayName || user.email}!`, 'success');
      } else {
        const user = await signUpWithEmail(email, password, displayName);
        handleFirebaseUserLogin({
          uid: user.uid,
          displayName: displayName.trim() || email.split('@')[0],
          email: user.email,
          photoURL: null,
          provider: 'password'
        });
        triggerConfetti();
        setActiveModal(null);
        showToast('Account Created! 🎉', 'Welcome to NexusOS! Your profile is ready.', 'success');
      }
    } catch (err) {
      console.error(err);
      let msg = err.message || 'Authentication error';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '480px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} /> Firebase Authentication
            </span>
          </div>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {tab === 'signin' ? 'Sign in to NexusOS' : 'Create your Student Account'}
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Sync your study streaks, roadmaps, and classroom assignments across devices.
          </p>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-secondary)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => { setTab('signin'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: tab === 'signin' ? 'var(--accent-primary)' : 'transparent',
              color: tab === 'signin' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.15s ease'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: tab === 'signup' ? 'var(--accent-primary)' : 'transparent',
              color: tab === 'signup' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.15s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{
            padding: '12px 14px',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#B91C1C',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google One-Click CTA */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '11px',
            fontSize: '0.875rem',
            justifyContent: 'center',
            marginBottom: '16px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '16px 0',
          color: 'var(--text-muted)',
          fontSize: '0.75rem'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span>OR WITH EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tab === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Full Name:
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Aarav Sharma"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                />
                <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              College or Personal Email:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="input-field"
                placeholder="student@nit.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
              <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
              <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '11px', marginTop: '6px', justifyContent: 'center' }}
          >
            {loading ? 'Authenticating...' : (tab === 'signin' ? 'Sign In to NexusOS' : 'Create Free Account')}
          </button>
        </form>
      </div>
    </div>
  );
};
