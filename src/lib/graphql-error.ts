import { GraphQLError } from 'graphql';
import { logger } from '../utils/logger.js';

export const userInputError = (msg: string) =>
  new GraphQLError(`Input error: ${msg}`, {
    extensions: { code: 'USER_INPUT_ERROR' }
  });

export const accessDeniedError = (msg: string, meta?: Record<string, any>) => {
  const errorCode = 'ACCESS_DENIED';
  logger.error(msg, { code: errorCode, ...meta });

  return {
    error: {
      message: msg,
      code: errorCode
    }
  };
};

export const invalidCredentialsError = (
  msg: string,
  meta?: Record<string, any>
) => {
  const errorCode = 'INVALID_CREDENTIALS';
  logger.error(msg, { code: errorCode, ...meta });

  return {
    error: {
      message: msg,
      code: errorCode
    }
  };
};

export const emailAlreadyExistsError = (
  msg: string,
  meta?: Record<string, any>
) => {
  const errorCode = 'EMAIL_ALREADY_EXISTS_ERROR';
  logger.error(msg, { code: errorCode, ...meta });

  return {
    error: {
      message: msg,
      code: errorCode
    }
  };
};
