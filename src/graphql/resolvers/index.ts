import { loadCustomScalars } from '../scalars/index.js';
import { BooksQueries } from './Books/index.js';
import { PostQueries, PostFields, PostMutations } from './post/index.js';

const { GraphqlScalarTypes } = loadCustomScalars;

const resolvers = {
  ...(await GraphqlScalarTypes()),

  Query: {
    ...BooksQueries,
    ...PostQueries
  },
  Mutation: {
    ...PostMutations
  },
  ...PostFields
};

export default resolvers;
