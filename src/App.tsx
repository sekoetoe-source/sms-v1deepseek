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

export const App: React.FC = () => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [workspaceTab, setWorkspaceTab] = useState<string>('dashboard');

  // Core Persistent Application State
  const [school, setSchool] = useState<SchoolProfile>(INITIAL_SCHOOL_PROFILE);
  const [masterStudents, setMasterStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [documents, setDocuments] = useState<SchoolDocument[]>(INITIAL_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Modals
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isImportMasterOpen, setIsImportMasterOpen] = useState<boolean>(false);

  // Navigation Handler
  const handleNavigate = (view: 'landing' | 'workspace', tab?: string) => {
    setCurrentView(view);
    if (tab) {
      setWorkspaceTab(tab);
    }
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-body selection:bg-[#00B894]/20 selection:text-[#031534]">
      
      {/* Top Universal Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        school={school}
        onOpenDemo={() => setIsVideoDemoOpen(true)}
      />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <LandingPage
          onOpenWorkspace={(tab) => handleNavigate('workspace', tab || 'dashboard')}
          onOpenDemo={() => setIsVideoDemoOpen(true)}
          school={school}
          masterStudents={masterStudents}
        />
      ) : (
        <Workspace
          initialTab={workspaceTab}
          school={school}
          setSchool={setSchool}
          masterStudents={masterStudents}
          setMasterStudents={setMasterStudents}
          documents={documents}
          setDocuments={setDocuments}
          auditLogs={auditLogs}
          setAuditLogs={setAuditLogs}
          onOpenImportModal={() => setIsImportMasterOpen(true)}
          onBackToLanding={() => handleNavigate('landing')}
        />
      )}

      {/* Interactive Video Demo Modal */}
      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onLaunchWorkspace={() => {
          setIsVideoDemoOpen(false);
          handleNavigate('workspace', 'verification');
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
