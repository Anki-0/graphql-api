import { loadCustomScalars } from '../scalars/index.js';
import { TagQueries } from './tag/index.js';
import { PostQueries, PostFields, PostMutations } from './post/index.js';

const { GraphqlScalarTypes } = loadCustomScalars;

const resolvers = {
  ...(await GraphqlScalarTypes()),

  Query: {
    ...TagQueries,
    ...PostQueries
  },
  Mutation: {
    ...PostMutations
  },
  ...PostFields
};

export default resolvers;
