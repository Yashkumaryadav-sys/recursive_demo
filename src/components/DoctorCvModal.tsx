import React from 'react';
import { Doctor } from '../types';

interface DoctorCvModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export const DoctorCvModal: React.FC<DoctorCvModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-surface-container-low px-6 py-5 border-b border-outline-variant/20 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-primary/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-on-surface">
                  {doctor.name}, {doctor.credentials}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Verified Specialist
                </span>
              </div>
              <p className="text-xs text-primary font-medium">{doctor.specialty} • {doctor.affiliation}</p>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1">
                <span className="flex items-center gap-1 font-semibold text-amber-600">
                  <span className="material-symbols-outlined text-[16px]">star</span>
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </span>
                <span>•</span>
                <span>{doctor.experienceYears} Years Experience</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-on-surface">
          {/* Subspecialties */}
          <div>
            <h4 className="font-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Clinical Focus Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {doctor.subSpecialties.map((sub, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-semibold"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Residencies */}
          <div>
            <h4 className="font-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Education &amp; Training
            </h4>
            <div className="space-y-2 bg-surface-container-low p-3.5 rounded-xl">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                <div>
                  <p className="font-semibold text-on-surface">{doctor.education}</p>
                  <p className="text-on-surface-variant text-[11px]">NMC Reg No: {doctor.nmcRegNo || 'NMC-DEL-48291'} • Registered Medical Practitioner (RMP)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-surface-container">
                <span className="material-symbols-outlined text-secondary text-[18px]">payments</span>
                <div>
                  <p className="font-semibold text-on-surface">Standard Consultation Fee: ₹{doctor.consultationFeeInr || 1200}</p>
                  <p className="text-on-surface-variant text-[11px]">Direct cashless billing available with Star Health, HDFC ERGO &amp; CGHS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Philosophy */}
          <div>
            <h4 className="font-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              Care Philosophy
            </h4>
            <p className="bg-surface-container-low p-3.5 rounded-xl leading-relaxed text-on-surface italic">
              &quot;{doctor.philosophy}&quot;
            </p>
          </div>

          {/* Insurance & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-3.5 rounded-xl">
              <h5 className="font-bold text-on-surface mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                Accepted Insurance
              </h5>
              <div className="flex flex-wrap gap-1">
                {doctor.acceptedInsurances.map((ins, i) => (
                  <span key={i} className="px-2 py-0.5 bg-surface-container rounded-md text-[10px] font-medium">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl">
              <h5 className="font-bold text-on-surface mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">translate</span>
                Languages Spoken
              </h5>
              <p className="text-on-surface-variant font-medium">
                {doctor.languages.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
          <div className="text-xs text-on-surface-variant">
            <span className="font-bold text-primary">Earliest Available:</span> {doctor.availableSlots[0]?.label}
          </div>
          <button
            onClick={() => {
              onClose();
              onBookAppointment(doctor);
            }}
            className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
