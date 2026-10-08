import React, { useState } from 'react';
import { TriageAssessmentData, Appointment } from '../types';
import { DOCTORS } from '../data/mockData';

interface DoctorViewProps {
  data: TriageAssessmentData;
  appointments: Appointment[];
  onOpenPdfSummary: () => void;
}

export const DoctorView: React.FC<DoctorViewProps> = ({
  data,
  appointments,
  onOpenPdfSummary,
}) => {
  const [acceptedPatients, setAcceptedPatients] = useState<string[]>(['apt-001']);
  const doctor = DOCTORS[0]; // Dr. Ankur Sharma

  const handleAccept = (id: string) => {
    if (!acceptedPatients.includes(id)) {
      setAcceptedPatients([...acceptedPatients, id]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Clinician Desk Header */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-on-surface">{doctor.name}, {doctor.credentials}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                Attending Neurologist
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              {doctor.affiliation} • Department of Clinical Neurosciences
            </p>
            <div className="flex items-center gap-3 text-xs text-on-surface-variant pt-1">
              <span className="flex items-center gap-1 font-semibold text-primary">
                <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                Triage Gateway Active
              </span>
              <span>•</span>
              <span className="text-[#047857] font-semibold">4 Consultations Today</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#047857] bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#A7F3D0]">
            ● Clinic Queue Open
          </span>
        </div>
      </div>

      {/* Clinical Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <span className="text-on-surface-variant block text-[11px] font-semibold">Incoming Triage Match</span>
          <span className="text-2xl font-extrabold text-primary">94%</span>
          <span className="text-[10px] text-on-surface-variant block mt-0.5">Neurology Alignment</span>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <span className="text-on-surface-variant block text-[11px] font-semibold">Mean ESI Urgency</span>
          <span className="text-2xl font-extrabold text-secondary">Level 3</span>
          <span className="text-[10px] text-on-surface-variant block mt-0.5">Sub-acute / Urgent</span>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <span className="text-on-surface-variant block text-[11px] font-semibold">Avg Triage Review</span>
          <span className="text-2xl font-extrabold text-on-surface">1.8 min</span>
          <span className="text-[10px] text-on-surface-variant block mt-0.5">Pre-encounter analysis</span>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <span className="text-on-surface-variant block text-[11px] font-semibold">Red-Flag Safety Pass</span>
          <span className="text-2xl font-extrabold text-[#047857]">100%</span>
          <span className="text-[10px] text-on-surface-variant block mt-0.5">Zero unhandled emergencies</span>
        </div>
      </div>

      {/* Incoming Triage Queue */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container">
          <div>
            <h3 className="text-base font-bold text-on-surface">Incoming Patient Triage Referrals</h3>
            <p className="text-xs text-on-surface-variant">Validated intake packets ready for clinician review</p>
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
            1 High-Priority Patient
          </span>
        </div>

        {/* Patient Referral Card: Ankur S. */}
        <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center text-sm">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-on-surface">Ankur Sharma (34M)</h4>
                  <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#047857] text-[10px] font-bold rounded-md">
                    Matched Protocol NEU-204-T
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary font-mono font-semibold px-2 py-0.5 rounded-md">
                    Health ID: 91-4821-7749-2018
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Appointment: Today at 4:30 PM • In-Person Consultation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                Match Score: 94%
              </span>
              <button
                type="button"
                onClick={onOpenPdfSummary}
                className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded-lg text-xs font-semibold text-on-surface flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                Clinical PDF
              </button>
            </div>
          </div>

          {/* Clinical Intake Notes */}
          <div className="bg-surface-container-lowest p-3.5 rounded-xl text-xs space-y-2">
            <span className="font-bold text-on-surface-variant block uppercase tracking-wider text-[10px]">
              Patient-Reported Chief Complaint:
            </span>
            <p className="text-on-surface leading-relaxed italic">
              &quot;{data.chiefComplaint}&quot;
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 bg-surface-container rounded text-[11px] font-semibold text-on-surface">
                Duration: {data.duration}
              </span>
              <span className="px-2 py-0.5 bg-surface-container rounded text-[11px] font-semibold text-primary">
                Pain Score: {data.painSeverity}/10
              </span>
              <span className="px-2 py-0.5 bg-surface-container rounded text-[11px] font-semibold text-secondary">
                Dizziness: {data.q1Dizziness}
              </span>
              <span className="px-2 py-0.5 bg-surface-container rounded text-[11px] font-semibold text-tertiary">
                Photophobia: {data.q2Sensitivity === 'yes' ? 'Present' : 'Absent'}
              </span>
            </div>
          </div>

          {/* Clinician Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAccept('apt-001')}
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                {acceptedPatients.includes('apt-001') ? 'Referral Accepted & Checked In' : 'Accept Referral'}
              </button>
              <button
                type="button"
                onClick={() => alert('Order dispatched: Baseline Electrolyte Panel + Orthostatic Vitals.')}
                className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high font-semibold text-xs rounded-xl text-on-surface transition-colors cursor-pointer"
              >
                Order Pre-Visit Labs
              </button>
            </div>

            <span className="text-[11px] text-on-surface-variant">
              Triage validated by CareRoute Clinical Engine v4.2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
