// IELTS Band Score Conversion Engine Test Suite (N5, N6, N8, N9)

export function rawScoreToIELTSBand(rawScore: number, total: number = 40): number {
  const percentage = (rawScore / total) * 100;
  if (percentage >= 87.5) return 8.5;
  if (percentage >= 75) return 7.5;
  if (percentage >= 65) return 6.5;
  if (percentage >= 50) return 5.5;
  if (percentage >= 35) return 4.5;
  return 3.5;
}

export function calculateOverallBand(scores: { listening: number; reading: number; writing: number; speaking: number }): number {
  const avg = (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;
  // Official IELTS rounding: rounded to nearest 0.5
  return Math.round(avg * 2) / 2;
}

export function runIELTSTests() {
  console.log('🧪 [TEST] Running IELTS Band Score Calculation Tests (N5, N6, N8, N9)...');

  // Test Raw Score mapping
  const band35 = rawScoreToIELTSBand(35, 40); // 87.5% -> 8.5
  if (band35 !== 8.5) throw new Error(`Expected 8.5 but got ${band35}`);

  const band26 = rawScoreToIELTSBand(26, 40); // 65% -> 6.5
  if (band26 !== 6.5) throw new Error(`Expected 6.5 but got ${band26}`);
  console.log('  ✅ IELTS Raw score to Band 9 scale mapping passed');

  // Test Overall Band Rounding
  const overall1 = calculateOverallBand({ listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 }); // Avg: 7.0
  if (overall1 !== 7.0) throw new Error(`Expected 7.0 but got ${overall1}`);

  const overall2 = calculateOverallBand({ listening: 8.0, reading: 7.5, writing: 7.0, speaking: 7.0 }); // Avg: 7.375 -> 7.5
  if (overall2 !== 7.5) throw new Error(`Expected 7.5 but got ${overall2}`);
  console.log('  ✅ IELTS 4-skills aggregate and 0.5 nearest rounding passed');
}
