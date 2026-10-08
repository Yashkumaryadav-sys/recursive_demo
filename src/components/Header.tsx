import React, { useState } from 'react';
import { ViewMode, UserRole } from '../types';
import { CARE_ROUTE_LOGO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userRole: UserRole;
  onToggleUserRole?: (role: UserRole) => void;
  onOpenEmergency: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  userRole,
  onOpenEmergency,
  unreadCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Role-specific navigation items
  let navItems: { id: ViewMode; label: string }[] = [];

  if (isAuthenticated) {
    if (userRole === 'admin') {
      navItems = [
        { id: 'admin-portal', label: 'Admin Portal' },
        { id: 'specialist-directory', label: 'Specialist Directory' },
        { id: 'appointments', label: 'Appointments Registry' },
      ];
    } else if (userRole === 'doctor') {
      navItems = [
        { id: 'home', label: 'Doctor Triage Queue' },
        { id: 'specialist-directory', label: 'Specialist Directory' },
        { id: 'appointments', label: 'Patient Appointments' },
      ];
    } else {
      // Patient
      navItems = [
        { id: 'home', label: 'Home' },
        { id: 'symptom-assessment', label: 'Symptom Assessment' },
        { id: 'specialist-directory', label: 'Specialist Directory' },
        { id: 'appointments', label: 'Appointments' },
        { id: 'patient-dashboard', label: 'Patient Dashboard' },
      ];
    }
  }

  const handleSignOut = () => {
    setShowUserMenu(false);
    logout();
    onNavigate('login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Clinical Safety / Indian Emergency Helpline Warning Banner */}
      <div className="bg-error-container text-on-error-container px-4 sm:px-6 py-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="material-symbols-outlined text-[18px] text-error">warning</span>
          <p className="font-medium text-on-error-container leading-tight">
            CareRoute AI is a clinical navigation tool, not a diagnostic system. For acute life-threatening emergencies, dial <strong>112 (ERSS)</strong> or <strong>102 (National Ambulance Service)</strong> immediately.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenEmergency}
            className="bg-error text-on-error text-xs px-3 py-1 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 font-bold shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Emergency 112 / 102</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => {
            if (!isAuthenticated) {
              onNavigate('login');
            } else if (userRole === 'admin') {
              onNavigate('admin-portal');
            } else {
              onNavigate('home');
            }
          }}
          className="flex items-center gap-3 shrink-0 cursor-pointer select-none group"
        >
          <img
            alt="CareRoute AI Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src={CARE_ROUTE_LOGO}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary tracking-tight leading-tight">
              CareRoute AI
            </span>
            <span className="text-[11px] font-medium text-on-surface-variant leading-none">
              India Healthcare Navigation &amp; Triage
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links - Shown when authenticated */}
        {isAuthenticated && navItems.length > 0 && (
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-primary bg-surface-container-low shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Action Controls: Role switchers and JWT login removed as role is predefined at login */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Trigger */}
          {isAuthenticated && (
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors relative cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface-container-lowest animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 p-3.5 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-semibold text-xs text-on-surface">India Clinical Alerts</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">2 New</span>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="p-2.5 bg-surface-container-low rounded-xl text-xs hover:bg-surface-container transition-colors">
                      <p className="font-semibold text-on-surface">ERSS 112 Transit Available</p>
                      <p className="text-on-surface-variant text-[11px]">Apex Trauma Center AIIMS New Delhi: 6 min triage wait.</p>
                    </div>
                    <div className="p-2.5 bg-surface-container-low rounded-xl text-xs hover:bg-surface-container transition-colors">
                      <p className="font-semibold text-primary">National Health ID Synced</p>
                      <p className="text-on-surface-variant text-[11px]">ABDM compliant 12–14 digit records linked.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SOS Immediate Trigger */}
          <button
            onClick={onOpenEmergency}
            className="text-xs font-bold text-error bg-error-container/60 hover:bg-error hover:text-on-error transition-all px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">emergency</span>
            <span>SOS 112</span>
          </button>

          {/* Authenticated User Pill with Predefined Role & Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/20"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary/20"
                  src={user.avatar}
                />
                <div className="hidden md:flex flex-col text-left pr-1">
                  <span className="text-xs text-on-surface font-bold leading-tight">
                    {user.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-primary/10 text-primary font-bold uppercase tracking-wider">
                      {user.role}
                    </span>
                    <span className="text-[10px] text-[#047857] font-semibold">● Active</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px] pr-1">
                  expand_more
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 p-4 z-50 animate-fadeIn space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-surface-container">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-primary/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{user.name}</h4>
                      <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold capitalize">
                        Role: {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Role Specific Clinical Identifier */}
                  <div className="p-2.5 bg-surface-container-low rounded-xl text-xs space-y-1">
                    {user.role === 'patient' && (
                      <>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                          National Health ID Card (ABHA)
                        </span>
                        <span className="font-mono font-bold text-primary text-xs block">
                          {user.nationalHealthId || '91-4821-7749-2018'}
                        </span>
                      </>
                    )}
                    {user.role === 'doctor' && (
                      <>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                          Medical Registration
                        </span>
                        <span className="font-bold text-primary text-xs block">
                          {user.regNumber || 'NMC / DMC Reg: 48291-N'}
                        </span>
                      </>
                    )}
                    {user.role === 'admin' && (
                      <>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                          Administrative Node
                        </span>
                        <span className="font-bold text-primary text-xs block">
                          ABDM Central Registry Node #09
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-1 pt-1">
                    {user.role === 'patient' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('patient-dashboard');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
                        <span>View Health ID &amp; Records</span>
                      </button>
                    )}

                    {user.role === 'doctor' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('home');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">stethoscope</span>
                        <span>Attending Triage Queue</span>
                      </button>
                    )}

                    {user.role === 'admin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('admin-portal');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">shield</span>
                        <span>Admin Operations Console</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-error hover:bg-error-container/20 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      <span>Sign Out / Switch Role</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Portal Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Row - Shown when authenticated */}
      {isAuthenticated && navItems.length > 0 && (
        <div className="xl:hidden flex items-center justify-around px-2 py-1.5 bg-surface-container-low border-t border-outline-variant/15 overflow-x-auto text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap ${
                currentView === item.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
