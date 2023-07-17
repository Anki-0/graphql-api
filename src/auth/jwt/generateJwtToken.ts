import { Request } from 'express';
import { JWT } from './type.js';
import * as jwt from './index.js';
import { SessionStore } from '../lib/cookies.js';
import { __DEV__, __PRODUCTION__ } from '../../utils/assertions.js';
import { AuthOptions } from '../types.js';

interface GenerateAccessTokenParams {
  options: AuthOptions;
  req: Request;
  user: Record<string, any>;
  secureCookie?: boolean;
}

export const generateJwtToken = async (params: GenerateAccessTokenParams) => {
  const { options, user, secureCookie = __DEV__ ? false : true, req } = params;

  const sessionStore = new SessionStore(
    {
      name: options.cookies.sessionToken.name,
      options: { secure: secureCookie }
    },
    { cookies: req.cookies, headers: req.headers }
  );

  const defaultToken: JWT = {
    id: user?.id,
    name: user?.name,
    username: user?.username,
    email: user?.email,
    image: user?.image
  };

  // Encode token
  const encodedToken = await jwt.encode({
    secret: options.jwt.secret,
    maxAge: options.jwt.maxAge,
    token: defaultToken
  });

  // Set cookie expiry date
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + options.jwt.maxAge * 1000);

  const sessionCookies = sessionStore.chunk(encodedToken, {
    expires: cookieExpires
  });

  return { rawToken: defaultToken, encodedToken, cookies: sessionCookies };
};
