import { encode, decode } from './jwt/index.js';
import { generateJwtToken } from './jwt/generateJwtToken.js';
import { CookiesOptions } from './lib/cookies.js';
import { CredentialsProvider } from './providers/credential.js';

export interface AuthOptions {
  providers: {
    CredentialsProvider: typeof CredentialsProvider;
  };
  secret: string;
  cookies: CookiesOptions;
  jwt: {
    secret: string;
    maxAge: number;
    encode: typeof encode;
    decode: typeof decode;
    generateJwtToken: typeof generateJwtToken;
  };
}
