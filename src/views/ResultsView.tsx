import React, { useState } from 'react';
import { ViewMode, TriageAssessmentData, Doctor } from '../types';
import { DOCTORS } from '../data/mockData';

interface ResultsViewProps {
  data: TriageAssessmentData;
  onNavigate: (view: ViewMode) => void;
  onOpenEmergency: () => void;
  onOpenPdfSummary: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  data,
  onNavigate,
  onOpenEmergency,
  onOpenPdfSummary,
  onSelectDoctor,
}) => {
  const [viewModeState, setViewModeState] = useState<'standard' | 'red-flag'>(
    data.emergencyFlag ? 'red-flag' : 'standard'
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Stepper and Mode Toggle */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block">
            Step 3 of 3 • Final Decision Pathway
          </span>
          <h2 className="text-lg font-bold text-on-surface mt-0.5">
            Clinical Triage Synthesis &amp; Care Routing
          </h2>
        </div>

        {/* Route Preview Switcher Toggle */}
        <div className="flex items-center gap-2 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setViewModeState('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewModeState === 'standard'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Standard Care Route
          </button>
          <button
            type="button"
            onClick={() => setViewModeState('red-flag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewModeState === 'red-flag'
                ? 'bg-error text-on-error shadow-xs'
                : 'text-on-surface-variant hover:text-error'
            }`}
          >
            Red-Flag Alert Mode
          </button>
        </div>
      </div>

      {viewModeState === 'red-flag' ? (
        /* RED-FLAG ALERT VIEW */
        <div className="space-y-6 animate-fadeIn">
          {/* Critical Banner */}
          <div className="bg-[#FEF2F2] border-2 border-error rounded-3xl p-6 sm:p-8 space-y-4 text-on-surface">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-[36px] animate-bounce">
                  emergency_home
                </span>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-error text-on-error text-[11px] font-bold uppercase tracking-wider">
                  Level 1 High Clinical Urgency
                </div>
                <h3 className="text-2xl font-black text-[#991B1B]">
                  Immediate Emergency Evaluation Required
                </h3>
                <p className="text-xs sm:text-sm text-[#7F1D1D] leading-relaxed max-w-2xl">
                  Reported acute red-flag indicators suggest potential critical vascular or neurological event. Do not wait for outpatient appointments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenEmergency}
                className="px-6 py-3.5 bg-error text-on-error font-bold text-sm rounded-xl hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Dial 112 (ERSS)
              </button>
              <button
                type="button"
                onClick={onOpenEmergency}
                className="px-6 py-3.5 bg-blue-700 text-white font-bold text-sm rounded-xl hover:bg-blue-800 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">ambulance</span>
                Ambulance 102 (NAS)
              </button>
              <a
                href="https://maps.google.com/?q=AIIMS+Apex+Trauma+Centre+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-surface-container text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-2 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">directions</span>
                Navigate to AIIMS Trauma Center
              </a>
            </div>
          </div>

          {/* Nearest Level-1 Trauma Center card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-[28px]">local_hospital</span>
                <div>
                  <h4 className="text-base font-bold text-on-surface">AIIMS Apex Trauma Center (Jai Prakash Narayan)</h4>
                  <p className="text-xs text-on-surface-variant">Designated Apex Level-1 Stroke &amp; Emergency Neuro-Trauma Center</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#ECFDF5] text-[#047857] text-xs font-bold rounded-lg">
                ER Wait: ~6 mins
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3.5 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Distance &amp; ETA</span>
                <span className="font-bold text-on-surface text-sm">1.8 km • 5 mins drive</span>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Direct ER Desk</span>
                <a href="tel:1126588500" className="font-bold text-primary hover:underline text-sm">+91 11 2658 8500 / 112</a>
              </div>
              <div className="p-3.5 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Ambulance Routing</span>
                <span className="font-bold text-[#047857] text-sm">ERSS Green Corridor Active</span>
              </div>
            </div>
          </div>

          {/* Return Button */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setViewModeState('standard')}
              className="text-xs text-on-surface-variant hover:text-primary font-semibold underline cursor-pointer"
            >
              Return to Standard Outpatient Triage View
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD CARE ROUTE VIEW */
        <div className="space-y-8 animate-fadeIn">
          {/* Urgency Status Banner */}
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#047857] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#047857] text-[11px] font-bold">
                      Low to Moderate Clinical Urgency
                    </span>
                    <span className="text-xs text-on-surface-variant">Protocol NEU-204-T</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mt-0.5">
                    Neurology Specialist Consultation Recommended
                  </h3>
                </div>
              </div>

              <div className="text-right sm:shrink-0">
                <span className="text-[11px] text-on-surface-variant block">Recommended Timeline</span>
                <span className="text-sm font-bold text-primary">3 to 5 business days</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-[#DCFCE7]">
              <span className="font-semibold text-on-surface">Correlated Presentation:</span>
              <span className="px-2 py-0.5 bg-white rounded-md text-on-surface-variant border border-outline-variant/20">
                Headache (5 days)
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md text-on-surface-variant border border-outline-variant/20">
                Dizziness (Orthostatic)
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md text-on-surface-variant border border-outline-variant/20">
                Light Sensitivity (Photophobia)
              </span>
            </div>

            <p className="text-xs text-[#065F46] leading-relaxed">
              <strong>Clinical Guardrail Notice:</strong> This assessment does not indicate an acute emergency. If symptoms abruptly worsen, seek emergency care immediately.
            </p>
          </div>

          {/* Primary Recommendation & Metric Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Col: Primary Specialty Card */}
            <div className="lg:col-span-8 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Optimal Specialty Focus
                  </span>
                  <h3 className="text-2xl font-bold text-on-surface">
                    Recommended Primary Specialty: Neurology
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Targeted focus on headache syndromes, autonomic cranial tone, and vestibular pathways.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                  Primary Routing
                </span>
              </div>

              {/* Clinical Reasoning Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Clinical Reasoning Breakdown
                </h4>
                <div className="space-y-2.5 text-xs text-on-surface">
                  <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">timer</span>
                    <div>
                      <span className="font-bold text-on-surface">Duration Criteria:</span>
                      <p className="text-on-surface-variant text-[11px] mt-0.5">
                        Headache persisting &gt;72 hours with sub-acute onset satisfies the clinical referral threshold for specialized neurological evaluation.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">device_thermostat</span>
                    <div>
                      <span className="font-bold text-on-surface">Pathological Nexus:</span>
                      <p className="text-on-surface-variant text-[11px] mt-0.5">
                        Co-occurrence of lightheadedness upon standing with photophobia points toward vascular, migraine variant, or autonomic cephalea.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-surface-container-low rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">security</span>
                    <div>
                      <span className="font-bold text-on-surface">Differential Triage:</span>
                      <p className="text-on-surface-variant text-[11px] mt-0.5">
                        Rules out acute intracranial emergency in the verified absence of focal deficits, nuchal rigidity, or sudden thunderclap onset.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* In-Network Doctors Preview */}
              <div className="pt-4 border-t border-surface-container space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Top In-Network Neurologists Nearby
                  </h4>
                  <button
                    type="button"
                    onClick={() => onNavigate('specialist-directory')}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    View All 3 Specialists →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DOCTORS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onSelectDoctor(doc)}
                      className="p-3 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-all cursor-pointer flex flex-col justify-between space-y-2 border border-outline-variant/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={doc.imageUrl}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/20"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-on-surface truncate">{doc.name}</p>
                          <p className="text-[10px] text-on-surface-variant truncate">{doc.distanceKm} km away</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-surface-container">
                        <span className="font-semibold text-primary">{doc.availableSlots[0]?.time}</span>
                        <span className="text-amber-600 font-bold">★ {doc.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Metric Confidence & Alternative Pathways */}
            <div className="lg:col-span-4 space-y-6">
              {/* Confidence Metric Card */}
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs text-center space-y-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Algorithmic Confidence
                </span>
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-primary"
                      strokeDasharray="94, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-on-surface">94%</span>
                    <span className="text-[10px] font-bold text-primary">Neurology</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Tier 1 Validated alignment with ICD-11 cephalea diagnostic pathways.
                </p>
              </div>

              {/* Alternative Pathways */}
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs space-y-4">
                <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                  Alternative Care Pathways
                </span>

                {/* Alt 1: Internal Medicine */}
                <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-secondary">Internal Medicine / PCP</span>
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                      81% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Same-day appointment slots • 0.8 mi away • Virtual consultation eligible for baseline labs.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('specialist-directory')}
                    className="w-full py-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                  >
                    Select Alternative Route
                  </button>
                </div>

                {/* Alt 2: ENT */}
                <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-tertiary">ENT / Otolaryngology</span>
                    <span className="text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full">
                      68% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    In 4 days • 2.4 mi away • Recommended if rotational room-spinning vertigo develops.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('specialist-directory')}
                    className="w-full py-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-xs font-semibold text-on-surface transition-colors cursor-pointer"
                  >
                    Select Alternative Route
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Escalation Warning */}
          <div className="bg-[#FEF2F2] p-4 rounded-2xl border border-error/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-[22px]">warning</span>
              <p className="text-xs text-[#7F1D1D] leading-relaxed">
                <strong>Sudden Escalation Alert:</strong> If symptoms abruptly worsen to severe chest pain, slurred speech, or acute paralysis, dial <strong>112 (ERSS)</strong> or <strong>102 (NAS)</strong> immediately.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewModeState('red-flag')}
              className="px-3 py-1.5 bg-error text-on-error font-bold text-xs rounded-lg hover:opacity-90 transition-opacity shrink-0 cursor-pointer shadow-xs"
            >
              Emergency View
            </button>
          </div>

          {/* Bottom Action Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenPdfSummary}
              className="px-5 py-3 bg-surface-container-lowest text-on-surface font-semibold text-xs rounded-xl hover:bg-surface-container transition-colors border border-outline-variant/30 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">download</span>
              Download PDF Triage Summary for Doctor
            </button>

            <button
              type="button"
              onClick={() => onNavigate('specialist-directory')}
              className="px-6 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Find Top Neurologists in Your Network (3 Nearby)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
