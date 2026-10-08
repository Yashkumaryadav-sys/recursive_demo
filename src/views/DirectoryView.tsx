import React, { useState } from 'react';
import { Doctor } from '../types';
import { DOCTORS } from '../data/mockData';

interface DirectoryViewProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenDoctorCv: (doctor: Doctor) => void;
  onBookDirect: (doctor: Doctor) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectDoctor,
  onOpenDoctorCv,
  onBookDirect,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Neurology');
  const [selectedRadius, setSelectedRadius] = useState<'5' | '10' | 'all'>('10');
  const [selectedInsurance, setSelectedInsurance] = useState('all');
  const [activeDoctorId, setActiveDoctorId] = useState('dr-ankur-sharma');
  const [mapZoom, setMapZoom] = useState(1);

  const filteredDoctors = DOCTORS.filter((doc) => {
    if (selectedSpecialty !== 'All' && !doc.specialty.includes(selectedSpecialty)) {
      return false;
    }
    if (selectedRadius === '5' && doc.distanceKm > 5) return false;
    if (selectedRadius === '10' && doc.distanceKm > 10) return false;
    if (selectedInsurance !== 'all' && !doc.acceptedInsurances.includes(selectedInsurance)) {
      return false;
    }
    return true;
  });

  const activeDoc = DOCTORS.find((d) => d.id === activeDoctorId) || DOCTORS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
        <span>Triage Intake</span>
        <span>/</span>
        <span>Symptom Assessment</span>
        <span>/</span>
        <span className="font-bold text-primary">Specialist Discovery</span>
      </div>

      {/* Protocol Banner */}
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
          <p className="text-xs text-on-surface">
            <strong>Clinical referral protocol active:</strong> Direct matching for sub-acute headache and vestibular triage (Protocol NEU-204-T).
          </p>
        </div>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          In-Network Guaranteed
        </span>
      </div>

      {/* Search & Filter Ribbon */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/30 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Specialty Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Specialty Focus
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="Neurology">Neurology (Recommended)</option>
              <option value="Internal Medicine">Internal Medicine / PCP</option>
              <option value="ENT">ENT / Otolaryngology</option>
              <option value="All">All Medical Specialties</option>
            </select>
          </div>

          {/* Location Area */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Location Area
            </label>
            <div className="flex items-center bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs text-on-surface font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary mr-1.5">location_on</span>
              <span>Delhi-NCR / Metro Central (within 10 km)</span>
            </div>
          </div>

          {/* Triage Availability */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Triage Availability
            </label>
            <div className="flex items-center bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs text-on-surface font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#047857] mr-1.5">bolt</span>
              <span>Next Available (Today &amp; Tomorrow)</span>
            </div>
          </div>

          {/* Insurance Carrier */}
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Insurance Carrier
            </label>
            <select
              value={selectedInsurance}
              onChange={(e) => setSelectedInsurance(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="all">All In-Network Insurances</option>
              <option value="Star Health">Star Health &amp; Allied Insurance</option>
              <option value="HDFC ERGO">HDFC ERGO Health</option>
              <option value="Care Health">Care Health Insurance</option>
              <option value="ICICI Lombard">ICICI Lombard</option>
              <option value="CGHS">CGHS (Central Govt Health Scheme)</option>
              <option value="Ayushman Bharat">Ayushman Bharat (PM-JAY)</option>
            </select>
          </div>
        </div>

        {/* Distance Radius Pills & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-container text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-on-surface-variant">Radius:</span>
            <button
              onClick={() => setSelectedRadius('5')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedRadius === '5'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Under 5 km
            </button>
            <button
              onClick={() => setSelectedRadius('10')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedRadius === '10'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Under 10 km
            </button>
            <button
              onClick={() => setSelectedRadius('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedRadius === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Within Metro
            </button>
          </div>

          <span className="text-primary font-bold text-xs">
            {filteredDoctors.length} Verified Neurologists accepting referral priority
          </span>
        </div>
      </div>

      {/* Main 2-Column Section: Left Vector Route Map, Right Doctor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vector Route Map */}
        <div className="lg:col-span-5 space-y-4 sticky top-28">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
            {/* Map Header */}
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Live Transit &amp; Route Map</h4>
                  <p className="text-[11px] text-on-surface-variant">Metro Health District</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMapZoom(Math.min(mapZoom + 0.2, 1.8))}
                  className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface cursor-pointer"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom(Math.max(mapZoom - 0.2, 0.8))}
                  className="w-7 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface cursor-pointer"
                  title="Zoom Out"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom(1)}
                  className="px-2 h-7 rounded-lg bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-on-surface cursor-pointer"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Interactive Vector Map Canvas */}
            <div className="relative bg-[#E8EEF5] h-80 overflow-hidden select-none">
              <svg
                viewBox="0 0 400 320"
                className="w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `scale(${mapZoom})` }}
              >
                {/* Background Grid & Land masses */}
                <rect width="400" height="320" fill="#EBF2F7" />

                {/* River Feature */}
                <path
                  d="M0 240 Q120 210, 200 230 T400 210 L400 260 L0 280 Z"
                  fill="#CFE2FE"
                  opacity="0.7"
                />

                {/* City Streets & Highway Grids */}
                <line x1="40" y1="0" x2="40" y2="320" stroke="#FFFFFF" strokeWidth="6" />
                <line x1="140" y1="0" x2="140" y2="320" stroke="#FFFFFF" strokeWidth="8" />
                <line x1="260" y1="0" x2="260" y2="320" stroke="#FFFFFF" strokeWidth="8" />
                <line x1="360" y1="0" x2="360" y2="320" stroke="#FFFFFF" strokeWidth="6" />

                <line x1="0" y1="60" x2="400" y2="60" stroke="#FFFFFF" strokeWidth="6" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="#FFFFFF" strokeWidth="10" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#FFFFFF" strokeWidth="6" />

                {/* Metro Transit Line (Teal dashed) */}
                <path
                  d="M20 300 Q140 180, 260 140 T380 40"
                  stroke="#00685f"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  fill="none"
                />

                {/* Route Path from User Location to Dr. Sharma */}
                <path
                  d="M80 180 L140 180 L140 140 L240 140 L240 100"
                  stroke="#00685f"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-pulse"
                />

                {/* User Location Pin */}
                <g transform="translate(80, 180)">
                  <circle r="12" fill="#3B82F6" opacity="0.3" className="animate-ping" />
                  <circle r="8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="0" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">
                    You
                  </text>
                </g>

                {/* Doctor 1 Pin: Dr. Ankur Sharma */}
                <g
                  transform="translate(240, 100)"
                  className="cursor-pointer"
                  onClick={() => setActiveDoctorId('dr-ankur-sharma')}
                >
                  <circle
                    r={activeDoctorId === 'dr-ankur-sharma' ? '14' : '10'}
                    fill="#00685f"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                  <text x="0" y="-16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#00685f">
                    Dr. Sharma (2.1 km)
                  </text>
                  <circle r="4" fill="#FFFFFF" />
                </g>

                {/* Doctor 2 Pin: Dr. Priya Patel */}
                <g
                  transform="translate(320, 70)"
                  className="cursor-pointer"
                  onClick={() => setActiveDoctorId('dr-priya-patel')}
                >
                  <circle
                    r={activeDoctorId === 'dr-priya-patel' ? '14' : '10'}
                    fill="#006398"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text x="0" y="-14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#00476e">
                    Dr. Patel (3.8 km)
                  </text>
                </g>

                {/* Doctor 3 Pin: Dr. Marcus Vance */}
                <g
                  transform="translate(180, 240)"
                  className="cursor-pointer"
                  onClick={() => setActiveDoctorId('dr-marcus-vance')}
                >
                  <circle
                    r={activeDoctorId === 'dr-marcus-vance' ? '14' : '10'}
                    fill="#6D7A77"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3D4947">
                    Dr. Vance (5.2 km)
                  </text>
                </g>
              </svg>

              {/* Transit Route Summary Pill */}
              <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur-xs p-3 rounded-2xl shadow-md border border-outline-variant/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">directions_car</span>
                  <span className="font-bold text-on-surface">8 min drive to {activeDoc.name}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-md">
                  Optimal Route
                </span>
              </div>
            </div>

            {/* Quick Transit breakdown */}
            <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[10px]">Drive</span>
                <span className="font-bold text-on-surface">8 mins</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[10px]">Metro L2</span>
                <span className="font-bold text-on-surface">14 mins</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded-xl">
                <span className="text-on-surface-variant block text-[10px]">Parking</span>
                <span className="font-bold text-[#047857]">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Doctor Specialist Cards */}
        <div className="lg:col-span-7 space-y-6">
          {filteredDoctors.map((doc) => {
            const isFeatured = doc.isBestFit;
            const isSelected = doc.id === activeDoctorId;

            return (
              <div
                key={doc.id}
                onMouseEnter={() => setActiveDoctorId(doc.id)}
                className={`bg-surface-container-lowest rounded-3xl border transition-all p-6 sm:p-7 space-y-5 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-outline-variant/30 hover:border-primary/40 shadow-xs'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-xs">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      Primary Triage Match • 98% Score
                    </span>
                    <span className="text-xs text-[#047857] font-bold">Fastest Slot: Today 4:30 PM</span>
                  </div>
                )}

                {/* Profile row */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-primary/20 shadow-sm shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-on-surface">
                          {doc.name}, {doc.credentials}
                        </h3>
                        {doc.isVerified && (
                          <span className="material-symbols-outlined text-primary text-[18px]" title="Board Verified">
                            verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-primary">{doc.specialty}</p>
                      <p className="text-xs text-on-surface-variant">{doc.affiliation}</p>

                      <div className="flex items-center gap-3 text-xs text-on-surface-variant pt-0.5">
                        <span className="flex items-center gap-1 font-bold text-amber-600">
                          ★ {doc.rating} ({doc.reviewCount} reviews)
                        </span>
                        <span>•</span>
                        <span>{doc.distanceKm} km away</span>
                        <span>•</span>
                        <span>{doc.experienceYears} yrs exp</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenDoctorCv(doc)}
                    className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-xs font-semibold text-on-surface transition-colors cursor-pointer self-start shrink-0"
                  >
                    Full CV &amp; Bio
                  </button>
                </div>

                {/* Clinical Subspecialties */}
                <div className="flex flex-wrap gap-1.5">
                  {doc.subSpecialties.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-surface-container-low rounded-lg text-[11px] font-medium text-on-surface-variant"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Available Slot Chips */}
                <div className="space-y-2 pt-2 border-t border-surface-container">
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Next Available Triage Consultations
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {doc.availableSlots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onBookDirect(doc)}
                        className={`p-2 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                          slot.isToday
                            ? 'border-primary/50 bg-primary/5 hover:bg-primary/10 text-on-surface'
                            : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <span className={`text-[9px] uppercase font-bold block ${slot.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {slot.day}
                        </span>
                        <span className="font-bold text-xs">{slot.time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="text-xs text-on-surface-variant">
                    <span className="font-semibold text-on-surface">Insurance:</span> {doc.acceptedInsurances.slice(0, 3).join(', ')}...
                  </div>
                  <button
                    type="button"
                    onClick={() => onBookDirect(doc)}
                    className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    Book with {doc.name.split(' ')[1]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Confirmation Strip */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-on-surface">Triage Route Ready</h4>
            <p className="text-[11px] text-on-surface-variant">
              Protocol NEU-204-T matched to Dr. Ankur Sharma (Neurology)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onBookDirect(DOCTORS[0])}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Continue to Appointment Confirmation</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
