import {
  createHash,
  randomBytes,
  randomInt,
  scrypt,
  timingSafeEqual
} from 'crypto';
import {
  GenerateOtpParams,
  GenerateOtpResult,
  HashedTokenResult
} from './types.js';
import { promisify } from 'util';

/**
 * Generates a SHA-256 hash for a given key with a specified token length.
 * @param {string} key - The key to be hashed.
 * @param {number}tokenLenght - The desired length of the token.
 * @returns {HashedTokenResult} - An object containing the token and its hash value.
 */
const createSHA256Hash = (
  key?: string,
  tokenLength?: number
): HashedTokenResult => {
  // Generate a random token if key not provided
  const Token = key ? key : randomBytes(tokenLength ?? 32).toString('hex');
  // Create a hash object using SHA-256 algorithm
  const TokenHash = createHash('sha256').update(Token, 'utf8').digest('hex');

  // Return an object containing the token and its hash value
  return { Token, TokenHash };
};

/**
 * Generates a random OTP (One-Time Password) of a specified length.
 * @param params - The parameters for OTP generation.
 *                Available options:
 *               - length: The desired length of the OTP. Must be a positive integer.
 *               - otp: The OTP to be hashed. If provided, it will be hashed instead of generating a new OTP.
 * @returns {GenerateOtpResult} - The generated OTP.
 */
export const generateOTP = (params?: GenerateOtpParams): GenerateOtpResult => {
  const allowsChars = '0123456789';
  const { otp, length = 8 } = params ?? {};

  // Genrate Hash for provided
  if (otp) {
    // Hash the provided OTP
    const { TokenHash } = createSHA256Hash(otp.toString());
    return { OTP: otp, OTP_HASH: TokenHash };
  }

  // Generate the OTP
  let OTP = '';
  while (OTP.length < length) {
    const charIndex = randomInt(0, allowsChars.length);
    if (OTP.length === 0 && allowsChars[charIndex] === '0') {
      continue;
    }
    OTP += allowsChars[charIndex];
  }

  // Generate the hash
  const { TokenHash } = createSHA256Hash(OTP);

  return { OTP: Number(OTP), OTP_HASH: TokenHash };
};

/**
 *
 * @param candidatePassword Plain Password.
 * @param hasedPassword Hashsed Password Value.
 * @returns `Promise<boolean>`
 */
export const validateScryptHash = async (
  candidatePassword: string,
  hasedPassword: string
) => {
  const [salt, key] = hasedPassword.split('|');

  const candidatePasswordHashBuffer = (await promisify(scrypt)(
    candidatePassword,
    salt,
    32
  )) as Buffer;

  return timingSafeEqual(candidatePasswordHashBuffer, Buffer.from(key, 'hex'));
};

/**
 * Create Salted Hash for the given Key.
 */
export const createScryptHash = async (key: string) => {
  const salt = randomBytes(16).toString('hex');
  const hashedKeyBuffer = (await promisify(scrypt)(key, salt, 32)) as Buffer;

  return { salt, hashedKeyBuffer };
};
