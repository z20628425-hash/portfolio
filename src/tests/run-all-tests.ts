import { runAuthTests } from './auth.test';
import { runSM2Tests } from './sm2-spaced-repetition.test';
import { runIELTSTests } from './ielts-band-calculator.test';

async function main() {
  console.log('====================================================');
  console.log('🚀 PREZENT PREP HUB - AUTOMATED TEST RUNNER (N12)');
  console.log('====================================================');

  const startTime = Date.now();
  let passed = 0;
  let failed = 0;

  try {
    runAuthTests();
    passed += 1;
  } catch (e: any) {
    console.error('❌ Auth test failed:', e.message);
    failed += 1;
  }

  try {
    runSM2Tests();
    passed += 1;
  } catch (e: any) {
    console.error('❌ SM-2 Spaced Repetition test failed:', e.message);
    failed += 1;
  }

  try {
    runIELTSTests();
    passed += 1;
  } catch (e: any) {
    console.error('❌ IELTS Band Calculation test failed:', e.message);
    failed += 1;
  }

  const duration = Date.now() - startTime;
  console.log('----------------------------------------------------');
  console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed (${duration}ms)`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

main();
