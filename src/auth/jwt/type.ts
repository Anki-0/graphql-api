import { Request } from 'express';
import { AuthOptions } from '../types.js';

export type Awaitable<T> = T | PromiseLike<T>;

export interface DefaultJWT extends Record<string, unknown> {
  id?: string | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
  sub?: string;
}

// Returned by the `jwt` callback and `getToken`, when using JWT sessions
export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams {
  token: JWT;
  secret: string;
  maxAge: number;
}

export interface JWTDecodeParams {
  secret: string;
  token?: string;
}

export interface JWTOptions {
  // The secret used to encode/decode the Auth.js issued JWT.
  secret: string;
  /**
   * The maximum age of the Auth.js issued JWT in seconds.
   *
   * @default 30 * 24 * 30 * 60 // 30 days
   */
  maxAge: number;
  encode: (params: JWTEncodeParams) => Awaitable<string>;
  decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}

export interface GetTokenParams {
  options: AuthOptions;
  req: Request;
  raw?: boolean;
  secureCookie?: boolean;
}
