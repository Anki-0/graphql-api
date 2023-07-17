import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/',
  // : ['./src/graphql/schemas/__generated__/typeDefs.ts'],
  generates: {
    'src/types/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../../graphql/context.js#Context',
        scalars: {
          DateTime: 'Date | null'
        },
        useIndexSignature: true,
        includeDirectives: true
      }
    }
  }
};

export default config;
