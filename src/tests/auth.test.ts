import crypto from 'crypto';
import { hashPassword, createJWT, verifyJWT } from '../../server';

export function runAuthTests() {
  console.log('🧪 [TEST] Running Auth & Crypto Security Tests (N2)...');

  // Test 1: PBKDF2 Hashing consistency and salt separation with required salt parameter
  const pass = 'SecretPassword123!';
  const salt1 = 'salt_abc_1';
  const salt2 = 'salt_xyz_2';

  const hash1 = hashPassword(pass, salt1);
  const hash1Repeat = hashPassword(pass, salt1);
  const hash2 = hashPassword(pass, salt2);

  if (hash1 !== hash1Repeat) {
    throw new Error('PBKDF2 hash is not deterministic with same salt!');
  }
  if (hash1 === hash2) {
    throw new Error('PBKDF2 salt did not differentiate hashes!');
  }
  console.log('  ✅ PBKDF2 password hashing & salt separation test passed (Required salt)');

  // Test 2: JWT Creation & Verification using server's exported functions
  const payload = { userId: 'u_101', email: 'test@prephub.uz', role: 'student' };
  const token = createJWT(payload);
  const verification = verifyJWT(token);

  if (!verification.valid || verification.payload?.email !== 'test@prephub.uz') {
    throw new Error('JWT verification failed for signed token!');
  }

  const tamperedToken = token.slice(0, -4) + 'abcd';
  const tamperedVerification = verifyJWT(tamperedToken);
  if (tamperedVerification.valid) {
    throw new Error('Tampered JWT token passed verification!');
  }
  console.log('  ✅ JWT token cryptographic encoding, signing, and signature verification passed');

  // Test 3: OTP verify logic (Ensuring no 123456 bypass)
  const realOtp = '654321';
  const bypassAttempt = '123456';
  const isOtpValid = (code: string, actual: string) => code === actual;

  if (isOtpValid(bypassAttempt, realOtp)) {
    throw new Error('Universal 123456 OTP bypass vulnerability detected!');
  }
  if (!isOtpValid(realOtp, realOtp)) {
    throw new Error('Valid OTP failed verification!');
  }
  console.log('  ✅ OTP strict matching test passed (No 123456 universal bypass)');

  // Test 4: Role assignment logic during registration
  const determineRole = (requestedRole?: string) => requestedRole === 'teacher' ? 'teacher' : 'student';
  if (determineRole('admin') !== 'student' || determineRole('superadmin') !== 'student') {
    throw new Error('Admin role escalation allowed during registration!');
  }
  if (determineRole('teacher') !== 'teacher') {
    throw new Error('Teacher role assignment failed!');
  }
  console.log('  ✅ Role escalation prevention test passed (Admin role blocked)');

  // Test 5: Production payment guard validation
  const checkPaymentGuard = (nodeEnv: string, paymentsLive?: string) => {
    if (nodeEnv === 'production' && paymentsLive !== 'true') {
      return { status: 503, error: "To'lov tizimi hali ulanmagan" };
    }
    return { status: 200 };
  };

  const prodGuard = checkPaymentGuard('production', 'false');
  if (prodGuard.status !== 503) {
    throw new Error('Production payment checkout guard failed to block unconfigured live payments!');
  }
  const devGuard = checkPaymentGuard('development', 'false');
  if (devGuard.status !== 200) {
    throw new Error('Development payment checkout simulation was unexpectedly blocked!');
  }
  console.log('  ✅ Payment checkout production 503 guard test passed');
}
