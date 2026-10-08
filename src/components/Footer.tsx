import React from 'react';
import { ViewMode } from '../types';
import { CARE_ROUTE_LOGO, INDIAN_EMERGENCY_CONTACTS } from '../data/mockData';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] mt-10 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                alt="CareRoute AI Logo"
                className="h-7 w-auto object-contain"
                src={CARE_ROUTE_LOGO}
              />
              <span className="text-base text-primary font-bold">CareRoute AI India</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Intelligent clinical specialty routing and triage pathways adhering to Indian Healthcare Standards (ABDM, MoHFW, and DISHA).
            </p>
          </div>

          {/* Col 2: Navigation Services */}
          <div className="space-y-3">
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">
              Navigation Services
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <button
                  onClick={() => onNavigate('symptom-assessment')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Symptom Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialist-directory')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Find In-Network Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Book Care Route
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-primary transition-colors cursor-pointer text-left font-semibold text-primary"
                >
                  JWT Portal Login (Admin/Doctor/Patient)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Indian Compliance & Trust */}
          <div className="space-y-3">
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">
              Indian Healthcare Standards
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span>ABDM / NDHM M2 Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">health_and_safety</span>
                <span>DISHA Data Privacy Protected</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
                <span>NMC Registered Practitioners</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                <span>JWT RFC 7519 Stateless Auth</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Indian Emergency Helplines */}
          <div className="space-y-3">
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">
              Emergency Helplines (India)
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenEmergency}
                className="w-full text-left p-2 bg-error-container/40 hover:bg-error-container/70 rounded-xl transition-colors cursor-pointer block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-error">112: Integrated ERSS</span>
                  <span className="text-[10px] bg-error text-on-error px-1.5 py-0.5 rounded font-semibold">24x7</span>
                </div>
                <span className="text-[11px] text-on-error-container block mt-0.5">
                  Police, Fire &amp; Rescue, Health services etc.
                </span>
              </button>

              <button
                onClick={onOpenEmergency}
                className="w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-800">102: National Ambulance</span>
                  <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.5 rounded font-semibold">Free NAS</span>
                </div>
                <span className="text-[11px] text-blue-900 block mt-0.5">
                  National Ambulance Service across India
                </span>
              </button>

              <div className="text-[11px] text-on-surface-variant flex items-center justify-between pt-1">
                <span>Disaster EMS: <strong>108</strong></span>
                <span>Tele-MANAS: <strong>14416</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p className="text-center md:text-left">
            © 2026 CareRoute AI India. Non-Diagnostic Medical Guidance Guarantee. All Emergency Calls Routed via ERSS 112 &amp; NAS 102.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy Policy (DISHA)
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#ethics" className="hover:text-primary transition-colors">
              MoHFW Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
