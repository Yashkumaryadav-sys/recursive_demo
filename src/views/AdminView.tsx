import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { INDIAN_EMERGENCY_CONTACTS } from '../data/mockData';

interface AdminViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'emergency' | 'providers' | 'jwt'>('emergency');
  const [dispatchAlertFilter, setDispatchAlertFilter] = useState<'all' | '112' | '102'>('all');

  const emergencyLogs = [
    {
      id: 'DISP-IN-98101',
      service: '112 ERSS',
      serviceType: 'erss',
      category: 'Acute Chest Pain / Cardio-trauma',
      location: 'Connaught Place, New Delhi (Pin: 110001)',
      ambulanceDispatched: 'NAS BLS-14 (En route, 4 mins)',
      destination: 'AIIMS Apex Trauma Center',
      timestamp: 'Today, 10:14 AM IST',
      status: 'In Transit',
      priority: 'CRITICAL',
    },
    {
      id: 'DISP-IN-98102',
      service: '102 NAS',
      serviceType: 'nas',
      category: 'Maternal Emergency Transport',
      location: 'Mayur Vihar Phase 1, East Delhi (Pin: 110091)',
      ambulanceDispatched: 'NAS ALS-08 (Assigned)',
      destination: 'Safdarjung Hospital, New Delhi',
      timestamp: 'Today, 09:48 AM IST',
      status: 'Dispatched',
      priority: 'HIGH',
    },
    {
      id: 'DISP-IN-98103',
      service: '112 ERSS',
      serviceType: 'erss',
      category: 'Head Injury / Motor Vehicle Collision',
      location: 'Ring Road Near Lajpat Nagar, New Delhi',
      ambulanceDispatched: 'CAT-112 Rapid Rescue Unit',
      destination: 'Max Super Specialty Saket',
      timestamp: 'Today, 09:12 AM IST',
      status: 'Admitted',
      priority: 'CRITICAL',
    },
    {
      id: 'DISP-IN-98104',
      service: '102 NAS',
      serviceType: 'nas',
      category: 'Sub-acute Neuro Orthostatic Syncope',
      location: 'South Extension Part II, New Delhi',
      ambulanceDispatched: 'CareRoute Network Transit',
      destination: 'Metro Apex Neurological Centre',
      timestamp: 'Today, 08:30 AM IST',
      status: 'Resolved',
      priority: 'SUB-ACUTE',
    },
  ];

  const filteredLogs = emergencyLogs.filter((log) => {
    if (dispatchAlertFilter === '112') return log.serviceType === 'erss';
    if (dispatchAlertFilter === '102') return log.serviceType === 'nas';
    return true;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Admin Portal Header */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary text-on-primary font-bold flex items-center justify-center text-2xl shadow-md">
            🛡️
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-on-surface">System Administration Portal</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                ABDM Node Node-09
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Logged in as: <strong>{user?.name || 'Rajesh Verma'}</strong> ({user?.email || 'admin@careroute.in'})
            </p>
            <div className="flex items-center gap-3 text-xs text-on-surface-variant pt-1">
              <span className="flex items-center gap-1 text-[#047857] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse"></span>
                ERSS 112 &amp; NAS 102 Dispatch Live
              </span>
              <span>•</span>
              <span className="text-primary font-semibold">JWT HS256 Token Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-xs font-bold text-on-surface transition-colors cursor-pointer"
          >
            Switch Account / Re-login
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant text-[11px] font-semibold">ERSS 112 Response</span>
            <span className="px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#047857] text-[10px] font-bold">Pan-India</span>
          </div>
          <span className="text-2xl font-extrabold text-primary mt-1 block">5.4 min</span>
          <span className="text-[10px] text-on-surface-variant">Mean ambulance arrival time</span>
        </div>

        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant text-[11px] font-semibold">NAS 102 Ambulance</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">Free Govt</span>
          </div>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block">1,480+</span>
          <span className="text-[10px] text-on-surface-variant">Active fleet ambulances online</span>
        </div>

        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant text-[11px] font-semibold">Registered Doctors</span>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">NMC / MCI</span>
          </div>
          <span className="text-2xl font-extrabold text-purple-700 mt-1 block">348</span>
          <span className="text-[10px] text-on-surface-variant">Verified specialists in Delhi-NCR</span>
        </div>

        <div className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant text-[11px] font-semibold">JWT Security</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">Zero Breach</span>
          </div>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">100%</span>
          <span className="text-[10px] text-on-surface-variant">HMAC-SHA256 authenticated</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container pb-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('emergency')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'emergency'
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
          }`}
        >
          🚨 Indian Emergency Dispatch Logs (112 ERSS &amp; 102 NAS)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('providers')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'providers'
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
          }`}
        >
          🏥 Provider &amp; Hospital Registry
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('jwt')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeTab === 'jwt'
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low'
          }`}
        >
          🔑 JWT Security &amp; Auth Tokens
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'emergency' && (
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-on-surface">Live Emergency Dispatch Intercepts</h3>
              <p className="text-xs text-on-surface-variant">
                Integrated Emergency Response Support System (112) &amp; National Ambulance Service (102)
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setDispatchAlertFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                  dispatchAlertFilter === 'all' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                }`}
              >
                All (4)
              </button>
              <button
                type="button"
                onClick={() => setDispatchAlertFilter('112')}
                className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                  dispatchAlertFilter === '112' ? 'bg-rose-600 text-white' : 'text-on-surface-variant'
                }`}
              >
                112 ERSS
              </button>
              <button
                type="button"
                onClick={() => setDispatchAlertFilter('102')}
                className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                  dispatchAlertFilter === '102' ? 'bg-blue-600 text-white' : 'text-on-surface-variant'
                }`}
              >
                102 NAS
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-3">Dispatch ID</th>
                  <th className="py-3 px-3">Helpline</th>
                  <th className="py-3 px-3">Clinical Category</th>
                  <th className="py-3 px-3">Location &amp; Pin</th>
                  <th className="py-3 px-3">Dispatched Unit</th>
                  <th className="py-3 px-3">Receiving Center</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-on-surface">{log.id}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-md font-bold text-[11px] ${
                          log.serviceType === 'erss'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {log.service}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-on-surface">{log.category}</td>
                    <td className="py-3.5 px-3 text-on-surface-variant">{log.location}</td>
                    <td className="py-3.5 px-3 font-semibold text-primary">{log.ambulanceDispatched}</td>
                    <td className="py-3.5 px-3 font-medium text-on-surface">{log.destination}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#047857]">
                        ● {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'providers' && (
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface">Empaneled Hospitals &amp; Medical Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-2">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">Apex Level-1 Trauma</span>
              <h4 className="font-bold text-sm text-on-surface">AIIMS Apex Trauma Center</h4>
              <p className="text-xs text-on-surface-variant">Ansari Nagar, Ring Road, New Delhi</p>
              <div className="text-xs text-[#047857] font-semibold">Helpline: +91 11 2658 8500 / 112</div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-2">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">Multi-Specialty</span>
              <h4 className="font-bold text-sm text-on-surface">Apollo Super Specialty Hospital</h4>
              <p className="text-xs text-on-surface-variant">Sarita Vihar, Mathura Road, New Delhi</p>
              <div className="text-xs text-[#047857] font-semibold">Helpline: +91 11 2692 5858 / 102</div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-2">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">Neuro-Spine Institute</span>
              <h4 className="font-bold text-sm text-on-surface">Fortis Memorial Research Institute</h4>
              <p className="text-xs text-on-surface-variant">Sector 44, Gurugram, Haryana</p>
              <div className="text-xs text-[#047857] font-semibold">Helpline: +91 124 496 2200 / 112</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jwt' && (
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface">JWT Authentication State</h3>
          <p className="text-xs text-on-surface-variant">
            Current active session verified via <strong>CareRoute HMAC-SHA256</strong> signature.
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl text-xs font-mono text-on-surface break-all border border-outline-variant/20">
            {token || 'No active JWT token found'}
          </div>
        </div>
      )}
    </div>
  );
};
