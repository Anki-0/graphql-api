import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schemas/__generated__/typeDefs.ts',
  emitLegacyCommonJSImports: false,
  generates: {
    'src/types/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../../graphql/context.js#Context',
        useIndexSignature: true,
        scalars: {
          DateTime: 'Date | null'
        }
      }
    }
  }
};

export default config;
