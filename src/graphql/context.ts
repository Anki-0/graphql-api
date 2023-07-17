import { userByIdLoader } from './dataLoaders/userDataLoader.js';
import { Request, Response } from 'express';
import db from '../database/index.js';
import { Init as AuthInit } from '../auth/init.js';

type contextArgs = {
  req: Request;
  res: Response;
};

const contextReturns = {
  db
};

const loaders = { userByIdLoader };

const context = async ({ req, res }: contextArgs) => {
  const { auth, options } = await AuthInit({
    res: res,
    req: req,
    maxAge: 7 * 24 * 60 * 60, // 1 week
    // cookies: req.cookies,
    secret: process.env.AUTH_SECRET
  });

  console.log(auth);

  return { res, req, loaders, auth: { ...auth, options }, ...contextReturns };
};

type Context = Awaited<ReturnType<typeof context>>;
export { context, type Context };
