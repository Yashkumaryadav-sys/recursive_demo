/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, UserRole, Doctor, Appointment, TriageAssessmentData } from './types';
import { INITIAL_ASSESSMENT, INITIAL_APPOINTMENTS } from './data/mockData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { PdfSummaryModal } from './components/PdfSummaryModal';
import { DoctorCvModal } from './components/DoctorCvModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { HomeView } from './views/HomeView';
import { AssessmentView } from './views/AssessmentView';
import { ResultsView } from './views/ResultsView';
import { DirectoryView } from './views/DirectoryView';
import { AppointmentsView } from './views/AppointmentsView';
import { DashboardView } from './views/DashboardView';
import { DoctorView } from './views/DoctorView';
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';

function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const [assessmentData, setAssessmentData] = useState<TriageAssessmentData>(INITIAL_ASSESSMENT);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [quickSymptom, setQuickSymptom] = useState(
    'I have been experiencing a dull, persistent headache for the past 5 days, accompanied by intermittent dizziness when standing up quickly.'
  );

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isPdfSummaryOpen, setIsPdfSummaryOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [cvDoctor, setCvDoctor] = useState<Doctor | null>(null);

  // Automatically direct to role-appropriate initial screen when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (currentView === 'login') {
        if (user.role === 'admin') {
          setCurrentView('admin-portal');
        } else if (user.role === 'doctor') {
          setCurrentView('home');
        } else {
          setCurrentView('home');
        }
      }
    } else if (!isLoading && !isAuthenticated) {
      setCurrentView('login');
    }
  }, [isAuthenticated, user, isLoading]);

  // Sync quick symptom into assessmentData when changed from home
  useEffect(() => {
    if (quickSymptom) {
      setAssessmentData((prev) => ({
        ...prev,
        chiefComplaint: quickSymptom,
      }));
    }
  }, [quickSymptom]);

  const activeRole: UserRole = user?.role || 'patient';

  const handleNavigate = (view: ViewMode) => {
    if (!isAuthenticated && view !== 'login') {
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (newApt: Appointment) => {
    setAppointments([newApt, ...appointments]);
    handleNavigate('appointments');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-[36px] animate-spin">
            progress_activity
          </span>
          <span className="text-xs font-bold tracking-wider uppercase text-on-surface-variant">
            Initializing CareRoute AI Clinical Gateway...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans antialiased selection:bg-primary/20">
      {/* Universal Fixed Header - Blue-arrow panels removed, role is predefined */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        userRole={activeRole}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-36 sm:pt-28 pb-12">
        {/* If not authenticated, always show Login View */}
        {(!isAuthenticated || currentView === 'login') && (
          <LoginView onNavigate={handleNavigate} />
        )}

        {/* Admin Portal View */}
        {isAuthenticated && currentView === 'admin-portal' && (
          <AdminView onNavigate={handleNavigate} />
        )}

        {/* Doctor View: Shown if user role is doctor and not on explicit other views */}
        {isAuthenticated && currentView !== 'login' && currentView !== 'admin-portal' && activeRole === 'doctor' && (
          <DoctorView
            data={assessmentData}
            appointments={appointments}
            onOpenPdfSummary={() => setIsPdfSummaryOpen(true)}
          />
        )}

        {/* Patient / General Navigation Views */}
        {isAuthenticated && currentView !== 'login' && currentView !== 'admin-portal' && activeRole !== 'doctor' && (
          <>
            {currentView === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                quickSymptom={quickSymptom}
                setQuickSymptom={setQuickSymptom}
              />
            )}

            {currentView === 'symptom-assessment' && (
              <AssessmentView
                data={assessmentData}
                onChangeData={setAssessmentData}
                onNavigate={handleNavigate}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
              />
            )}

            {currentView === 'results' && (
              <ResultsView
                data={assessmentData}
                onNavigate={handleNavigate}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                onOpenPdfSummary={() => setIsPdfSummaryOpen(true)}
                onSelectDoctor={(doc) => {
                  setBookingDoctor(doc);
                }}
              />
            )}

            {currentView === 'specialist-directory' && (
              <DirectoryView
                onSelectDoctor={(doc) => setBookingDoctor(doc)}
                onOpenDoctorCv={(doc) => setCvDoctor(doc)}
                onBookDirect={(doc) => setBookingDoctor(doc)}
              />
            )}

            {currentView === 'appointments' && (
              <AppointmentsView
                appointments={appointments}
                onNavigate={handleNavigate}
                onOpenPdfSummary={() => setIsPdfSummaryOpen(true)}
                onCancelAppointment={handleCancelAppointment}
              />
            )}

            {currentView === 'patient-dashboard' && (
              <DashboardView
                data={assessmentData}
                appointments={appointments}
                onNavigate={handleNavigate}
                onOpenPdfSummary={() => setIsPdfSummaryOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Interactive Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <PdfSummaryModal
        isOpen={isPdfSummaryOpen}
        onClose={() => setIsPdfSummaryOpen(false)}
        data={assessmentData}
      />

      <DoctorCvModal
        doctor={cvDoctor}
        isOpen={!!cvDoctor}
        onClose={() => setCvDoctor(null)}
        onBookAppointment={(doc) => {
          setCvDoctor(null);
          setBookingDoctor(doc);
        }}
      />

      <AppointmentBookingModal
        doctor={bookingDoctor}
        isOpen={!!bookingDoctor}
        onClose={() => setBookingDoctor(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
