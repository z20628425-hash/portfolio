// SuperMemo SM-2 Algorithm Test Suite (N7)
export interface SM2State {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
}

export function calculateSM2(state: SM2State, grade: number): SM2State {
  // grade: 0..5 (0-2: failure, 3: pass, 4: good, 5: perfect)
  let { repetitions, intervalDays, easeFactor } = state;

  if (grade >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  } else {
    repetitions = 0;
    intervalDays = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return { repetitions, intervalDays, easeFactor: Number(easeFactor.toFixed(2)) };
}

export function runSM2Tests() {
  console.log('🧪 [TEST] Running SuperMemo SM-2 Spaced Repetition Tests (N7)...');

  let cardState: SM2State = {
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
  };

  // Step 1: Grade 5 (Perfect recall on first review)
  cardState = calculateSM2(cardState, 5);
  if (cardState.repetitions !== 1 || cardState.intervalDays !== 1 || cardState.easeFactor !== 2.6) {
    throw new Error(`SM-2 step 1 unexpected: ${JSON.stringify(cardState)}`);
  }
  console.log('  ✅ SM-2 First review calculation passed (interval: 1 day)');

  // Step 2: Grade 4 (Good recall on second review)
  cardState = calculateSM2(cardState, 4);
  if (cardState.repetitions !== 2 || cardState.intervalDays !== 6) {
    throw new Error(`SM-2 step 2 unexpected: ${JSON.stringify(cardState)}`);
  }
  console.log('  ✅ SM-2 Second review calculation passed (interval: 6 days)');

  // Step 3: Grade 1 (Failure/Forgot card)
  cardState = calculateSM2(cardState, 1);
  if (cardState.repetitions !== 0 || cardState.intervalDays !== 1) {
    throw new Error(`SM-2 failure reset unexpected: ${JSON.stringify(cardState)}`);
  }
  console.log('  ✅ SM-2 Memory lapse reset passed (interval reset to 1 day)');
}
