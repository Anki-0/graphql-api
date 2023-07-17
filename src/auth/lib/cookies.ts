import { Request } from 'express';
import type { CookieSerializeOptions } from 'cookie';

const ALLOWED_COOKIE_SIZE = 4096;
// Based on commented out section above
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;

/** Stringified form of `JWT`. Extract the content with `jwt.decode` */
export type JWTString = string;

interface CookieOption {
  name: string;
  options: CookieSerializeOptions;
}
export interface Cookie extends CookieOption {
  value: string;
}

export interface CookiesOptions {
  sessionToken: CookieOption;
  callbackUrl: CookieOption;
  csrfToken: CookieOption;
  pkceCodeVerifier: CookieOption;
  state: CookieOption;
  nonce: CookieOption;
}

export class SessionStore {
  private chunks: Record<string, string> = {};
  private options: CookieOption;

  constructor(options: CookieOption, req: Partial<Request>) {
    this.options = options;
    const { cookies } = req;
    const { name: cookieName } = options;

    if (typeof cookies?.getAll === 'function') {
      for (const { name, value } of cookies.getAll()) {
        if (name.statsWith(cookieName)) {
          this.chunks[name] = value;
        }
      }
    }

    if (cookies instanceof Map) {
      for (const name in cookies.keys()) {
        if (name.startsWith(cookieName)) this.chunks[name] = cookies.get(name);
      }
    } else {
      for (const name in cookies) {
        if (name.startsWith(cookieName)) this.chunks[name] = cookies[name];
      }
    }
  }

  /**
   * The JWT Session or database Session ID
   * constructed from the cookie chunks.
   */
  get value() {
    return Object.values(this.chunks)?.join('');
  }

  /** Given a cookie, return a list of cookies, chunked to fit the allowed cookie size. */
  #chunk(cookie: Cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);

    if (chunkCount === 1) {
      this.chunks[cookie.name] = cookie.value;
      return [cookie];
    }

    const cookies: Cookie[] = [];
    for (let i = 0; i < chunkCount; i++) {
      const name = `${cookie.name}.${i}`;
      const value = cookie.value.substring(i * CHUNK_SIZE, CHUNK_SIZE);

      cookies.push({ ...cookie, name, value });
    }

    return cookies;
  }

  /** Returns cleaned cookie chunks. */
  #clean(): Record<string, Cookie> {
    const cleanedChunks: Record<string, Cookie> = {};
    for (const name in this.chunk) {
      delete this.chunks?.[name];
      cleanedChunks[name] = {
        name,
        value: '',
        options: { ...this.options.options, maxAge: 0 }
      };
    }
    return cleanedChunks;
  }

  /**
   * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
   * If the cookie has changed from chunked to unchunked or vice versa,
   * it deletes the old cookies as well.
   */

  public chunk(value: string, options: Partial<Cookie['options']>): Cookie[] {
    // Assume all cookies should be cleaned by default
    const cookies: Record<string, Cookie> = this.#clean();

    // Calculate new chunks
    const chunked = this.#chunk({
      name: this.options.name,
      value,
      options: {
        ...this.options.options,
        ...options
      }
    });

    // Update stored chunks / cookies
    for (const chunk of chunked) {
      cookies[chunk.name] = chunk;
    }

    return Object.values(cookies);
  }

  /** Returns a list of cookies that should be cleaned. */
  public clean(): Cookie[] {
    return Object.values(this.#clean());
  }
}

export function defaultCookies(useSecureCookies: boolean): CookiesOptions {
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';

  return {
    // default cookie options
    sessionToken: {
      name: `${cookiePrefix}auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? '__Host-' : ''}auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    state: {
      name: `${cookiePrefix}auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    nonce: {
      name: `${cookiePrefix}auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    }
  };
}
