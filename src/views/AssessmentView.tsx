import React, { useState } from 'react';
import { ViewMode, TriageAssessmentData } from '../types';

interface AssessmentViewProps {
  data: TriageAssessmentData;
  onChangeData: (data: TriageAssessmentData) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenEmergency: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  data,
  onChangeData,
  onNavigate,
  onOpenEmergency,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const removeTag = (tagToRemove: string) => {
    onChangeData({
      ...data,
      symptomTags: data.symptomTags.filter((t) => t !== tagToRemove),
    });
  };

  const addTag = () => {
    if (newTagInput.trim() && !data.symptomTags.includes(newTagInput.trim())) {
      onChangeData({
        ...data,
        symptomTags: [...data.symptomTags, newTagInput.trim()],
      });
      setNewTagInput('');
    }
  };

  const handleToggleVoice = () => {
    setIsRecording(!isRecording);
  };

  const handleSafetyRadioChange = (isEmergency: boolean) => {
    if (isEmergency) {
      onChangeData({ ...data, emergencyFlag: true });
      onOpenEmergency();
    } else {
      onChangeData({ ...data, emergencyFlag: false });
    }
  };

  const handleGenerateRoute = () => {
    if (data.emergencyFlag) {
      onOpenEmergency();
    } else {
      onNavigate('results');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Patient Profile & Stepper Header */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[22px]">person</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface">Patient: Ankur Sharma, Age 34</h2>
            <p className="text-xs text-on-surface-variant">ABHA ID: 91-4821-7749-2018 • Blood Pressure: Normotensive (118/76 mmHg)</p>
          </div>
        </div>

        {/* Milestone Stepper */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#047857] font-semibold">
            <span className="w-5 h-5 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[12px] font-bold">✓</span>
            <span>1. Intake</span>
          </div>
          <span className="text-outline-variant">→</span>
          <div className="flex items-center gap-1.5 text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>2. Adaptive Triaging</span>
          </div>
          <span className="text-outline-variant">→</span>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
            <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-[11px]">3</span>
            <span>Care Route</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intake & Parameters */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card 1: Chief Complaints */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Chief Complaint &amp; Description
              </span>
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isRecording
                    ? 'bg-error text-on-error animate-pulse'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isRecording ? 'graphic_eq' : 'mic'}
                </span>
                {isRecording ? 'Listening...' : 'Voice Input'}
              </button>
            </div>

            {/* Voice Soundwave Animation when recording */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1 p-2 bg-error-container/20 rounded-xl">
                <div className="w-1 h-5 bg-error rounded-full animate-bounce"></div>
                <div className="w-1 h-8 bg-error rounded-full animate-bounce [animation-delay:100ms]"></div>
                <div className="w-1 h-12 bg-error rounded-full animate-bounce [animation-delay:200ms]"></div>
                <div className="w-1 h-6 bg-error rounded-full animate-bounce [animation-delay:300ms]"></div>
                <div className="w-1 h-10 bg-error rounded-full animate-bounce [animation-delay:150ms]"></div>
                <span className="text-xs font-semibold text-error ml-2">Voice stream active • Speak clearly</span>
              </div>
            )}

            <div>
              <label className="text-xs text-on-surface-variant font-medium block mb-1">
                Describe your symptoms in your own words:
              </label>
              <textarea
                value={data.chiefComplaint}
                onChange={(e) => onChangeData({ ...data, chiefComplaint: e.target.value })}
                rows={4}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
              />
            </div>

            {/* Parameters: Duration & Severity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-on-surface-variant font-bold block mb-1.5">
                  Symptom Duration
                </label>
                <select
                  value={data.duration}
                  onChange={(e) => onChangeData({ ...data, duration: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs text-on-surface font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="< 24 hours">&lt; 24 hours (Acute)</option>
                  <option value="1-3 days">1 to 3 days</option>
                  <option value="5 days">5 days (Sub-acute)</option>
                  <option value="1-2 weeks">1 to 2 weeks</option>
                  <option value="> 1 month">&gt; 1 month (Chronic)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-on-surface-variant font-bold">
                    Pain Severity Scale
                  </label>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {data.painSeverity}/10 {data.painSeverity > 6 ? 'Severe' : data.painSeverity > 3 ? 'Moderate' : 'Mild'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={data.painSeverity}
                  onChange={(e) =>
                    onChangeData({ ...data, painSeverity: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-[#00685f] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant">
                  <span>1 (Noticeable)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (Debilitating)</span>
                </div>
              </div>
            </div>

            {/* Extracted Clinical Tags */}
            <div className="space-y-2 pt-2 border-t border-surface-container">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Clinical Tokens Extracted
              </label>
              <div className="flex flex-wrap gap-1.5">
                {data.symptomTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded-lg text-xs font-medium text-on-surface"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-on-surface-variant hover:text-error cursor-pointer"
                      title="Remove token"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add another symptom token..."
                  className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 bg-surface-container text-on-surface font-semibold text-xs rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Evidence-based Clinical Protocol card */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">science</span>
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Clinical Protocol Grounding
              </h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Evaluating presentation according to the <strong>American Academy of Neurology (AAN)</strong> Practice Guidelines for persistent headache and the <strong>AAO-HNS Vestibular Triage Framework v2.4</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Adaptive Questions & Red-Flag Safeguard */}
        <div className="lg:col-span-6 space-y-6">
          {/* Telemetry strip */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs font-bold text-primary">Differential Synthesis Active</span>
            </div>
            <span className="text-[11px] font-semibold text-on-surface-variant">
              Target: Neurology vs Vestibular
            </span>
          </div>

          {/* Adaptive Question 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Question 1 of 2
            </span>
            <h3 className="text-sm font-bold text-on-surface leading-snug">
              To evaluate neurological vs vestibular patterns, how would you describe the dizziness?
            </h3>

            <div className="space-y-2 pt-1">
              <label
                onClick={() => onChangeData({ ...data, q1Dizziness: 'lightheaded' })}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  data.q1Dizziness === 'lightheaded'
                    ? 'border-primary bg-primary/5 text-on-surface'
                    : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="q1"
                  checked={data.q1Dizziness === 'lightheaded'}
                  onChange={() => onChangeData({ ...data, q1Dizziness: 'lightheaded' })}
                  className="mt-1 accent-[#00685f]"
                />
                <div className="text-xs">
                  <p className="font-bold text-on-surface">Lightheadedness / Feeling faint</p>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Commonly associated with orthostatic, vascular, or tension headache cofactors.
                  </p>
                </div>
              </label>

              <label
                onClick={() => onChangeData({ ...data, q1Dizziness: 'vertigo' })}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  data.q1Dizziness === 'vertigo'
                    ? 'border-primary bg-primary/5 text-on-surface'
                    : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="q1"
                  checked={data.q1Dizziness === 'vertigo'}
                  onChange={() => onChangeData({ ...data, q1Dizziness: 'vertigo' })}
                  className="mt-1 accent-[#00685f]"
                />
                <div className="text-xs">
                  <p className="font-bold text-on-surface">Room spinning around me (True Vertigo)</p>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Suggests inner-ear vestibular pathology (e.g., BPPV or vestibular migraine).
                  </p>
                </div>
              </label>

              <label
                onClick={() => onChangeData({ ...data, q1Dizziness: 'unsteadiness' })}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  data.q1Dizziness === 'unsteadiness'
                    ? 'border-primary bg-primary/5 text-on-surface'
                    : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="q1"
                  checked={data.q1Dizziness === 'unsteadiness'}
                  onChange={() => onChangeData({ ...data, q1Dizziness: 'unsteadiness' })}
                  className="mt-1 accent-[#00685f]"
                />
                <div className="text-xs">
                  <p className="font-bold text-on-surface">Unsteadiness while walking only</p>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Gait or proprioceptive imbalance pattern.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Adaptive Question 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Question 2 of 2
            </span>
            <h3 className="text-sm font-bold text-on-surface leading-snug">
              Does bright light or loud sound intensify the headache?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => onChangeData({ ...data, q2Sensitivity: 'yes' })}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  data.q2Sensitivity === 'yes'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">light_mode</span>
                  <span className="font-bold text-xs">Yes, noticeable sensitivity</span>
                </div>
                <p className="text-on-surface-variant text-[11px] mt-1">
                  Correlates with photophobia / migraine cephalea.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onChangeData({ ...data, q2Sensitivity: 'no' })}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  data.q2Sensitivity === 'no'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                  <span className="font-bold text-xs">No, light has no effect</span>
                </div>
                <p className="text-on-surface-variant text-[11px] mt-1">
                  Correlates with tension or cervicogenic patterns.
                </p>
              </button>
            </div>
          </div>

          {/* Critical Red-Flag Safety Protocol Card */}
          <div className="bg-[#FEF2F2] p-5 rounded-2xl border-2 border-error/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[22px]">crisis_alert</span>
              <h4 className="text-xs font-bold text-[#991B1B] uppercase tracking-wider">
                Vital Safety Screening (Urgent Red-Flag Protocol)
              </h4>
            </div>
            <p className="text-xs text-[#7F1D1D] leading-relaxed">
              Are you experiencing sudden one-sided facial drooping, difficulty speaking, severe chest pressure, or loss of consciousness? If yes, dial <strong>112 (ERSS)</strong> or <strong>102 (NAS)</strong> immediately.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white cursor-pointer">
                <input
                  type="radio"
                  name="safety"
                  checked={!data.emergencyFlag}
                  onChange={() => handleSafetyRadioChange(false)}
                  className="accent-[#00685f]"
                />
                <span className="font-semibold text-on-surface">
                  No, none of these critical symptoms are present.
                </span>
              </label>
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white cursor-pointer">
                <input
                  type="radio"
                  name="safety"
                  checked={data.emergencyFlag}
                  onChange={() => handleSafetyRadioChange(true)}
                  className="accent-error"
                />
                <span className="font-bold text-error">
                  Yes, I am experiencing one of these (Triggers Emergency Mode).
                </span>
              </label>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-on-surface-variant hover:text-on-surface flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Previous Step
            </button>

            <button
              type="button"
              onClick={handleGenerateRoute}
              className="px-6 py-3.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Generate Risk Assessment &amp; Care Pathway</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Summary Strip */}
      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-on-surface">
        <div>
          <span className="text-on-surface-variant block text-[11px] font-medium">Targeted Specialty Candidate</span>
          <span className="font-bold text-on-surface">Neurology &amp; Vestibular Care</span>
        </div>
        <div>
          <span className="text-on-surface-variant block text-[11px] font-medium">Recommended Consultation Window</span>
          <span className="font-bold text-primary">Within 48 to 72 Hours</span>
        </div>
        <div>
          <span className="text-on-surface-variant block text-[11px] font-medium">Clinical Oversight</span>
          <span className="font-bold text-on-surface">Board-Certified Pathway Algorithms</span>
        </div>
      </div>
    </div>
  );
};
