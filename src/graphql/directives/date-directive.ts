import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLString } from 'graphql';
import { format as formatDate, parseISO } from 'date-fns';
import { CustomDirective } from './types.js';

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
const dateDirective: CustomDirective = (directiveName = 'date') => {
  return {
    directiveTypeDef: `#graphql\n
                      directive @${directiveName}(
                      defaultFormat: String = "dd/MM/yyyy"
                      ) on FIELD_DEFINITION
    \n`,
    directiveTransformer: (schema) =>
      mapSchema(schema, {
        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          // Check whether this field has the specified directive
          const dateDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

          if (dateDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            const { defaultFormat } = dateDirective;

            if (!fieldConfig.args) {
              throw new Error('Unexpected Error. args should be defined.');
            }

            fieldConfig.args['format'] = {
              type: GraphQLString
            };

            fieldConfig.type = GraphQLString;
            fieldConfig.resolve = async (source, { format, ...args }, context, info) => {
              const newFormat: string = format || defaultFormat;
              const date = <Date | number>await resolve(source, args, context, info);

              return date ? formatDate(date, newFormat, {}) : date;
            };

            return fieldConfig;
          }
        }
      })
  };
};

export default dateDirective;
