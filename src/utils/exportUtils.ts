import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { ExtractedRecord, SchoolDocument, SchoolProfile, Student } from '../types';

/**
 * Export verified records to Microsoft Excel (.xlsx)
 */
export function exportToExcel(
  document: SchoolDocument,
  records: ExtractedRecord[],
  school: SchoolProfile
): void {
  const verifiedRecords = records.filter(r => r.isVerified && !r.isRejected);
  
  if (verifiedRecords.length === 0) {
    alert('Tidak ada data terverifikasi yang dapat diekspor. Harap verifikasi minimal 1 data siswa.');
    return;
  }

  // Build Sheet Rows
  const sheetData: any[] = [];

  // Header Metadata (Kop Surat Resmi)
  sheetData.push([school.name.toUpperCase()]);
  sheetData.push([school.address]);
  sheetData.push([`Telp. ${school.phone || '021.4891456'} Fax. ${school.fax || '47881356'}`]);
  sheetData.push([`Email: ${school.email || 'smpn99dki@yahoo.co.id'} | Website: ${school.website || 'https://smpn99jkt.sch.id'}`]);
  sheetData.push([]);
  sheetData.push(['LAPORAN REKAPITULASI DOKUMEN ADMINISTRASI SISWA']);
  sheetData.push(['Jenis Dokumen:', document.documentType]);
  sheetData.push(['Nama Berkas:', document.title]);
  sheetData.push(['Tahun Pelajaran:', `${school.academicYear} (Semester ${school.semester})`]);
  sheetData.push(['Tanggal Export:', new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })]);
  sheetData.push(['Petugas Operator:', school.operatorName]);
  sheetData.push(['Total Record Terverifikasi:', `${verifiedRecords.length} Siswa`]);
  sheetData.push([]);

  // Table Headers
  sheetData.push([
    'NO',
    'STUDENT ID',
    'NISN',
    'NIS',
    'NAMA LENGKAP SISWA',
    'KELAS',
    'ROMBEL',
    'STATUS KETIDAKHADIRAN / KATEGORI',
    'TANGGAL KEJADIAN',
    'KETERANGAN / CATATAN',
    'CONFIDENCE MATCH',
    'STATUS VERIFIKASI',
    'DIVERIFIKASI OLEH'
  ]);

  // Table Rows
  verifiedRecords.forEach((rec, idx) => {
    const student = rec.matchedStudent;
    sheetData.push([
      idx + 1,
      student ? student.student_id : 'MANUAL',
      student ? student.nisn : '-',
      student ? student.nis : '-',
      rec.editedFields?.nama || student?.nama || rec.rawName,
      rec.editedFields?.kelas || student?.kelas || rec.rawClass,
      student ? student.rombel : '-',
      rec.editedFields?.status || rec.rawStatus,
      rec.rawDate || new Date().toLocaleDateString('id-ID'),
      rec.editedFields?.catatan || rec.rawNotes || '-',
      `${rec.confidence}%`,
      'TERVERIFIKASI',
      rec.verifiedBy || school.operatorName
    ]);
  });

  sheetData.push([]);
  sheetData.push(['', '', '', '', '', '', '', '', '', 'Mengetahui,', '']);
  sheetData.push(['', '', '', '', '', '', '', '', '', 'Kepala ' + school.name, '']);
  sheetData.push([]);
  sheetData.push([]);
  sheetData.push(['', '', '', '', '', '', '', '', '', school.headmasterName, '']);
  sheetData.push(['', '', '', '', '', '', '', '', '', 'NIP. ' + school.headmasterNip, '']);

  // Create Workbook and Worksheet
  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Set column widths
  ws['!cols'] = [
    { wch: 5 },  // No
    { wch: 14 }, // Student ID
    { wch: 14 }, // NISN
    { wch: 12 }, // NIS
    { wch: 28 }, // Nama
    { wch: 10 }, // Kelas
    { wch: 12 }, // Rombel
    { wch: 24 }, // Status
    { wch: 16 }, // Tanggal
    { wch: 30 }, // Keterangan
    { wch: 16 }, // Confidence
    { wch: 18 }, // Verifikasi
    { wch: 22 }  // Diverifikasi oleh
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rekap_Administrasi');

  // Generate clean filename
  const cleanTitle = document.title.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `SMS_${cleanTitle}_${dateStr}.xlsx`;

  XLSX.writeFile(wb, filename);
}

/**
 * Export verified records to Official School PDF (.pdf) with letterhead
 */
export function exportToPDF(
  document: SchoolDocument,
  records: ExtractedRecord[],
  school: SchoolProfile
): void {
  const verifiedRecords = records.filter(r => r.isVerified && !r.isRejected);
  
  if (verifiedRecords.length === 0) {
    alert('Tidak ada data terverifikasi yang dapat diekspor. Harap verifikasi minimal 1 data siswa.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // Header Letterhead (Kop Surat Resmi SMP NEGERI 99 JAKARTA)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(school.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(school.address, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text(`Telp. ${school.phone || '021.4891456'} Fax. ${school.fax || '47881356'}`, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text(`Email: ${school.email || 'smpn99dki@yahoo.co.id'} | Website: ${school.website || 'https://smpn99jkt.sch.id'}`, pageWidth / 2, y, { align: 'center' });
  y += 4;

  // Double Divider Line
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  y += 1;
  doc.setLineWidth(0.2);
  doc.line(15, y, pageWidth - 15, y);
  y += 8;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('LAPORAN REKAPITULASI DOKUMEN ADMINISTRASI SISWA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text(`Jenis: ${document.documentType} — Tahun Pelajaran ${school.academicYear}`, pageWidth / 2, y, { align: 'center' });
  y += 8;

  // Metadata Box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Nama Dokumen : ${document.title}`, 15, y);
  doc.text(`Tanggal Cetak : ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 80, y);
  y += 4.5;
  doc.text(`Tanggal Berkas : ${verifiedRecords[0]?.rawDate || '20/08/2026'}`, 15, y);
  doc.text(`Total Siswa   : ${verifiedRecords.length} Record Terverifikasi`, pageWidth - 80, y);
  y += 7;

  // Table Headers
  const colX = [15, 25, 45, 95, 115, 140, 195];
  doc.setFillColor(3, 21, 52); // Navy primary
  doc.rect(15, y, pageWidth - 30, 7, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('NO', 17, y + 4.5);
  doc.text('NISN', 27, y + 4.5);
  doc.text('NAMA LENGKAP SISWA', 47, y + 4.5);
  doc.text('KELAS', 97, y + 4.5);
  doc.text('STATUS', 117, y + 4.5);
  doc.text('KETERANGAN', 142, y + 4.5);
  y += 7;

  // Table Rows
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'normal');
  
  verifiedRecords.forEach((rec, idx) => {
    // Check if new page is needed
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    const student = rec.matchedStudent;
    const isEven = idx % 2 === 0;
    
    if (isEven) {
      doc.setFillColor(248, 249, 250);
      doc.rect(15, y, pageWidth - 30, 6.5, 'F');
    }

    // Border line bottom
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.1);
    doc.line(15, y + 6.5, pageWidth - 15, y + 6.5);

    doc.setFontSize(8);
    doc.text(`${idx + 1}`, 17, y + 4.5);
    doc.text(student?.nisn || '-', 27, y + 4.5);
    
    const nama = (rec.editedFields?.nama || student?.nama || rec.rawName);
    doc.text(nama.length > 25 ? nama.slice(0, 24) + '...' : nama, 47, y + 4.5);
    
    doc.text(rec.editedFields?.kelas || student?.kelas || rec.rawClass, 97, y + 4.5);
    
    const status = rec.editedFields?.status || rec.rawStatus;
    doc.setFont('helvetica', 'bold');
    if (status.toLowerCase().includes('sakit')) {
      doc.setTextColor(217, 119, 6); // Amber
    } else if (status.toLowerCase().includes('izin')) {
      doc.setTextColor(2, 132, 199); // Blue
    } else if (status.toLowerCase().includes('alpa') || status.toLowerCase().includes('terlambat')) {
      doc.setTextColor(220, 38, 38); // Red
    } else {
      doc.setTextColor(26, 26, 26);
    }
    doc.text(status, 117, y + 4.5);

    doc.setTextColor(70, 70, 70);
    doc.setFont('helvetica', 'normal');
    const notes = (rec.editedFields?.catatan || rec.rawNotes || '-');
    doc.text(notes.length > 28 ? notes.slice(0, 27) + '...' : notes, 142, y + 4.5);

    y += 6.5;
  });

  y += 8;

  // Signature Block
  if (y > 230) {
    doc.addPage();
    y = 30;
  }

  const signX = pageWidth - 75;
  doc.setTextColor(26, 26, 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, signX, y);
  y += 4.5;
  doc.text('Mengetahui,', signX, y);
  y += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.text(`Kepala ${school.name}`, signX, y);
  y += 22; // Signature space
  doc.text(school.headmasterName, signX, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.text(`NIP. ${school.headmasterNip}`, signX, y);

  // Left Operator Sign
  const opX = 20;
  let opY = y - 35.5;
  doc.text('Petugas Operator SMS,', opX, opY);
  opY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.text('Sistem Manajemen Sekolah', opX, opY);
  opY += 22;
  doc.text(school.operatorName, opX, opY);
  opY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.text(`NIP. ${school.operatorNip || '-'}`, opX, opY);

  // Footer Note
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  doc.text('Dokumen ini dihasilkan secara otomatis melalui SMS Banyubiru - Sistem Manajemen Sekolah | Master Data Terverifikasi', pageWidth / 2, 285, { align: 'center' });

  // Save PDF
  const cleanTitle = document.title.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.save(`SMS_Laporan_${cleanTitle}_${dateStr}.pdf`);
}

/**
 * Export full Master Data Siswa to Excel
 */
export function exportMasterStudentsToExcel(students: Student[], school: SchoolProfile): void {
  const rows: any[] = [];
  rows.push(['MASTER DATA SISWA — ' + school.name.toUpperCase()]);
  rows.push(['Tahun Pelajaran: ' + school.academicYear]);
  rows.push(['Tanggal Export: ' + new Date().toLocaleDateString('id-ID')]);
  rows.push([]);
  rows.push(['NO', 'STUDENT ID', 'SOURCE ID', 'NISN', 'NIS', 'NAMA SISWA', 'JK', 'KELAS', 'ROMBEL', 'WALI KELAS', 'STATUS']);

  students.forEach((s, i) => {
    rows.push([
      i + 1,
      s.student_id,
      s.source_id,
      s.nisn,
      s.nis,
      s.nama,
      s.gender,
      s.kelas,
      s.rombel,
      s.wali_kelas || '-',
      s.status
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 5 },
    { wch: 14 },
    { wch: 16 },
    { wch: 16 },
    { wch: 12 },
    { wch: 28 },
    { wch: 6 },
    { wch: 10 },
    { wch: 14 },
    { wch: 26 },
    { wch: 12 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Master_Siswa');
  XLSX.writeFile(wb, `Master_Data_Siswa_${school.name.replace(/\s+/g, '_')}.xlsx`);
}
