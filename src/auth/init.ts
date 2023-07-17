import { Request, Response } from 'express';
import { add } from 'date-fns';

import { AuthOptions } from './types.js';
import * as jwt from './jwt/index.js';
import { generateJwtToken } from './jwt/generateJwtToken.js';
import { CredentialsProvider } from './providers/credential.js';
import { defaultCookies } from './lib/cookies.js';
import { __PRODUCTION__ } from '../utils/assertions.js';

interface InitParams {
  maxAge?: number;
  secret?: string;
  res: Response;
  req: Request;
}

export const Init = async (params: InitParams) => {
  const { maxAge, secret, req } = params;

  if (!secret) {
    throw new Error('Init: Must pass `secret` .');
  }

  // If `maxAge` is not specified
  // Session expire after 1 week of being idle by default
  const _maxAge = maxAge ?? 7 * 24 * 60 * 60;

  const options: AuthOptions = {
    providers: {
      CredentialsProvider
    },
    secret: secret,
    cookies: {
      ...defaultCookies(__PRODUCTION__ ? true : false)
    },
    jwt: {
      secret: secret,
      maxAge: _maxAge,
      encode: jwt.encode,
      decode: jwt.decode,
      generateJwtToken: generateJwtToken
    }
  };

  const user = await getUser({
    req: req,
    options: options
  });

  return { options, auth: user };
};

interface GetUserParams {
  req: Request;
  options: AuthOptions;
}

const getUser = async (params: GetUserParams) => {
  const { req, options } = params;

  const sessionToken = await jwt.getToken({
    options: options,
    req,
    secureCookie: __PRODUCTION__ ? true : false
  });

  // req does not have session token
  if (!sessionToken) {
    return { isUserLoggedIn: false, user: null };
  }

  if (typeof sessionToken !== 'string') {
    const newExpires = add(Date.now(), { seconds: options.jwt.maxAge });
    // By default, only exposes a limited subset of information to the client
    // as needed for presentation purposes (e.g. "you are logged in as...").
    const session = {
      user: {
        id: sessionToken?.id as string,
        email: sessionToken?.email as string,
        name: sessionToken?.name,
        image: sessionToken?.image,
        username: sessionToken?.username
      },
      expires: newExpires.toISOString()
    };

    return { isUserLoggedIn: true, user: { ...session.user } };
  }

  return { isUserLoggedIn: false, user: null };
};
