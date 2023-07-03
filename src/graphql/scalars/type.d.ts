import { type GraphQLScalarType } from 'graphql';

export type CustomScalar = (scalarName?: string) => {
  id: string;
  scalarTypeDef: string;
  graphqlScalarType: GraphQLScalarType;
};
