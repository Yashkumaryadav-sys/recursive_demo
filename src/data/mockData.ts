import { Doctor, Appointment, TriageAssessmentData } from '../types';

export const CARE_ROUTE_LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1Vp73qrznNvxYFlnhCSDjhdU4iQAFr0R5_N_OLmFg-Ew8qcfVZL3S_lx-2dFq9K24Q_paLU08uLwO_XliHzAKAxMvdzgS7llo7ad-wlSTzs6SZl4CXOKdpKMLoGBl7rHPuBtuejM_Zc7_l5CbWSu7Y5Zfoh-4L3crPn73_iR1qnh1c_F_gXR0UAuHlCJAYwn6QcIkEcuSvaDKM04MZvwz-ORHLpZk_ZiyR4lluP9w0f7FmVk4bM0dFJA0Y9';
export const PATIENT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1oEQ53ommVAIxu_mc0ntAKMCuLvYFJoFF0Mx4FGrVOHnXDydjQ8ApXq-8TX_2lR5RKlyADLmMlqQ3O3iNJ8z0Audt1iVEJtn47EddMggaWRoWL1LPkQLBHc8KsziDV1fnl0vsb52nWN37KVm7n_65i_fBbBc1V-qmwCek-FZvP70jJxYnDgJAx0fWdrv1pbpnamuQqC1VbQMwWFcxUWypxgixZEs11v5ZmV_3QU0sXZ-xwiIM0h8Bw';

// Indian Emergency Helplines
export const INDIAN_EMERGENCY_CONTACTS = {
  erss: {
    number: '112',
    name: 'Integrated Helpline (ERSS)',
    description: 'Emergency Response Support System (Police, Fire & Rescue, Health services etc.)',
    badge: 'Pan-India 24x7',
  },
  nas: {
    number: '102',
    name: 'National Ambulance Service (NAS)',
    description: 'Free Maternal, Neonatal & Basic Life Support Ambulance Service across India',
    badge: 'Toll-Free Govt Service',
  },
  ems: {
    number: '108',
    name: 'Disaster & Emergency Medical Service',
    description: 'Advanced Life Support & Critical Accident Response across Indian States',
    badge: 'Immediate Dispatch',
  },
  teleManas: {
    number: '14416',
    altNumber: '1800-89-14416',
    name: 'Tele-MANAS Crisis Helpline',
    description: 'National Mental Health Assistance & Crisis Intervention Program (MoHFW)',
    badge: '24x7 Multi-lingual',
  },
};

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-ankur-sharma',
    name: 'Dr. Ankur Sharma',
    credentials: 'MBBS, MD (Neurology)',
    specialty: 'Neurology',
    subSpecialties: ['Headache & Migraine', 'Vestibular Cephalea', 'Autonomic Disorders', 'Orthostatic Imbalance'],
    affiliation: 'Metro Apex Neurological Centre, South Extension Part-II, New Delhi',
    distanceKm: 2.1,
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 14,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1oEQ53ommVAIxu_mc0ntAKMCuLvYFJoFF0Mx4FGrVOHnXDydjQ8ApXq-8TX_2lR5RKlyADLmMlqQ3O3iNJ8z0Audt1iVEJtn47EddMggaWRoWL1LPkQLBHc8KsziDV1fnl0vsb52nWN37KVm7n_65i_fBbBc1V-qmwCek-FZvP70jJxYnDgJAx0fWdrv1pbpnamuQqC1VbQMwWFcxUWypxgixZEs11v5ZmV_3QU0sXZ-xwiIM0h8Bw',
    isVerified: true,
    isBestFit: true,
    matchScore: 98,
    consultationFeeInr: 1000,
    nmcRegistration: 'NMC / DMC Reg: 48291-N',
    availableSlots: [
      { label: 'Today at 4:30 PM IST', day: 'TODAY', time: '4:30 PM IST', isToday: true },
      { label: 'Tomorrow at 10:00 AM IST', day: 'TOMORROW', time: '10:00 AM IST' },
      { label: 'Tomorrow at 2:15 PM IST', day: 'TOMORROW', time: '2:15 PM IST' },
      { label: 'Thursday at 11:30 AM IST', day: 'THURSDAY', time: '11:30 AM IST' },
    ],
    education: 'AIIMS New Delhi (MBBS), PGIMER Chandigarh (MD Medicine), NIMHANS Bengaluru (DM Neurology)',
    languages: ['Hindi', 'English', 'Punjabi'],
    philosophy:
      'Comprehensive neurological triaging adhering to Indian Neurological Society and AAN benchmarks. Direct focus on headache chronification, orthostatic dysregulation, and patient-first care pathways.',
    acceptedInsurances: ['Star Health', 'HDFC ERGO', 'Care Health', 'ICICI Lombard', 'CGHS', 'Ayushman Bharat (PM-JAY)'],
    consultationModes: ['in-person', 'telehealth'],
  },
  {
    id: 'dr-priya-patel',
    name: 'Dr. Priya Patel',
    credentials: 'MBBS, MD, DNB (Neurology)',
    specialty: 'Neurology',
    subSpecialties: ['General Neurology', 'Electromyography (EMG)', 'Neuropathic Pain'],
    affiliation: 'Apollo Super Specialty Hospital, Mathura Road, New Delhi',
    distanceKm: 3.8,
    rating: 4.8,
    reviewCount: 98,
    experienceYears: 10,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxxGHUkXl455I06OWsSXtyS_ssTaFLIOcO4qjPS0yTDoRV5Qn80l72Ar0BVRINdptw5Wp3AgtCxfMmtUpMSDUfNdVyBeqA1MwlDgi5icByY9efZGhacHjFTiFMHn-fLtH8JwxaBuqoTkxBn6Tpc2e8_b0y_u12dsmvS_92AbuQkFcIfoNKjCdZBP6recj_RxQzbL5hRZ2u54KXuwlQyCfDyu6rZhGblCx8Vi3qB9N2e_20Tc6B6Itppg',
    isVerified: true,
    isBestFit: false,
    matchScore: 89,
    consultationFeeInr: 900,
    nmcRegistration: 'NMC / GMC Reg: 55102-G',
    availableSlots: [
      { label: 'Tomorrow at 11:00 AM IST', day: 'TOMORROW', time: '11:00 AM IST' },
      { label: 'Friday at 9:15 AM IST', day: 'FRIDAY', time: '9:15 AM IST' },
      { label: 'Monday at 1:30 PM IST', day: 'MONDAY', time: '1:30 PM IST' },
    ],
    education: 'Seth GS Medical College & KEM Hospital Mumbai (MBBS, MD), CMC Vellore Fellowship',
    languages: ['Hindi', 'English', 'Gujarati'],
    philosophy:
      'Neuromotor triage and evidence-driven diagnostic evaluations focusing on root-cause analysis and sustainable lifestyle recovery.',
    acceptedInsurances: ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'Max Bupa (Niva Bupa)', 'CGHS'],
    consultationModes: ['in-person', 'telehealth'],
  },
  {
    id: 'dr-marcus-vance',
    name: 'Dr. Vikram Malhotra',
    credentials: 'MBBS, MS, MCh (Neuro-Spine)',
    specialty: 'Neurology & Spine',
    subSpecialties: ['Cervicogenic Cephalea', 'Radiculopathy', 'Autonomic Balance'],
    affiliation: 'Fortis Memorial Research Institute (FMRI), Sector 44, Gurugram',
    distanceKm: 5.2,
    rating: 4.7,
    reviewCount: 115,
    experienceYears: 16,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhkhLtdSSWHBMv3kES4AAccHzI1xj1b53VjRqQy__2UJv9bEbhXMBnVzPj1lzcc9SzrUHeyd495x8eL_NeKKKU_H85rSVUFiXoozzmmar8dq4UO-lv_QJqKcksAeFaWEI42iHGBQ1jo1NjBZAMGTdIC3p0yoqqDmk9C8DYsQwr0xUpQkUpgl_xLkVZs7vfmVYPh_8AlR8ayLxc2jSmtKiaLwXoQfSApW9KmD8hU8T9gLoIc6sDvwBtng',
    isVerified: true,
    isBestFit: false,
    matchScore: 84,
    consultationFeeInr: 1200,
    nmcRegistration: 'NMC / HN-MC Reg: 38190-H',
    availableSlots: [
      { label: 'Thursday at 9:00 AM IST', day: 'THURSDAY', time: '9:00 AM IST' },
      { label: 'Friday at 3:00 PM IST', day: 'FRIDAY', time: '3:00 PM IST' },
      { label: 'Next Tuesday at 10:45 AM IST', day: 'TUESDAY', time: '10:45 AM IST' },
    ],
    education: 'Maulana Azad Medical College (MAMC Delhi), AIIMS Neuro-Spine Super-specialty Program',
    languages: ['Hindi', 'English'],
    philosophy:
      'Holistic neuro-structural evaluation, combining conservative non-invasive protocols with precision diagnostic clarity.',
    acceptedInsurances: ['Star Health', 'Care Health', 'ICICI Lombard', 'PM-JAY', 'Oriental Insurance'],
    consultationModes: ['in-person'],
  },
];

export const INITIAL_ASSESSMENT: TriageAssessmentData = {
  chiefComplaint:
    'I have been experiencing a dull, persistent headache for the past 5 days, accompanied by intermittent dizziness when standing up quickly.',
  duration: '5 days',
  painSeverity: 6,
  symptomTags: ['Headache for 5 days', 'Dizziness when standing', 'Light sensitivity', 'Neck stiffness'],
  q1Dizziness: 'lightheaded',
  q2Sensitivity: 'yes',
  emergencyFlag: false,
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    doctor: DOCTORS[0],
    dateTime: 'Today at 4:30 PM IST',
    type: 'In-Person Consultation',
    protocolCode: 'NEU-204-T (India ABDM)',
    status: 'Confirmed',
    location: 'Metro Apex Neurological Centre, Suite 410, South Extension Part-II, New Delhi (2.1 km away)',
    patientName: 'Ankur Sharma',
  },
];
