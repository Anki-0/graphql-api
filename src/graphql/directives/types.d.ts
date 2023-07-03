import { GraphQLSchema } from 'graphql';

export type CustomDirective = (directiveName: string) => {
  directiveTypeDef: string;
  directiveTransformer: (schema: GraphQLSchema) => GraphQLSchema;
};
