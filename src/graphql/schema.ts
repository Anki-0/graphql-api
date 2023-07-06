import Resolvers from './resolvers/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadCustomDerivatives } from './directives/index.js';
import typeDefs from './schemas/__generated__/typeDefs.js';

const { loadDirectiveTransformers } = loadCustomDerivatives;

let schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: Resolvers
});

schema = await loadDirectiveTransformers(schema);

export default schema;
