import { loadCustomScalars } from '../scalars/index.js';
import { TagQueries } from './tag/index.js';
import { PostQueries, PostFields, PostMutations } from './post/index.js';
import { AuthMutation } from './auth/index.js';

const { GraphqlScalarTypes } = loadCustomScalars;

const resolvers = {
  ...(await GraphqlScalarTypes()),

  Query: {
    ...TagQueries,
    ...PostQueries
  },
  Mutation: {
    ...PostMutations,
    ...AuthMutation
  },
  ...PostFields
};

export default resolvers;
