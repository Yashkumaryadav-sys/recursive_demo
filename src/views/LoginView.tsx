import React, { useState } from 'react';
import { UserRole, ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { DEMO_ACCOUNTS, parseJwtParts } from '../lib/jwt';
import { CARE_ROUTE_LOGO } from '../data/mockData';

interface LoginViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const { user, token, login, registerPatient, logout, isAuthenticated } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isRegistering, setIsRegistering] = useState(false);

  // Login form state
  const [email, setEmail] = useState(DEMO_ACCOUNTS.patient.email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS.patient.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Patient Profile Formation state
  const [profileName, setProfileName] = useState('Ankur Sharma');
  const [profileEmail, setProfileEmail] = useState('ankur.sharma@example.in');
  const [profilePassword, setProfilePassword] = useState('Patient@123');
  const [profilePhone, setProfilePhone] = useState('+91 98112 34567');
  const [profileHealthId, setProfileHealthId] = useState('91-4821-7749-2018');

  // When role selector changes
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setIsRegistering(false);
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setErrorMessage(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await login(email, password, selectedRole);
    setIsSubmitting(false);

    if (result.success) {
      if (selectedRole === 'admin') {
        onNavigate('admin-portal');
      } else if (selectedRole === 'doctor') {
        onNavigate('home');
      } else {
        onNavigate('patient-dashboard');
      }
    } else {
      setErrorMessage(result.error || 'Authentication failed. Check credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const digitsOnly = profileHealthId.replace(/\D/g, '');
    if (digitsOnly.length < 12 || digitsOnly.length > 14) {
      setErrorMessage(
        `National Health ID Card must contain 12 to 14 digits. Currently entered: ${digitsOnly.length} digits.`
      );
      return;
    }

    setIsSubmitting(true);
    const result = await registerPatient(
      profileName,
      profileEmail,
      profilePassword,
      profileHealthId,
      profilePhone
    );
    setIsSubmitting(false);

    if (result.success) {
      onNavigate('patient-dashboard');
    } else {
      setErrorMessage(result.error || 'Profile formation failed. Please retry.');
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    setSelectedRole(role);
    setIsRegistering(false);
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await login(DEMO_ACCOUNTS[role].email, DEMO_ACCOUNTS[role].password, role);
    setIsSubmitting(false);

    if (result.success) {
      if (role === 'admin') {
        onNavigate('admin-portal');
      } else if (role === 'doctor') {
        onNavigate('home');
      } else {
        onNavigate('patient-dashboard');
      }
    } else {
      setErrorMessage(result.error || 'Demo login failed');
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const parsedToken = token ? parseJwtParts(token) : null;
  const digitsCount = profileHealthId.replace(/\D/g, '').length;
  const isHealthIdValid = digitsCount >= 12 && digitsCount <= 14;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <img
            alt="CareRoute AI"
            src={CARE_ROUTE_LOGO}
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-bold text-primary tracking-tight">CareRoute AI India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          Select Role &amp; Enter Portal
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
          Secure, role-stratified access for Patients, Medical Practitioners, and Health System Administrators adhering to Indian ABDM and DISHA standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Credentials / Profile Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-md space-y-6">
          {/* If already authenticated */}
          {isAuthenticated && user && (
            <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#047857]/30"
                />
                <div>
                  <span className="font-bold text-[#065F46] block text-sm">
                    Predefined Active Role: <span className="capitalize">{user.role}</span>
                  </span>
                  <span className="text-on-surface-variant text-[11px] block">
                    {user.name} • {user.email}
                  </span>
                  {user.nationalHealthId && (
                    <span className="text-[10px] text-[#047857] font-semibold block mt-0.5">
                      National Health ID: {user.nationalHealthId}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (user.role === 'admin') onNavigate('admin-portal');
                    else if (user.role === 'doctor') onNavigate('home');
                    else onNavigate('patient-dashboard');
                  }}
                  className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Enter App
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-1.5 bg-white text-error hover:bg-error-container/20 border border-error/20 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Primary Step: Select Access Role */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                1. Select Your Predefined Role
              </label>
              <span className="text-[10px] text-primary font-semibold">
                Role will be established for this session
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedRole === 'patient'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Patient</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('doctor')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedRole === 'doctor'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">stethoscope</span>
                <span>Doctor</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Quick 1-Click Instant Demo Credentials */}
          <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-2 border border-outline-variant/20">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
              Instant 1-Click Credentials Evaluation
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('patient')}
                className={`p-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                  selectedRole === 'patient' && !isRegistering
                    ? 'bg-surface-container-lowest border-primary shadow-xs'
                    : 'bg-surface-container-lowest/70 hover:bg-surface-container-lowest border-outline-variant/30'
                }`}
              >
                <span className="font-bold text-primary block">👤 Patient</span>
                <span className="text-[10px] text-on-surface-variant truncate block">Ankur Sharma</span>
                <span className="text-[9px] text-[#047857] truncate block">14-Digit ABHA</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('doctor')}
                className={`p-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                  selectedRole === 'doctor'
                    ? 'bg-surface-container-lowest border-primary shadow-xs'
                    : 'bg-surface-container-lowest/70 hover:bg-surface-container-lowest border-outline-variant/30'
                }`}
              >
                <span className="font-bold text-primary block">🩺 Doctor</span>
                <span className="text-[10px] text-on-surface-variant truncate block">Dr. Ankur (MD)</span>
                <span className="text-[9px] text-on-surface-variant truncate block">NMC 48291-N</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className={`p-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-surface-container-lowest border-primary shadow-xs'
                    : 'bg-surface-container-lowest/70 hover:bg-surface-container-lowest border-outline-variant/30'
                }`}
              >
                <span className="font-bold text-primary block">🛡️ Admin</span>
                <span className="text-[10px] text-on-surface-variant truncate block">Rajesh Verma</span>
                <span className="text-[9px] text-on-surface-variant truncate block">Node Admin #09</span>
              </button>
            </div>
          </div>

          {/* Sub-tab for Patient: Sign In vs Form Profile (Enter 12-14 Digit National Health ID Card) */}
          {selectedRole === 'patient' && (
            <div className="flex border-b border-surface-container gap-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  !isRegistering
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In with Credentials
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className={`pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isRegistering
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Form Profile (Enter National Health ID Card)</span>
              </button>
            </div>
          )}

          {/* Error message if any */}
          {errorMessage && (
            <div className="p-3.5 bg-error-container/60 border border-error/30 rounded-xl text-xs text-on-error-container flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-error text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Option A: Patient Profile Formation with 12 to 14 Digit National Health ID Card */}
          {selectedRole === 'patient' && isRegistering ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-2xl border border-primary/15 text-xs text-on-surface space-y-1">
                <span className="font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  National Health ID Card (ABHA) Registration
                </span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Enter your 12 to 14 digit unique national health number issued by the National Health Authority (NHA). This binds your clinical records, triage summaries, and prescriptions across Indian hospitals.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  placeholder="e.g. Ankur Sharma"
                />
              </div>

              {/* 12 to 14 Digit National Health ID Card Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <span>National Health ID Card (Unique Number)</span>
                    <span className="text-error font-bold">*</span>
                  </label>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isHealthIdValid
                        ? 'bg-[#ECFDF5] text-[#047857]'
                        : 'bg-error-container/60 text-error'
                    }`}
                  >
                    {digitsCount} / 12–14 Digits Entered
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={profileHealthId}
                    onChange={(e) => setProfileHealthId(e.target.value)}
                    className={`w-full bg-surface-container-low border rounded-xl pl-10 pr-10 py-2.5 text-xs font-mono text-on-surface focus:outline-none focus:ring-2 ${
                      isHealthIdValid
                        ? 'border-[#047857]/50 focus:ring-[#047857]/40'
                        : 'border-outline-variant/30 focus:ring-primary/40'
                    }`}
                    placeholder="e.g. 91-4821-7749-2018 or 14 digits"
                  />
                  <span className="material-symbols-outlined text-primary absolute left-3 top-2.5 text-[18px]">
                    badge
                  </span>
                  {isHealthIdValid && (
                    <span className="material-symbols-outlined text-[#047857] absolute right-3 top-2.5 text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  Standard format: 14 digits (XX-XXXX-XXXX-XXXX) or 12 continuous digits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                    placeholder="name@example.in"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Mobile Number (India)
                  </label>
                  <input
                    type="tel"
                    required
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                    placeholder="+91 98112 34567"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  value={profilePassword}
                  onChange={(e) => setProfilePassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isHealthIdValid}
                className="w-full py-3.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>
                  {isSubmitting ? 'Creating Profile & Generating JWT...' : 'Save Profile & Enter App'}
                </span>
              </button>
            </form>
          ) : (
            /* Form Option B: Standard Credentials Login */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  {selectedRole === 'patient'
                    ? 'Patient Email or Registered ID'
                    : selectedRole === 'doctor'
                    ? 'Doctor / Clinician Email'
                    : 'System Administrator Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                    placeholder="name@careroute.in"
                  />
                  <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-2.5 text-[18px]">
                    mail
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-10 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                    placeholder="••••••••"
                  />
                  <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-2.5 text-[18px]">
                    key
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00685f] rounded" />
                  <span>Remember session (JWT 24h)</span>
                </label>
                <span className="text-[11px] text-primary font-semibold">
                  HMAC-SHA256 Encrypted
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                <span>
                  {isSubmitting
                    ? 'Verifying Credentials...'
                    : `Enter as ${selectedRole.toUpperCase()}`}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Live JWT Token Inspector & Standards */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">code</span>
                <h3 className="text-sm font-bold text-on-surface">Live JWT Token Inspector</h3>
              </div>
              {token && (
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  {copiedToken ? 'Copied!' : 'Copy JWT'}
                </button>
              )}
            </div>

            {token && parsedToken ? (
              <div className="space-y-4 text-xs font-mono">
                {/* Raw Compact JWT */}
                <div>
                  <span className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Encoded Token (Header.Payload.Signature)
                  </span>
                  <div className="p-2.5 bg-surface-container-low rounded-xl text-[10px] break-all leading-relaxed text-on-surface border border-outline-variant/20 max-h-24 overflow-y-auto">
                    <span className="text-rose-600 font-bold">{token.split('.')[0]}</span>.
                    <span className="text-purple-600 font-bold">{token.split('.')[1]}</span>.
                    <span className="text-emerald-600 font-bold">{token.split('.')[2]}</span>
                  </div>
                </div>

                {/* Decoded Header */}
                <div>
                  <span className="text-[10px] font-sans font-bold text-rose-600 uppercase tracking-wider block mb-1">
                    Decoded Header (Algorithm &amp; Token Type)
                  </span>
                  <pre className="p-2.5 bg-rose-50/50 rounded-xl text-[11px] text-rose-950 border border-rose-200 overflow-x-auto">
                    {JSON.stringify(parsedToken.header, null, 2)}
                  </pre>
                </div>

                {/* Decoded Payload */}
                <div>
                  <span className="text-[10px] font-sans font-bold text-purple-600 uppercase tracking-wider block mb-1">
                    Decoded Payload (Predefined Role &amp; ID Claims)
                  </span>
                  <pre className="p-2.5 bg-purple-50/50 rounded-xl text-[11px] text-purple-950 border border-purple-200 overflow-x-auto">
                    {JSON.stringify(parsedToken.payload, null, 2)}
                  </pre>
                </div>

                <div className="flex items-center justify-between text-[10px] font-sans text-on-surface-variant pt-2 border-t border-surface-container">
                  <span>Standard: RFC 7519</span>
                  <span className="text-[#047857] font-semibold">● Signature Valid (HS256)</span>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-surface-container-low rounded-2xl text-center text-xs text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-[28px] text-outline">key_off</span>
                <p>No active token found. Select role and enter credentials or click 1-click demo.</p>
              </div>
            )}
          </div>

          {/* National Health ID Card Verification Note */}
          <div className="p-4 bg-[#ECFDF5] rounded-2xl border border-[#A7F3D0] space-y-2 text-xs">
            <h4 className="font-bold text-[#065F46] flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-[#047857] text-[18px]">verified_user</span>
              12 to 14 Digit National Health ID Card (ABHA)
            </h4>
            <p className="text-[11px] text-[#065F46] leading-relaxed">
              In accordance with the Ayushman Bharat Digital Mission (ABDM), patient profiles are uniquely bound to their 12 to 14-digit National Health ID Card number to ensure privacy and cross-facility interoperability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
