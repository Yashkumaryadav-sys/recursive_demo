import React, { useState } from 'react';
import { INDIAN_EMERGENCY_CONTACTS } from '../data/mockData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [checkedSymptoms, setCheckedSymptoms] = useState<{ [key: string]: boolean }>({
    thunderclap: true,
    weakness: false,
    confusion: false,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl shadow-2xl border-2 border-error/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Red Alert Header */}
        <div className="bg-[#FEF2F2] p-5 sm:p-6 border-b border-error/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[30px] animate-bounce">e911_emergency</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-error text-on-error text-[10px] font-bold uppercase tracking-wider">
                  India Emergency Dispatch Protocol
                </span>
                <span className="text-xs text-error font-semibold">Immediate Action Mandatory</span>
              </div>
              <h2 className="text-xl font-bold text-[#991B1B] mt-1">
                Emergency &amp; Acute Care Dispatch (India ERSS)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-on-surface">
          <p className="text-xs sm:text-sm text-[#7F1D1D] bg-error-container/40 p-3.5 rounded-xl font-medium leading-relaxed">
            If you or the patient is experiencing a sudden &quot;thunderclap&quot; headache, acute unilateral weakness, facial droop, sudden loss of speech, or acute chest trauma, do not wait for outpatient clinic bookings.
          </p>

          {/* Direct Indian Dispatch CTAs */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 112 ERSS */}
              <a
                href="tel:112"
                className="p-4 bg-error text-on-error rounded-2xl hover:opacity-95 shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                    Pan-India 24x7
                  </span>
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold block">Dial 112</span>
                  <span className="text-xs font-bold leading-tight block mt-0.5">
                    Integrated Helpline (ERSS)
                  </span>
                  <span className="text-[10px] opacity-90 block mt-0.5">
                    Police, Fire &amp; Rescue, Health services etc.
                  </span>
                </div>
              </a>

              {/* 102 NAS */}
              <a
                href="tel:102"
                className="p-4 bg-blue-700 text-white rounded-2xl hover:bg-blue-800 shadow-md transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                    National Ambulance
                  </span>
                  <span className="material-symbols-outlined text-[24px]">ambulance</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold block">Dial 102</span>
                  <span className="text-xs font-bold leading-tight block mt-0.5">
                    National Ambulance Service (NAS)
                  </span>
                  <span className="text-[10px] opacity-90 block mt-0.5">
                    Free ambulance dispatch &amp; transport across India
                  </span>
                </div>
              </a>
            </div>

            {/* Secondary Helplines: 108 & Tele-MANAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href="tel:108"
                className="p-3 bg-surface-container-low hover:bg-surface-container rounded-xl flex items-center justify-between border border-outline-variant/30"
              >
                <div>
                  <span className="font-bold text-on-surface block">Dial 108 (Disaster &amp; EMS)</span>
                  <span className="text-[10px] text-on-surface-variant">Emergency Medical Response</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
              </a>

              <a
                href="tel:14416"
                className="p-3 bg-surface-container-low hover:bg-surface-container rounded-xl flex items-center justify-between border border-outline-variant/30"
              >
                <div>
                  <span className="font-bold text-on-surface block">Tele-MANAS (14416)</span>
                  <span className="text-[10px] text-on-surface-variant">24x7 Mental Health Lifeline</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">support_agent</span>
              </a>
            </div>
          </div>

          {/* Nearest Emergency Center in India */}
          <div className="bg-surface-container-low p-4 rounded-2xl space-y-3 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[22px]">local_hospital</span>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Nearest Apex Level-1 Trauma Center</h4>
                  <p className="text-xs text-on-surface-variant">AIIMS Apex Trauma Center (Jai Prakash Narayan)</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-[#ECFDF5] text-[#047857] rounded-md text-[11px] font-bold">
                ER Active: ~6 mins triage
              </span>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <p className="font-semibold text-on-surface">Ansari Nagar, Mahatma Gandhi Ring Road, New Delhi - 110029</p>
                <p className="text-on-surface-variant text-[11px]">
                  Emergency Desk: <strong>+91 11 2658 8500</strong> • Pre-alert ER route active
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=AIIMS+Apex+Trauma+Centre+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-1 hover:bg-primary-container transition-colors self-start sm:self-auto cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                Directions
              </a>
            </div>
          </div>

          {/* Escalation Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Emergency Symptom Triage Check (India Medical Standards)
            </h4>
            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSymptoms.thunderclap}
                  onChange={(e) =>
                    setCheckedSymptoms({ ...checkedSymptoms, thunderclap: e.target.checked })
                  }
                  className="mt-0.5 accent-[#00685f] w-4 h-4 rounded"
                />
                <span>
                  <strong>Sudden Peak Onset (Thunderclap):</strong> Headache reached 10/10 severity within 60 seconds (indicative of SAH).
                </span>
              </label>
              <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSymptoms.weakness}
                  onChange={(e) =>
                    setCheckedSymptoms({ ...checkedSymptoms, weakness: e.target.checked })
                  }
                  className="mt-0.5 accent-[#00685f] w-4 h-4 rounded"
                />
                <span>
                  <strong>Focal Neurological Deficit:</strong> Unilateral facial droop, arm weakness, or slurred speech (Cincinnati Prehospital Stroke Scale).
                </span>
              </label>
              <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSymptoms.confusion}
                  onChange={(e) =>
                    setCheckedSymptoms({ ...checkedSymptoms, confusion: e.target.checked })
                  }
                  className="mt-0.5 accent-[#00685f] w-4 h-4 rounded"
                />
                <span>
                  <strong>Meningism &amp; High Fever:</strong> Neck rigidity preventing chin-to-chest flexion accompanied by altered consciousness.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[11px] text-on-surface-variant">
            Emergency triage compliant with MoHFW India guidelines.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-surface-container text-on-surface font-semibold text-xs rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Close Emergency View
          </button>
        </div>
      </div>
    </div>
  );
};
