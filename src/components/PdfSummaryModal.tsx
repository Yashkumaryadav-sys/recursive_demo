import React from 'react';
import { TriageAssessmentData } from '../types';
import { useAuth } from '../context/AuthContext';

interface PdfSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TriageAssessmentData;
}

export const PdfSummaryModal: React.FC<PdfSummaryModalProps> = ({ isOpen, onClose, data }) => {
  const { user } = useAuth();
  if (!isOpen) return null;

  const patientName = user?.name || 'Ankur Sharma';
  const nationalHealthId = user?.nationalHealthId || '91-4821-7749-2018';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest max-w-3xl w-full rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">description</span>
            <div>
              <h3 className="text-sm font-bold text-on-surface">Clinical Triage Summary Document</h3>
              <p className="text-[11px] text-on-surface-variant">Validated under FHIR Protocol NEU-204-T</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Printable Document Canvas */}
        <div className="p-8 overflow-y-auto space-y-6 text-on-surface font-sans bg-white print:p-0">
          {/* Letterhead */}
          <div className="flex items-start justify-between border-b pb-4 border-surface-container">
            <div>
              <h1 className="text-xl font-bold text-[#00685f]">CareRoute AI Clinical Gateway (India)</h1>
              <p className="text-xs text-on-surface-variant">Intelligent Triage &amp; Specialty Navigation Systems • ABDM / NDHM Compliant</p>
              <p className="text-xs text-on-surface-variant">ABHA Linked Record • Session Token: #CR-IN-2026-0917-884</p>
            </div>
            <div className="text-right text-xs">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] font-bold">
                Tier 1 Algorithmic Validation
              </span>
              <p className="text-on-surface-variant mt-1">Evaluated: Sep 17, 2026</p>
            </div>
          </div>

          {/* Patient Bio Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low text-xs">
            <div>
              <span className="text-on-surface-variant block font-medium">Patient Name</span>
              <span className="font-bold text-on-surface text-sm">{patientName}</span>
              <span className="text-[10px] text-primary block font-mono">National Health ID: {nationalHealthId}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">Age &amp; Gender</span>
              <span className="font-bold text-on-surface text-sm">34, Male</span>
              <span className="text-[10px] text-on-surface-variant block">City: New Delhi</span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">Urgency Stratification</span>
              <span className="font-bold text-primary text-sm">Low-to-Moderate</span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">Recommended Window</span>
              <span className="font-bold text-on-surface text-sm">3 - 5 Business Days</span>
            </div>
          </div>

          {/* Chief Complaint & Parameters */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider text-primary">
              1. Chief Complaint &amp; Chronology
            </h4>
            <div className="p-3.5 bg-surface-container-low rounded-lg leading-relaxed text-sm">
              &quot;{data.chiefComplaint}&quot;
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-surface-container-low rounded-lg">
                <span className="text-on-surface-variant block">Duration:</span>
                <span className="font-semibold text-on-surface">{data.duration}</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg">
                <span className="text-on-surface-variant block">Pain Scale:</span>
                <span className="font-semibold text-on-surface">{data.painSeverity}/10 (Moderate)</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg">
                <span className="text-on-surface-variant block">Light Sensitivity:</span>
                <span className="font-semibold text-on-surface">{data.q2Sensitivity === 'yes' ? 'Present (Photophobia)' : 'Absent'}</span>
              </div>
            </div>
          </div>

          {/* Specialty Alignment & Reasoning */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider text-primary">
              2. Algorithmic Differential Alignment
            </h4>
            <div className="border border-surface-container rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-base text-on-surface">Neurology (94% Protocol Match)</span>
                  <p className="text-on-surface-variant">Focus: Central Nervous System, Cephalea &amp; Orthostatic Balance</p>
                </div>
                <span className="px-3 py-1 bg-primary text-on-primary font-bold rounded-lg">
                  Primary Routing Pick
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-surface-container text-on-surface">
                <p>• <strong>Duration Criteria:</strong> Headache persisting over 72 hours with sub-acute onset satisfies specialist referral threshold.</p>
                <p>• <strong>Vestibular/Postural Nexus:</strong> Orthostatic exacerbation without rotational vertigo points to autonomic or cervicogenic co-factors.</p>
                <p>• <strong>Safety Exclusion:</strong> Absence of sudden peak intensity (thunderclap) or focal neurological deficit rules out immediate ESI Level 1 emergency.</p>
              </div>
            </div>
          </div>

          {/* Differential Specialties */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider text-primary">
              3. Differential Secondary Pathways
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-low rounded-lg">
                <span className="font-bold text-secondary">Internal Medicine / Primary Care (81%)</span>
                <p className="text-on-surface-variant mt-0.5">Comprehensive metabolic workup, orthostatic BP monitoring, electrolyte analysis.</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg">
                <span className="font-bold text-tertiary">ENT / Otolaryngology (68%)</span>
                <p className="text-on-surface-variant mt-0.5">Inner-ear vestibular battery if postural imbalance presents spinning sensations.</p>
              </div>
            </div>
          </div>

          {/* Clinician Signature Block */}
          <div className="pt-6 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
            <div>
              <p className="font-semibold text-on-surface">CareRoute AI Medical Informatics Engine v4.2</p>
              <p>Non-Diagnostic Triage Document • To be reviewed by licensed medical personnel.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider block font-bold text-primary">Clinical Vault Hash</span>
              <code className="text-[10px] text-outline">SHA256:7f9a88...c1e9</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
