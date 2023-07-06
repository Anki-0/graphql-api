import {
  GraphQLFieldConfig,
  GraphQLInputFieldConfig,
  isNonNullType,
  isScalarType,
  getNamedType
} from 'graphql';

export const wrapType = <F extends GraphQLFieldConfig<any, any> | GraphQLInputFieldConfig>(
  fieldConfig: F
) => {
  if (isNonNullType(fieldConfig.type) && isScalarType(fieldConfig.type.ofType)) {
    // fieldConfig.type = getSearchFilterType(fieldConfig.type.ofType);
  } else if (isScalarType(fieldConfig.type)) {
    // fieldConfig.type = getSearchFilterType(fieldConfig.type);
  } else {
    throw new Error(`Not a scalar type: ${fieldConfig.type.toString()}`);
  }
};
