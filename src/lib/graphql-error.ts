import { GraphQLError } from 'graphql';

export const userInputError = (msg: string) =>
  new GraphQLError(`Input error: ${msg}`, { extensions: { code: 'KS_USER_INPUT_ERROR' } });

export const accessDeniedError = (msg: string) =>
  new GraphQLError(`Access denied: ${msg}`, { extensions: { code: 'KS_ACCESS_DENIED' } });
