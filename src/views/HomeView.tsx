import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenEmergency: () => void;
  quickSymptom: string;
  setQuickSymptom: (s: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenEmergency,
  quickSymptom,
  setQuickSymptom,
}) => {
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const sampleSuggestions = [
    'Persistent headache for 5 days',
    'Dizziness when standing up',
    'Lower back stiffness',
    'Intermittent numbness in hand',
  ];

  const handleStartWithSymptom = (text?: string) => {
    if (text) {
      setQuickSymptom(text);
    }
    onNavigate('symptom-assessment');
  };

  const toggleVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setQuickSymptom('Dull throbbing headache for 5 days, aggravated when standing up quickly.');
        setIsRecording(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Sub-header disclaimer banner */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">info</span>
          <p className="text-xs text-on-surface leading-relaxed">
            <span className="font-bold text-on-surface">Important:</span> CareRoute AI guides you to appropriate medical care based on reported symptoms. If experiencing life-threatening symptoms, dial <strong>112 (ERSS)</strong> or <strong>102 (National Ambulance Service)</strong> immediately.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold px-2.5 py-1 bg-surface-container rounded-full text-on-surface-variant flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Clinical Protocol v4.2 Active
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-tight">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Clinical Navigation Engine
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
            Describe your symptoms. <br />
            <span className="text-primary">Find the right care.</span>
          </h1>

          <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
            CareRoute AI triages your symptoms using evidence-based clinical protocols, directing you to the correct specialty, urgency level, and in-network specialists.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('symptom-assessment')}
              className="px-6 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Start Health Assessment</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('specialist-directory')}
              className="px-6 py-3.5 bg-surface-container-low text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container transition-colors border border-outline-variant/30 cursor-pointer"
            >
              Find a Specialist Directly
            </button>
          </div>

          {/* Trust statistics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/20 max-w-lg">
            <div>
              <span className="block text-xl sm:text-2xl font-black text-on-surface">12,000+</span>
              <span className="text-xs text-on-surface-variant font-medium">Verified Specialists</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-primary">100%</span>
              <span className="text-xs text-on-surface-variant font-medium">Zero Hallucinations</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-secondary">2 Min</span>
              <span className="text-xs text-on-surface-variant font-medium">Avg Triage Speed</span>
            </div>
          </div>
        </div>

        {/* Quick Symptom Starter Widget */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-lg border border-outline-variant/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Interactive Symptom Entry
                </span>
              </div>
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                AI Assistant Ready
              </span>
            </div>

            <div className="relative">
              <textarea
                value={quickSymptom}
                onChange={(e) => setQuickSymptom(e.target.value)}
                placeholder="e.g., I've had a dull headache for 5 days and feel dizzy when I stand up..."
                rows={4}
                className="w-full p-3.5 text-xs text-on-surface bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
              <button
                type="button"
                onClick={toggleVoice}
                className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors cursor-pointer ${
                  isRecording
                    ? 'bg-error text-on-error animate-pulse'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                title="Voice input"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isRecording ? 'mic' : 'mic_none'}
                </span>
              </button>
            </div>

            {/* Suggestions */}
            <div>
              <span className="text-[11px] font-semibold text-on-surface-variant block mb-2">
                Common Symptom Patterns:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleSuggestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setQuickSymptom(item)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer text-left"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleStartWithSymptom()}
              className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Route My Care Pathway</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            {/* Live Triage Signal card */}
            <div className="pt-3 border-t border-surface-container flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYvD0Rmdux9iUDsQtx6VDCdRgZIAXhYpo5BaZhVKvM5aJotBIoJOajwpx5R6gI8dh53go1F9KbdCB5H-r7N80B4dU1FOSnOBIq8SggZXx91jK_1M2dEWdAk9n4loF4px8AI0jOflatEvPIs0-TAkyZFmQ7NiLx5YVqMzghcM9izYCBYO6oC2tzfXU6Vuv9IWHRbsCt1Af9HDB-FH1to7yg88Rvyt-4QIuttDM-PY1LVV03mJyIDou1KQ"
                alt="Dr. Maya Sharma"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <p className="text-xs font-bold text-on-surface leading-tight">Dr. Maya Sharma, MD</p>
                <p className="text-[11px] text-on-surface-variant">Lead Triage Validator • Available Today</p>
              </div>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The CareRoute Pathway (4 Steps) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Clear Healthcare Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mt-1">
            The CareRoute Pathway
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
            Eliminating diagnostic confusion through structured, protocol-driven navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs relative">
            <span className="text-3xl font-black text-surface-container-high block mb-3">01</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </div>
            <h3 className="font-bold text-sm text-on-surface mb-1">Symptoms</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Describe how you feel in plain conversational language. Voice and text intake supported.
            </p>
          </div>

          <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs relative">
            <span className="text-3xl font-black text-surface-container-high block mb-3">02</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <h3 className="font-bold text-sm text-on-surface mb-1">AI Clinical Triage</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Adaptive questions clarify severity and rule out emergency red flags using AAN/AAO standards.
            </p>
          </div>

          <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs relative">
            <span className="text-3xl font-black text-surface-container-high block mb-3">03</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
            </div>
            <h3 className="font-bold text-sm text-on-surface mb-1">Specialist Match</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Direct routing to the exact clinical specialty—neurology, ENT, or primary care.
            </p>
          </div>

          <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs relative">
            <span className="text-3xl font-black text-surface-container-high block mb-3">04</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
            <h3 className="font-bold text-sm text-on-surface mb-1">Confirmed Care</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Book live in-person or video consultations with verified nearby clinicians.
            </p>
          </div>
        </div>
      </div>

      {/* Guiding Principles in Digital Healthcare */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
          Guiding Principles in Digital Healthcare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">navigation</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Non-Diagnostic Navigation</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              CareRoute AI directs you to the right type of doctor rather than attempting to diagnose conditions. We connect you with verified human clinicians.
            </p>
          </div>

          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Red-Flag Emergency Detection</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Real-time monitoring detects dangerous symptom combinations and immediately redirects users to 911 or nearby emergency care centers.
            </p>
          </div>

          <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Private &amp; HIPAA Compliant</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your health information is end-to-end encrypted and never sold. Sessions comply strictly with healthcare data protection standards.
            </p>
          </div>
        </div>
      </div>

      {/* Architected for Clinical Accuracy - Bento Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
              Architected for Clinical Accuracy
            </h2>
            <p className="text-xs text-on-surface-variant">
              Translating patient descriptions into precise clinical referrals.
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full hidden sm:inline-block">
            Evidence-Based AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1 */}
          <div className="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Step 01 • Intake
            </span>
            <h3 className="font-bold text-base text-on-surface">
              Plain-Language Symptom Entry
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Speak or type naturally. Our NLP engine parses duration, severity, and context without requiring medical terminology.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold">Natural Language Parsing</span>
                <span className="text-primary font-bold">99.4% Precision</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '99.4%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
              Step 02 • Evaluation
            </span>
            <h3 className="font-bold text-base text-on-surface">Adaptive Questioning</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Dynamic follow-ups rule out emergency indicators and narrow down the affected body system.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Onset Duration</span>
                <span className="font-bold text-on-surface">Sub-Acute (5 Days)</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Pain Intensity</span>
                <span className="font-bold text-primary">5 of 10 (Moderate)</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Step 03 • Matching
            </span>
            <h3 className="font-bold text-base text-on-surface">Algorithmic Routing</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Identifies the primary clinical specialty and alternative pathways with transparent confidence scores.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">neurology</span>
                <span className="font-bold text-on-surface">Primary: Neurology Clinic</span>
              </div>
              <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                94% Match
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Step 04 • Appointment
            </span>
            <h3 className="font-bold text-base text-on-surface">Real-Time Confirmation</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Book directly into provider calendars with automatic insurance verification.
            </p>
            <div className="flex items-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmd_7zrgCPP8KzrspQ-A7cJUoqZilqdrvL_Wp0wJ0ooRtuFD8lfd8BbWetrA9QywrJHaZysei5GWW1BpVg29Seiaugpro1u8x5KkICsyC5wC6XnuObgsg8ZQ8HawqBGFTGk8pWcDNBEukYqIpG6gXb5hnAc7hgLOsxPcu3Yysrc9NCsHkmLE-5YdL2FoRf3J-ZgZfgVsfWp_aRFX-J5MYRuNok9nZsPniW18BsdZDT-bCh4ZBjRghgNA"
                alt="Dr. David Chen"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-xs">
                <span className="font-bold text-on-surface block leading-tight">Dr. David Chen, MD</span>
                <span className="text-[11px] text-[#047857] font-semibold">Today at 4:30 PM Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Open Clinical Triage Architecture Expandable */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden transition-all">
        <button
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">account_tree</span>
            <div>
              <h3 className="text-sm font-bold text-on-surface">
                Inspect Open Clinical Triage Architecture
              </h3>
              <p className="text-xs text-on-surface-variant">
                View the 4-stage decision tree, FHIR compliance, and evidence-based safety guardrails.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">
            {showArchitecture ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {showArchitecture && (
          <div className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest space-y-6 text-xs text-on-surface animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-primary uppercase">Stage A</span>
                <h4 className="font-bold text-sm mt-1">Vector Parsing</h4>
                <p className="text-on-surface-variant mt-1 text-[11px]">
                  Extracts chief complaint embeddings, duration tokens, and severity metrics into structured JSON.
                </p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl border border-error/30">
                <span className="text-[10px] font-bold text-error uppercase">Stage B</span>
                <h4 className="font-bold text-sm mt-1">Red-Flag Filter</h4>
                <p className="text-on-surface-variant mt-1 text-[11px]">
                  Immediate check against 42 emergency criteria (thunderclap onset, neurological deficit, cardiac indicators).
                </p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-secondary uppercase">Stage C</span>
                <h4 className="font-bold text-sm mt-1">Specialty Routing</h4>
                <p className="text-on-surface-variant mt-1 text-[11px]">
                  Weighted multi-class routing aligns clusters with ICD-11 specialty benchmarks (AAN, AAO-HNS).
                </p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-[#047857] uppercase">Stage D</span>
                <h4 className="font-bold text-sm mt-1">Provider Scheduling</h4>
                <p className="text-on-surface-variant mt-1 text-[11px]">
                  HL7/FHIR schedule query retrieves next available in-network clinical slots matching urgency window.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-on-surface-variant">
              <span>Standard Compliance: HL7 FHIR v4.0.1 • LOINC 94500-6 • SNOMED CT</span>
              <span className="font-semibold text-primary">Zero Diagnostic Claim Architecture</span>
            </div>
          </div>
        )}
      </div>

      {/* Immediate Emergency Hotlines Banner (India ERSS 112 & NAS 102) */}
      <div className="bg-[#FEF2F2] border border-error/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#991B1B]">Need Immediate Emergency Assistance? (India ERSS)</h3>
            <p className="text-xs text-[#7F1D1D]">
              Dial <strong>112</strong> for Integrated Helpline (Police, Fire &amp; Rescue, Health services etc) or <strong>102</strong> for National Ambulance Service (NAS).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenEmergency}
            className="px-4 py-2 bg-error text-on-error rounded-xl font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs whitespace-nowrap"
          >
            Dial 112 (ERSS)
          </button>
          <button
            onClick={onOpenEmergency}
            className="px-4 py-2 bg-blue-700 text-white rounded-xl font-bold text-xs hover:bg-blue-800 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            Ambulance 102 (NAS)
          </button>
        </div>
      </div>
    </div>
  );
};
