export type ViewMode =
  | 'home'
  | 'symptom-assessment'
  | 'results'
  | 'specialist-directory'
  | 'appointments'
  | 'patient-dashboard'
  | 'admin-portal'
  | 'login';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  regNumber?: string;
  nationalHealthId?: string;
  phone?: string;
  iss: string;
  iat: number;
  exp: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  regNumber?: string;
  nationalHealthId?: string;
  phone: string;
  token: string;
}

export interface Doctor {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  subSpecialties: string[];
  affiliation: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  imageUrl: string;
  isVerified: boolean;
  isBestFit?: boolean;
  matchScore?: number;
  consultationFeeInr?: number;
  nmcRegistration?: string;
  availableSlots: {
    label: string;
    day: string;
    time: string;
    isToday?: boolean;
  }[];
  education: string;
  languages: string[];
  philosophy: string;
  acceptedInsurances: string[];
  consultationModes: ('in-person' | 'telehealth')[];
}

export interface TriageAssessmentData {
  chiefComplaint: string;
  duration: string;
  painSeverity: number;
  symptomTags: string[];
  q1Dizziness: 'lightheaded' | 'vertigo' | 'unsteadiness';
  q2Sensitivity: 'yes' | 'no';
  emergencyFlag: boolean;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  dateTime: string;
  type: 'In-Person Consultation' | 'Video Telehealth';
  protocolCode: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  location: string;
  patientName: string;
}
