import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';
import {
  getNamedType,
  GraphQLScalarType,
  GraphQLInputFieldConfig,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLError,
  GraphQLList,
  GraphQLFieldConfig,
  isNonNullType,
  isScalarType
} from 'graphql';
import { CustomDirective } from '../types.js';
import { GraphQLSchema } from 'graphql';
import { ObjMap } from 'graphql/jsutils/ObjMap.js';

const argsFilterMap = new Map([
  ['hash', ['_eq', '_in']],
  ['exact', ['_lt', '_le', '_eq', '_in', '_between', '_gte', '_gt']],
  ['regexp', ['_regexp']],
  ['term', ['_allofterms ', '_anyofterms']],
  ['fulltext', ['_alloftext', '_anyoftext']]
]);

const typeFilterMap = new Map([
  ['enums', ['_eq', '_in']],
  ['Int', ['_lt', '_le', '_eq', '_in', '_between', '_gte', '_gt']],
  ['Float ', ['_lt', '_le', '_eq', '_in', '_between', '_gte', '_gt']],
  ['DateTime', ['_lt', '_le', '_eq', '_in', '_between', '_gte', '_gt']]
]);

const generateFields = (
  type: GraphQLInputType | GraphQLScalarType,
  by?: string[]
) => {
  const filterKeys: string[] = [];
  const fields: ObjMap<GraphQLInputFieldConfig> = {};

  if (by && by?.length !== 0) {
    by.forEach((arg) => {
      argsFilterMap.get(arg)?.forEach((filterKey) => {
        const isFilterKeyTypeAlreadyCreated = filterKeys.findIndex(
          (key) => key === filterKey
        );

        // if already created
        if (isFilterKeyTypeAlreadyCreated !== -1) {
          return;
        }

        filterKeys.push(filterKey);

        if (filterKey === '_in') {
          fields[filterKey] = { type: new GraphQLList(type) };
        } else {
          fields[filterKey] = { type: type };
        }
      });
    });

    return fields;
  }

  typeFilterMap
    .get(getNamedType(type).name)
    ?.map((filterName) => (fields[filterName] = { type: type }));

  return fields;
};

class FilterType extends GraphQLInputObjectType {
  constructor(type: GraphQLInputType, byArgument?: string[]) {
    super({
      name: `${getNamedType(type).name}_with${
        byArgument ? `_${byArgument.toString().replaceAll(',', '_')}` : ''
      }`,
      description: `${getNamedType(type).name} Filter with ${byArgument}`,
      fields: generateFields(type, byArgument)
    });
  }
}

const searchFilterTypes: Map<string | string[] | undefined, GraphQLInputType> =
  new Map();

const getFilterType = (
  type: GraphQLInputType | GraphQLScalarType,
  by?: string[]
) => {
  if (by && by?.length === 0) {
    const searchFilterByTypeName = searchFilterTypes.get(
      getNamedType(type).name
    );

    if (!searchFilterByTypeName) {
      const newType = new FilterType(type);

      searchFilterTypes.set(getNamedType(type).name, newType);
      return newType;
    }

    return searchFilterByTypeName;
  }

  const searchFilterByArgumentName = searchFilterTypes.get(by);

  if (!searchFilterByArgumentName) {
    const newType = new FilterType(type, by);

    searchFilterTypes.set(by, newType);
    // console.log('----------===>', newType);
    return newType;
  }

  return searchFilterByArgumentName;
};

const searchDirective: CustomDirective = (directiveName = 'search') => {
  function wrapType<
    F extends GraphQLFieldConfig<any, any> | GraphQLInputFieldConfig
  >(fieldConfig: F, by?: string[]): void {
    if (
      isNonNullType(fieldConfig.type) &&
      isScalarType(fieldConfig.type.ofType)
    ) {
      fieldConfig.type = getFilterType(fieldConfig.type.ofType, by);
    } else if (isScalarType(fieldConfig.type)) {
      fieldConfig.type = getFilterType(fieldConfig.type, by);
    } else {
      throw new Error(`Not a scalar type: ${fieldConfig.type.toString()}`);
    }
  }

  return {
    directiveTypeDef: `#graphql\n
    enum SearchFilterArgs {
      hash
      exact
      regexp
      term
      fulltext
    }
    directive @${directiveName}(by: [SearchFilterArgs!]) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
    \n`,
    directiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.INPUT_OBJECT_FIELD]: (fieldConfig) => {
          const searchDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];

          // console.log('----------===>', fieldConfig.type);

          if (searchDirective) {
            // search directive argument can only be applyed to String Type FIELD_DEFINATION
            // if search directive has argument and Scalar type is not String
            // then throw error
            if (
              [...typeFilterMap.keys()].includes(
                getNamedType(fieldConfig.type).name
              ) &&
              Object.keys(searchDirective).length > 0
            ) {
              throw new GraphQLError(
                `Scalar type ${[
                  ...typeFilterMap.keys()
                ]} can not have **by** argument.`
              );
            }

            // if search directive has argument
            // if (Object.keys(searchDirective).length === 0) {
            //   fieldConfig.type = fieldConfig.type = getFilterType(
            //     fieldConfig.type
            //   );

            //   return fieldConfig;
            // }

            // if search directive has not argument
            // if (Object.keys(searchDirective).length > 0) {
            // fieldConfig.type = getFilterType(
            //   fieldConfig.type,
            //   searchDirective.by
            // );

            wrapType(fieldConfig, searchDirective?.by);
            return fieldConfig;
            // }
          }
        }
      })
  };
};

export default searchDirective;
