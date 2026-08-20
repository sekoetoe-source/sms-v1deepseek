import { Student, MatchConfidenceCategory } from '../types';

/**
 * Calculate Levenshtein Distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));

  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (b.charAt(j - 1) === a.charAt(i - 1)) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1, // substitution
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i] + 1      // deletion
        );
      }
    }
  }

  return matrix[bn][an];
}

/**
 * Standardize common Indonesian name abbreviations and OCR quirks
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bmuh\b|\bmuhd\b|\bm\b/g, 'muhammad')
    .replace(/\bach\b|\bahm\b/g, 'ahmad')
    .replace(/\bst\b/g, 'siti')
    .replace(/\bmoch\b|\bmochd\b/g, 'mochammad')
    .replace(/\brizki\b|\brizky\b|\briski\b|\brisky\b/g, 'rizki')
    .replace(/\bfauzan\b|\bfausan\b/g, 'fauzan')
    .replace(/\bnurhaliza\b|\bnurhalizah\b/g, 'nurhaliza')
    .replace(/\bputri\b|\bputry\b/g, 'putri')
    .trim();
}

/**
 * Calculate similarity between 0 and 100
 */
export function calculateNameSimilarity(rawName: string, studentName: string): number {
  if (!rawName || !studentName) return 0;

  const normRaw = normalizeName(rawName);
  const normTarget = normalizeName(studentName);

  if (normRaw === normTarget) return 100;

  // Direct Levenshtein ratio
  const maxLen = Math.max(normRaw.length, normTarget.length);
  if (maxLen === 0) return 100;

  const dist = levenshteinDistance(normRaw, normTarget);
  const rawRatio = Math.max(0, (1 - dist / maxLen) * 100);

  // Token based similarity (for names where word order or middle names differ)
  const rawTokens = normRaw.split(' ');
  const targetTokens = normTarget.split(' ');

  let matchedTokens = 0;
  for (const rToken of rawTokens) {
    if (rToken.length <= 1) continue;
    for (const tToken of targetTokens) {
      if (tToken === rToken || (tToken.startsWith(rToken) && rToken.length >= 3)) {
        matchedTokens++;
        break;
      }
    }
  }

  const tokenScore = (matchedTokens / Math.max(rawTokens.length, targetTokens.length)) * 100;
  
  // Weighted combination
  const combined = rawRatio * 0.65 + tokenScore * 0.35;
  return Math.min(100, Math.round(combined));
}

/**
 * Match a raw OCR record against master student list
 */
export function matchStudentAgainstMaster(
  rawName: string,
  rawClass: string,
  masterStudents: Student[]
): {
  matchedStudent?: Student;
  confidence: number;
  confidenceCategory: MatchConfidenceCategory;
  alternativeCandidates: { student: Student; confidence: number }[];
} {
  if (!rawName || masterStudents.length === 0) {
    return {
      confidence: 0,
      confidenceCategory: 'Unmatched',
      alternativeCandidates: []
    };
  }

  const normRawClass = rawClass.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Calculate scores for all students
  const scored = masterStudents.map(student => {
    let score = calculateNameSimilarity(rawName, student.nama);
    
    // Class bonus / penalty
    if (normRawClass) {
      const studentClassNorm = student.kelas.toLowerCase().replace(/[^a-z0-9]/g, '');
      const studentRombelNorm = student.rombel.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (studentClassNorm.includes(normRawClass) || studentRombelNorm.includes(normRawClass) || normRawClass.includes(studentClassNorm)) {
        score = Math.min(100, score + 4);
      } else if (normRawClass.length > 2) {
        // Slight reduction if class was explicitly mentioned and mismatches completely
        score = Math.max(0, score - 6);
      }
    }

    return {
      student,
      confidence: Math.round(score)
    };
  });

  // Sort descending
  scored.sort((a, b) => b.confidence - a.confidence);

  const topMatch = scored[0];
  const alternatives = scored.slice(1, 4).filter(item => item.confidence >= 40);

  if (!topMatch || topMatch.confidence < 45) {
    return {
      confidence: topMatch ? topMatch.confidence : 0,
      confidenceCategory: 'Unmatched',
      alternativeCandidates: alternatives
    };
  }

  let confidenceCategory: MatchConfidenceCategory = 'Low Confidence';
  if (topMatch.confidence >= 95) {
    confidenceCategory = 'High Confidence';
  } else if (topMatch.confidence >= 80) {
    confidenceCategory = 'Medium Confidence';
  }

  return {
    matchedStudent: topMatch.student,
    confidence: topMatch.confidence,
    confidenceCategory,
    alternativeCandidates: alternatives
  };
}
