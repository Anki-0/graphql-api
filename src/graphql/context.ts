import { userByIdLoader } from './dataLoaders/userDataLoader.js';
import { Request, Response } from 'express';
import db from '../database/index.js';

type contextArgs = {
  req: Request;
  res: Response;
};

const contextReturns = {
  db
};

const loaders = { userByIdLoader };

const context = async ({ req, res }: contextArgs) => {
  return { res, req, loaders, ...contextReturns };
};

type Context = Awaited<ReturnType<typeof context>>;
export { context, type Context };
