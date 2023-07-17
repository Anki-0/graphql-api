import {
  GetTokenParams,
  JWT,
  JWTDecodeParams,
  JWTEncodeParams
} from './type.js';

import crypto from 'crypto';
import { hkdf } from '@panva/hkdf';
import { EncryptJWT, jwtDecrypt } from 'jose';

import { SessionStore } from '../lib/cookies.js';

const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const now = () => (Date.now() / 1000) | 0;

const getDerivedEncryptionKey = async (secret: string) => {
  return await hkdf('sha256', secret, '', 'Encryption Key', 32);
};

/**
 * Issues a JWT. By default, the JWT is encrypted using "A256GCM".
 *
 * @param {string} token  The JWT payload.
 * @param {string} secret The secret used to encode the Auth.js issued JWT.
 * @param {string} [maxAge='30days'] The maximum age of the Auth.js issued JWT in seconds.
 */
export const encode = async (params: JWTEncodeParams) => {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;

  const encryptionSecret = await getDerivedEncryptionKey(secret);

  return await new EncryptJWT(token)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(now() + maxAge)
    .setJti(crypto.randomUUID())
    .encrypt(encryptionSecret);
};

/**
 *
 * @param secret The secret used to decode the Auth.js issued JWT.
 * @param token The issued JWT to be decoded
 */
export const decode = async (params: JWTDecodeParams): Promise<JWT | null> => {
  const { secret, token } = params;
  if (!token) return null;

  const encryptionSecret = await getDerivedEncryptionKey(secret);
  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15
  });

  return payload;
};

/**
 *
 * @param req The request containing the JWT either in the cookies or in the `Authorization` header.
 * @param secret The secret used to decode the issued JWT
 * @param cookieName If the JWT is in the cookie, what name `getToken()` should look for.
 * @param secureCookie Use secure prefix for cookie name if `true`
 * @param raw `getToken()` will return the raw JWT if this is set to `true`
 * @returns
 */
export const getToken = async (params: GetTokenParams) => {
  const { options, raw = false, secureCookie = false, req } = params;

  if (!req) throw new Error('Must pass `req` to JWT getToken()');
  if (!options.secret)
    throw new Error('Must pass `secret` if not set to JWT getToken()');

  const sessionStore = new SessionStore(
    {
      name: options.cookies.sessionToken.name,
      options: { secure: secureCookie }
    },
    { cookies: req.cookies, headers: req.headers }
  );

  let token = sessionStore.value;
  const authorizationHeader = req.headers.authorization;

  if (!token && authorizationHeader?.split(' ')[0] === 'Bearer') {
    const urlEncodedToken = authorizationHeader.split(' ')[1];
    token = decodeURIComponent(urlEncodedToken);
  }

  if (!token) return null;
  if (raw) return token;

  try {
    return await decode({ token, secret: options.secret });
  } catch {
    return null;
  }
};
