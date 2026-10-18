import React, { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  BarChart3, 
  FileText,
  Plus,
  Menu,
  X,
  LogOut,
  User,
  ShieldCheck,
  Search,
  Settings,
  Layers,
  ChevronDown,
  Globe,
  Flame,
  Crown
} from 'lucide-react';

export const Navbar = ({ onOpenCommandPalette }) => {
  const { 
    data, 
    currentUser, 
    handleFirebaseUserLogout, 
    isFirebaseConfigured, 
    activeTab, 
    setActiveTab, 
    toggleLanguage, 
    setActiveModal 
  } = useNexus();

  const isHinglish = data.user.preferredLanguage === 'hinglish';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Primary Navigation Items
  const navItems = [
    { id: 'daily', label: isHinglish ? 'Aaj Ka Plan' : "Today's Plan", icon: CheckCircle2 },
    { id: 'goals', label: isHinglish ? 'Goals & Roadmaps' : 'Goals & Roadmaps', icon: Sparkles },
    { id: 'classroom', label: 'Classroom Hub', icon: BookOpen },
    { id: 'dsa', label: 'DSA Tracker', icon: Code2, badge: 'SDE' },
    { id: 'report', label: isHinglish ? 'Weekly Report' : 'Weekly Report', icon: BarChart3 },
    { id: 'analysis', label: 'PRD Analysis', icon: FileText, badge: 'PRD' },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#FFFFFF',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: '0 1px 3px rgba(23, 33, 27, 0.05)',
      padding: '10px 24px',
      transition: 'all var(--transition-base)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left: Brand Identity & Primary Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {/* Logo & Product Brand */}
          <div 
            onClick={() => setActiveTab('daily')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title="NexusOS Workspace"
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #22A06B, #16A34A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(34, 160, 107, 0.3)',
              transition: 'transform var(--transition-fast)'
            }}
            className="hover:scale-105"
            >
              <Sparkles size={19} color="#ffffff" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                Nexus<span style={{ color: 'var(--accent-primary)' }}>OS</span>
              </span>
              <span className="badge badge-indigo" style={{ fontSize: 'var(--text-xs)', padding: '2px 8px' }}>
                Student OS
              </span>
            </div>
          </div>

          {/* Primary Nav Links (Desktop) */}
          <nav 
            aria-label="Main Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }} 
            className="desktop-nav-links"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-tab-button ${isActive ? 'active' : ''}`}
                >
                  <Icon size={15} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`badge ${isActive ? 'badge-indigo' : 'badge-cyan'}`} style={{ fontSize: 'var(--text-xs)', padding: '1px 6px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center / Right: Primary Action, Command Search & Account Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Command Palette Trigger (Primary Utility) */}
          <button
            onClick={onOpenCommandPalette}
            className="glass-panel desktop-cmd-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              background: '#F0F7F1',
              fontSize: 'var(--text-sm)'
            }}
            title="Open Command Palette (Ctrl+K or Cmd+K)"
          >
            <Search size={14} color="var(--accent-primary)" />
            <span>Search or jump...</span>
            <kbd style={{
              background: '#EAF8EE',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              color: '#166534',
              border: '1px solid #BEE8CD',
              fontWeight: 600
            }}>
              ⌘K
            </kbd>
          </button>

          {/* Primary Action Button */}
          <button 
            onClick={() => setActiveModal('addTask')}
            className="btn btn-primary"
          >
            <Plus size={15} />
            <span>{isHinglish ? 'Task Jodo' : 'Add Task'}</span>
          </button>

          {/* Account Profile & System Dropdown (All Account-related features encapsulated cleanly) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="glass-panel"
              aria-label="Account menu and settings"
              aria-haspopup="menu"
              aria-expanded={profileDropdownOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px 4px 5px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                background: '#F0F7F1',
                fontSize: 'var(--text-xs)'
              }}
              title="Account Menu & System Preferences"
            >
              {/* User Avatar / Initials */}
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User profile"}
                  style={{ width: '26px', height: '26px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                />
              ) : (
                <div 
                  aria-hidden="true"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#15803D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}
                >
                  {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : data.user.name[0]}
                </div>
              )}

              {/* Minimalist Streak indicator embedded in user pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }} title={`${data.user.streakDays} Day Consistency Streak`}>
                <Flame size={14} color="#D97706" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-main)' }}>
                  {data.user.streakDays}
                </span>
              </div>

              <ChevronDown size={13} color="var(--text-muted)" />
            </button>

            {/* Encapsulated Account Menu Dropdown */}
            {profileDropdownOpen && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '260px',
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 12px 36px -4px rgba(23, 33, 27, 0.12)',
                  zIndex: 200,
                  animation: 'fadeSlideUp 150ms var(--ease-out-expo)'
                }}
              >
                {/* User Info Header */}
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-main)' }}>
                    {currentUser?.displayName || data.user.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px', wordBreak: 'break-all' }}>
                    {currentUser?.email || data.classroom.accountEmail}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {data.user.college} ({data.user.year})
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span className={`badge ${data.user.plan === 'Free' ? 'badge-amber' : 'badge-emerald'}`}>
                      {data.user.plan} Plan
                    </span>
                    {data.user.plan === 'Free' && (
                      <button 
                        onClick={() => { setActiveModal('upgrade'); setProfileDropdownOpen(false); }}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--accent-amber)' }}
                      >
                        <Crown size={12} /> Upgrade
                      </button>
                    )}
                  </div>
                </div>

                {/* Account-Related Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  {/* Language Toggle Inside Menu */}
                  <button
                    onClick={toggleLanguage}
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={15} color="var(--accent-primary)" />
                      <span>Language Mode</span>
                    </div>
                    <span className="badge badge-indigo" style={{ fontSize: 'var(--text-xs)' }}>
                      {isHinglish ? 'Hinglish 🇮🇳' : 'English 🌐'}
                    </span>
                  </button>

                  {/* Settings Link */}
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Settings size={15} />
                    <span>Account Settings</span>
                  </button>

                  {/* Public Overview / Landing Page Link */}
                  <button
                    onClick={() => {
                      setActiveTab('landing');
                      setProfileDropdownOpen(false);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                  >
                    <Layers size={15} />
                    <span>Product Overview</span>
                  </button>
                </div>

                {/* Auth / Sign Out */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  {currentUser ? (
                    <button
                      onClick={() => {
                        handleFirebaseUserLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="btn btn-danger-subtle btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveModal('auth');
                        setProfileDropdownOpen(false);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                    >
                      <ShieldCheck size={14} color="var(--accent-primary)" />
                      <span>Connect Firebase</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary mobile-menu-btn"
            style={{ display: 'none' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '0 12px 36px rgba(23, 33, 27, 0.12)',
          animation: 'fadeSlideUp 200ms var(--ease-out-expo)'
        }}>
          <button
            onClick={() => { onOpenCommandPalette(); setMobileMenuOpen(false); }}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            <Search size={16} color="var(--accent-primary)" />
            <span>Search or jump to... (⌘K)</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`nav-tab-button ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <Icon size={18} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Globe size={15} />
              <span>Language: {isHinglish ? 'Hinglish 🇮🇳' : 'English 🌐'}</span>
            </button>

            <button 
              onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Settings size={15} />
              <span>Account Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
