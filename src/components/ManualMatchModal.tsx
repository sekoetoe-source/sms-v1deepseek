import React, { useState, useMemo } from 'react';
import { X, Search, Check, UserCheck, Database, GraduationCap } from 'lucide-react';
import { Student, ExtractedRecord } from '../types';

interface ManualMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExtractedRecord | null;
  masterStudents: Student[];
  onSelectStudent: (recordId: string, student: Student) => void;
}

export const ManualMatchModal: React.FC<ManualMatchModalProps> = ({
  isOpen,
  onClose,
  record,
  masterStudents,
  onSelectStudent
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');

  const classes = useMemo(() => {
    const list = Array.from(new Set(masterStudents.map(s => s.kelas))).sort();
    return ['ALL', ...list];
  }, [masterStudents]);

  const filteredStudents = useMemo(() => {
    return masterStudents.filter(s => {
      const matchQuery = 
        s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nisn.includes(searchTerm) ||
        s.nis.includes(searchTerm);
      const matchClass = selectedClass === 'ALL' || s.kelas === selectedClass;
      return matchQuery && matchClass;
    });
  }, [masterStudents, searchTerm, selectedClass]);

  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#E6E6E6] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6] bg-[#F8F9FA]">
          <div>
            <h3 className="font-bold text-[#031534] text-base flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#006b55]" />
              Pilih / Koreksi Siswa Master Data
            </h3>
            <p className="text-xs text-[#6C757D] mt-0.5">
              Menghubungkan baris OCR dengan data siswa resmi di Dapodik
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6C757D] hover:bg-[#E6E6E6] hover:text-[#031534]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current OCR context */}
        <div className="bg-amber-50/70 border-b border-amber-200/70 px-6 py-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-[#6C757D]">Teks Terbaca OCR:</span>{' '}
            <strong className="text-[#031534] font-mono">"{record.rawName}"</strong> (Kelas: {record.rawClass || '-'})
          </div>
          <span className="px-2 py-0.5 rounded bg-white font-medium border border-amber-300 text-amber-900">
            Confidence Awal: {record.confidence}%
          </span>
        </div>

        {/* Search & Filter */}
        <div className="p-4 bg-white border-b border-[#E6E6E6] flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]" />
            <input 
              type="text"
              placeholder="Cari nama siswa, NISN, atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#E6E6E6] rounded-lg focus:outline-none focus:border-[#00B894] focus:ring-1 focus:ring-[#00B894]"
              autoFocus
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs border border-[#E6E6E6] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00B894]"
          >
            <option value="ALL">Semua Kelas</option>
            {classes.filter(c => c !== 'ALL').map(c => (
              <option key={c} value={c}>Kelas {c}</option>
            ))}
          </select>
        </div>

        {/* List of matching students */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-[#E6E6E6] space-y-1">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-[#6C757D] text-xs">
              Tidak ditemukan siswa dengan kata kunci "{searchTerm}".
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isCurrent = record.matchedStudentId === student.student_id;
              return (
                <div 
                  key={student.student_id}
                  className={`p-3 rounded-xl flex items-center justify-between transition-colors ${
                    isCurrent ? 'bg-emerald-50/70 border border-emerald-300' : 'hover:bg-[#F8F9FA]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#031534]">
                        {student.nama}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#031534]/5 text-[#031534] rounded">
                        {student.kelas}
                      </span>
                      <span className="text-[10px] text-[#6C757D]">
                        ({student.gender === 'L' ? 'Laki-laki' : 'Perempuan'})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6C757D] flex items-center gap-3">
                      <span>NISN: <strong className="font-mono text-[#031534]">{student.nisn}</strong></span>
                      <span>NIS: <strong className="font-mono text-[#031534]">{student.nis}</strong></span>
                      <span>Wali: {student.wali_kelas || '-'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectStudent(record.id, student);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#031534] text-white hover:bg-[#1a2a4a]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isCurrent ? 'Terpilih' : 'Pilih Siswa Ini'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F8F9FA] border-t border-[#E6E6E6] flex items-center justify-between text-xs text-[#6C757D]">
          <span>Menampilkan {filteredStudents.length} siswa dari {masterStudents.length} total master data</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-[#44474E] hover:bg-[#E6E6E6]"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
