import React, { useState } from 'react';
import { 
  INITIAL_SCHOOL_PROFILE, 
  INITIAL_STUDENTS, 
  INITIAL_DOCUMENTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { SchoolProfile, Student, SchoolDocument, AuditLog } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Workspace } from './components/Workspace';
import { VideoDemoModal } from './components/VideoDemoModal';
import { ImportMasterModal } from './components/ImportMasterModal';
import { OperatorLoginModal } from './components/OperatorLoginModal';

// Dummy trial dataset specifically for "Coba Gratis / Mode Simulasi"
const DUMMY_TRIAL_STUDENTS: Student[] = [
  { student_id: 'DUMMY-01', source_id: 'SIM-001', nisn: '0098451201', nis: '232407001', nama: 'Ahmad Fauzan (Demo)', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif', academic_year: '2025/2026', gender: 'L', wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.' },
  { student_id: 'DUMMY-02', source_id: 'SIM-002', nisn: '0098451202', nis: '232407002', nama: 'Budi Santoso (Demo)', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif', academic_year: '2025/2026', gender: 'L', wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.' },
  { student_id: 'DUMMY-03', source_id: 'SIM-003', nisn: '0098451203', nis: '232407003', nama: 'Citra Kirana Dewi (Demo)', kelas: 'VIII-B', rombel: 'Kelas 8B', status: 'Aktif', academic_year: '2025/2026', gender: 'P', wali_kelas: 'Dra. Hj. Nurhayati, M.Pd.' },
  { student_id: 'DUMMY-04', source_id: 'SIM-004', nisn: '0098451204', nis: '232407004', nama: 'Fajar Nugraha (Demo)', kelas: 'VIII-A', rombel: 'Kelas 8A', status: 'Aktif', academic_year: '2025/2026', gender: 'L', wali_kelas: 'Drs. Supriyadi' },
  { student_id: 'DUMMY-05', source_id: 'SIM-005', nisn: '0098451205', nis: '232407005', nama: 'Gita Gutawa (Demo)', kelas: 'VIII-A', rombel: 'Kelas 8A', status: 'Aktif', academic_year: '2025/2026', gender: 'P', wali_kelas: 'Drs. Supriyadi' }
];

export const App: React.FC = () => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [workspaceTab, setWorkspaceTab] = useState<string>('dashboard');
  const [workspaceMode, setWorkspaceMode] = useState<'real' | 'dummy'>('real');

  // Core Persistent Application State (DATA REAL)
  const [school, setSchool] = useState<SchoolProfile>(INITIAL_SCHOOL_PROFILE);
  const [masterStudents, setMasterStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [documents, setDocuments] = useState<SchoolDocument[]>(INITIAL_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Modals
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isImportMasterOpen, setIsImportMasterOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Navigation Handler
  const handleNavigate = (view: 'landing' | 'workspace', tab?: string, mode?: 'real' | 'dummy') => {
    setCurrentView(view);
    if (tab) {
      setWorkspaceTab(tab);
    }
    if (mode) {
      setWorkspaceMode(mode);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (mode: 'real') => {
    setWorkspaceMode(mode);
    setCurrentView('workspace');
    setWorkspaceTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Import Master Data Handler
  const handleImportComplete = (newStudents: Student[]) => {
    setMasterStudents(prev => {
      // Merge unique by NISN or prepend new records
      const existingNisns = new Set(prev.map(s => s.nisn));
      const filteredNew = newStudents.filter(s => !existingNisns.has(s.nisn));
      const result = [...filteredNew, ...prev];
      return result;
    });

    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      operator: school.operatorName,
      action: 'Import Master Data Dapodik (Web Service API)',
      afterValue: `Menambahkan ${newStudents.length} siswa + GTK baru ke database sekolah`,
      type: 'import'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Data routed based on Workspace Mode: Real vs Dummy
  const activeStudents = workspaceMode === 'real' ? masterStudents : DUMMY_TRIAL_STUDENTS;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-body selection:bg-[#00B894]/20 selection:text-[#031534]">
      
      {/* Top Universal Navbar (EcoGrant Style) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        school={school}
        onOpenDemo={() => setIsVideoDemoOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        workspaceMode={workspaceMode}
      />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <LandingPage
          onOpenWorkspace={(tab, mode) => handleNavigate('workspace', tab || 'dashboard', mode || 'real')}
          onOpenDemo={() => setIsVideoDemoOpen(true)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          school={school}
          masterStudents={masterStudents}
        />
      ) : (
        <Workspace
          initialTab={workspaceTab}
          school={school}
          setSchool={setSchool}
          masterStudents={activeStudents}
          setMasterStudents={workspaceMode === 'real' ? setMasterStudents : () => {}}
          documents={documents}
          setDocuments={setDocuments}
          auditLogs={auditLogs}
          setAuditLogs={setAuditLogs}
          onOpenImportModal={() => setIsImportMasterOpen(true)}
          onBackToLanding={() => handleNavigate('landing')}
          workspaceMode={workspaceMode}
          onSwitchToReal={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* Operator Login Modal (for Real Data Access) */}
      <OperatorLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        school={school}
      />

      {/* Interactive Video Demo Modal */}
      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onLaunchWorkspace={() => {
          setIsVideoDemoOpen(false);
          handleNavigate('workspace', 'verification', 'dummy');
        }}
      />

      {/* Master Data Dapodik Import Modal */}
      <ImportMasterModal
        isOpen={isImportMasterOpen}
        onClose={() => setIsImportMasterOpen(false)}
        onImportComplete={handleImportComplete}
        existingCount={masterStudents.length}
      />

    </div>
  );
};

export default App;
