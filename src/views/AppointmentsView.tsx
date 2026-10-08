import React from 'react';
import { Appointment, ViewMode } from '../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
  onNavigate: (view: ViewMode) => void;
  onOpenPdfSummary: () => void;
  onCancelAppointment: (id: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  onNavigate,
  onOpenPdfSummary,
  onCancelAppointment,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block">
            Confirmed Care Routes
          </span>
          <h2 className="text-2xl font-bold text-on-surface mt-0.5">
            Your Medical Appointments &amp; Consultations
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Clinical triage summaries are automatically forwarded to attending specialist desks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('specialist-directory')}
          className="px-4 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Find Another Specialist
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[32px]">calendar_today</span>
          </div>
          <h3 className="text-base font-bold text-on-surface">No Scheduled Appointments Yet</h3>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            Complete a quick symptom assessment to find an appropriate in-network specialist and book your care route.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('symptom-assessment')}
            className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
          >
            Start Symptom Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 sm:p-7 shadow-xs space-y-5"
            >
              {/* Top status bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#047857] animate-pulse"></span>
                  <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">
                    {apt.status} Consultation
                  </span>
                  <span className="text-xs text-on-surface-variant">• Protocol {apt.protocolCode}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenPdfSummary}
                    className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-xs font-semibold rounded-lg text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                    View Attached Triage PDF
                  </button>
                </div>
              </div>

              {/* Doctor & Location Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 flex items-start gap-4">
                  <img
                    src={apt.doctor.imageUrl}
                    alt={apt.doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shadow-xs shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-on-surface">
                      {apt.doctor.name}, {apt.doctor.credentials}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {apt.doctor.specialty} • {apt.doctor.affiliation}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant pt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                      <span>{apt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-surface-container-low p-4 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Date &amp; Time:</span>
                    <span className="font-bold text-on-surface text-sm">{apt.dateTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Format:</span>
                    <span className="font-semibold text-primary">{apt.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Patient:</span>
                    <span className="font-semibold text-on-surface">{apt.patientName}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-container text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="https://calendar.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    Sync to Google Calendar
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                    Get Directions
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onCancelAppointment(apt.id)}
                  className="text-xs text-error hover:underline font-semibold cursor-pointer"
                >
                  Cancel / Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
