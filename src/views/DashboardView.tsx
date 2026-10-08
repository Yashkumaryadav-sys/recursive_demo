import React, { useState } from 'react';
import { ViewMode, Appointment, TriageAssessmentData } from '../types';
import { PATIENT_AVATAR } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface DashboardViewProps {
  data: TriageAssessmentData;
  appointments: Appointment[];
  onNavigate: (view: ViewMode) => void;
  onOpenPdfSummary: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  appointments,
  onNavigate,
  onOpenPdfSummary,
}) => {
  const { user, updateNationalHealthId } = useAuth();
  const [isEditingHealthId, setIsEditingHealthId] = useState(false);
  const [editIdValue, setEditIdValue] = useState(
    user?.nationalHealthId || '91-4821-7749-2018'
  );
  const [editError, setEditError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const patientName = user?.name || 'Ankur Sharma';
  const patientAvatar = user?.avatar || PATIENT_AVATAR;
  const nationalHealthId = user?.nationalHealthId || '91-4821-7749-2018';

  const handleSaveHealthId = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    const digitsOnly = editIdValue.replace(/\D/g, '');
    if (digitsOnly.length < 12 || digitsOnly.length > 14) {
      setEditError(
        `National Health ID Card must contain 12 to 14 digits (currently ${digitsOnly.length} digits).`
      );
      return;
    }

    const res = await updateNationalHealthId(editIdValue);
    if (res.success) {
      setIsEditingHealthId(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setEditError(res.error || 'Failed to update National Health ID');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-5">
          <img
            src={patientAvatar}
            alt={patientName}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20 shadow-md"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-on-surface">{patientName}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                Patient Member
              </span>
              {saveSuccess && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold animate-fadeIn">
                  ✓ National Health ID Updated
                </span>
              )}
            </div>

            <p className="text-xs text-on-surface-variant">
              Age 34 • Male • National Health ID: <span className="font-mono font-bold text-on-surface">{nationalHealthId}</span> • Medical ID: #CR-IN-77492 • Lang: English, Hindi
            </p>

            <div className="flex items-center gap-3 text-xs text-on-surface-variant pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">verified_user</span>
                In-Network: Star Health Comprehensive (Policy #SH-DEL-8921)
              </span>
              <span>•</span>

              {/* Red Arrow target: Changed to National Health ID Card with 12 to 14 digit unique number */}
              <span className="flex items-center gap-1.5 bg-[#ECFDF5] text-[#065F46] px-2.5 py-1 rounded-lg font-semibold text-xs border border-[#A7F3D0]">
                <span className="material-symbols-outlined text-[#047857] text-[16px]">badge</span>
                <span>
                  National Health ID Card: <strong className="font-mono text-on-surface">{nationalHealthId}</strong>
                </span>
                <span className="text-[10px] bg-[#047857] text-white px-1.5 py-0.2 rounded font-bold ml-1">
                  12–14 Digits Unique
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditIdValue(nationalHealthId);
                    setIsEditingHealthId(true);
                  }}
                  className="ml-1 text-[#047857] hover:text-[#065F46] underline text-[11px] font-bold cursor-pointer"
                  title="Update National Health ID Card Number"
                >
                  Edit
                </button>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('symptom-assessment')}
          className="px-5 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-stretch md:self-auto justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          New Symptom Assessment
        </button>
      </div>

      {/* Inline National Health ID Card Editor Modal / Drawer if editing */}
      {isEditingHealthId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#047857] text-[24px]">badge</span>
                <h3 className="text-base font-bold text-on-surface">Update National Health ID Card</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingHealthId(false)}
                className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Enter your official 12 to 14 digit unique number issued under the Ayushman Bharat Digital Mission (ABDM). Example format: <code>91-4821-7749-2018</code> or 14 continuous digits.
            </p>

            {editError && (
              <div className="p-3 bg-error-container/60 border border-error/30 rounded-xl text-xs text-on-error-container flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[18px]">error</span>
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveHealthId} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <label className="font-bold text-on-surface">Unique Health Number (12–14 Digits)</label>
                  <span className="font-mono text-[11px] text-primary font-bold">
                    {editIdValue.replace(/\D/g, '').length} / 12–14 Digits
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={editIdValue}
                    onChange={(e) => setEditIdValue(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="e.g. 91-4821-7749-2018"
                  />
                  <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-2.5 text-[18px]">
                    badge
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingHealthId(false)}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#047857] hover:bg-[#065F46] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Save National Health ID Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid: Triage Vault & Active Care Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Triage Records & Summaries */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">folder_shared</span>
                <h3 className="text-base font-bold text-on-surface">Clinical Triage Vault</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-on-surface-variant">
                Protocol NEU-204-T
              </span>
            </div>

            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-on-surface">
                  Sub-acute Cephalea &amp; Orthostatic Dizziness
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-[11px] font-bold">
                  Active Referral
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Evaluated: Sep 17, 2026 • 94% Neurology Match
              </p>
              <blockquote className="text-xs italic text-on-surface-variant bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/15">
                &ldquo;{data.chiefComplaint}&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
                  <span className="text-[10px] text-on-surface-variant block">Severity Score</span>
                  <span className="font-bold text-primary text-sm">{data.painSeverity} / 10</span>
                </div>
                <div className="p-2 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
                  <span className="text-[10px] text-on-surface-variant block">Symptom Duration</span>
                  <span className="font-bold text-on-surface text-sm">{data.duration}</span>
                </div>
                <div className="p-2 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
                  <span className="text-[10px] text-on-surface-variant block">National Health ID</span>
                  <span className="font-bold text-[#047857] text-xs font-mono">Linked</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={onOpenPdfSummary}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  Download Clinical Triage PDF
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('results')}
                  className="text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  View Full Guidance →
                </button>
              </div>
            </div>
          </div>

          {/* Active Health Insurance & In-Network Coverage */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">health_and_safety</span>
                <h3 className="text-base font-bold text-on-surface">Indian Healthcare Policy &amp; Cashless Tier</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold">
                Active Policy
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div>
                  <span className="font-bold text-on-surface block">Star Health Premier Individual</span>
                  <span className="text-[11px] text-on-surface-variant">Policy No: SH-DEL-8921-2026</span>
                </div>
                <span className="font-mono font-bold text-primary">₹10,00,000 Sum Insured</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div>
                  <span className="font-bold text-on-surface block">ABDM Health Locker Sync</span>
                  <span className="text-[11px] text-on-surface-variant">Linked to National Health ID Card ({nationalHealthId})</span>
                </div>
                <span className="text-[#047857] font-bold">Real-time Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scheduled Appointments & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">event_available</span>
                <h3 className="text-base font-bold text-on-surface">Active Consultations</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('appointments')}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                View All ({appointments.length})
              </button>
            </div>

            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.slice(0, 2).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.doctor.imageUrl}
                        alt={apt.doctor.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-on-surface">{apt.doctor.name}</h4>
                        <p className="text-[11px] text-on-surface-variant">{apt.doctor.specialty} • {apt.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-surface-container">
                      <span className="font-semibold text-primary">{apt.dateTime}</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-on-surface-variant">
                No upcoming consultations. Book directly with an in-network specialist.
              </div>
            )}

            <button
              type="button"
              onClick={() => onNavigate('specialist-directory')}
              className="w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs rounded-xl border border-outline-variant/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person_search</span>
              Find &amp; Book Specialist
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant/30 p-5 space-y-3">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Emergency &amp; Help Desk
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:border-error/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">emergency</span>
                  <span className="font-bold text-on-surface">Integrated Helpline (ERSS)</span>
                </div>
                <span className="font-bold text-error font-mono">112</span>
              </a>
              <a
                href="tel:102"
                className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:border-error/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">ambulance</span>
                  <span className="font-bold text-on-surface">National Ambulance Service</span>
                </div>
                <span className="font-bold text-error font-mono">102</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
