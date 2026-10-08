import React, { useState } from 'react';
import { Doctor, Appointment } from '../types';

interface AppointmentBookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (appointment: Appointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [appointmentType, setAppointmentType] = useState<'In-Person Consultation' | 'Video Telehealth'>('In-Person Consultation');
  const [patientNotes, setPatientNotes] = useState('Experiencing dull headache (5 days) and intermittent orthostatic dizziness.');

  if (!isOpen || !doctor) return null;

  const handleBooking = () => {
    const slot = doctor.availableSlots[selectedSlotIndex] || doctor.availableSlots[0];
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctor,
      dateTime: slot.label,
      type: appointmentType,
      protocolCode: 'NEU-204-T',
      status: 'Confirmed',
      location: appointmentType === 'In-Person Consultation'
        ? `${doctor.affiliation}, Suite 410 (${doctor.distanceKm} km away)`
        : 'CareRoute Encrypted Telehealth Room #9914',
      patientName: 'Ankur Sharma',
    };
    onConfirmBooking(newApt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">event_available</span>
            <div>
              <h3 className="text-base font-bold text-on-surface">Confirm Care Consultation</h3>
              <p className="text-xs text-on-surface-variant">Triage Referral Attached: NEU-204-T</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-on-surface">
          {/* Provider preview */}
          <div className="flex items-center gap-3.5 p-3.5 bg-surface-container-low rounded-xl">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-primary/20"
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-on-surface">{doctor.name}, {doctor.credentials}</h4>
              <p className="text-primary font-medium">{doctor.specialty} • {doctor.affiliation}</p>
              <p className="text-on-surface-variant text-[11px]">In-Network • Match score: {doctor.matchScore || 98}%</p>
            </div>
          </div>

          {/* Consultation Type Selector */}
          <div>
            <label className="font-bold text-on-surface-variant uppercase tracking-wider block mb-2 text-[11px]">
              Select Consultation Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAppointmentType('In-Person Consultation')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 cursor-pointer transition-all ${
                  appointmentType === 'In-Person Consultation'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">domain</span>
                <div>
                  <p className="font-bold">In-Person Visit</p>
                  <p className="text-[11px] text-on-surface-variant">{doctor.distanceKm} km from you</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAppointmentType('Video Telehealth')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 cursor-pointer transition-all ${
                  appointmentType === 'Video Telehealth'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-lowest text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <div>
                  <p className="font-bold">Telehealth Video</p>
                  <p className="text-[11px] text-on-surface-variant">Encrypted HIPAA Room</p>
                </div>
              </button>
            </div>
          </div>

          {/* Available Slots */}
          <div>
            <label className="font-bold text-on-surface-variant uppercase tracking-wider block mb-2 text-[11px]">
              Select Available Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {doctor.availableSlots.map((slot, index) => {
                const isSelected = selectedSlotIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedSlotIndex(index)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary text-on-primary shadow-xs'
                        : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-on-primary/80' : 'text-primary'}`}>
                        {slot.day}
                      </span>
                      {slot.isToday && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#ECFDF5] text-[#047857]'}`}>
                          Fastest
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-xs mt-0.5">{slot.time}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patient notes */}
          <div>
            <label className="font-bold text-on-surface-variant uppercase tracking-wider block mb-1 text-[11px]">
              Pre-Visit Clinical Note
            </label>
            <textarea
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              rows={2}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 p-2.5 bg-[#ECFDF5] rounded-xl text-[#047857] text-[11px]">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>CareRoute triage summary will automatically sync with Dr. {doctor.name}&apos;s staff.</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-on-surface-variant hover:text-on-surface text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleBooking}
            className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">done</span>
            Confirm Consultation Booking
          </button>
        </div>
      </div>
    </div>
  );
};
