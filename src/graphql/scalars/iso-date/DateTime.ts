import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { CustomScalar } from '../type.js';
import { parseDateTime } from './formatter.js';
import { validateDateTime, validateJSDate } from './validator.js';

const DateTimeScalarTypeDef = (scalarName: string) =>
  /* GraphQL */ `\n scalar ${scalarName} \n`;

const DateTimeScalar: CustomScalar = (scalarName = 'DateTime') => {
  return {
    id: `${scalarName}`,
    scalarTypeDef: DateTimeScalarTypeDef(scalarName),
    graphqlScalarType: new GraphQLScalarType({
      name: `${scalarName}`,
      description:
        'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
        'compliant with the `date-time` format outlined in section 5.6 of ' +
        'the RFC 3339 profile of the ISO 8601 standard for representation ' +
        'of dates and times using the Gregorian calendar.',
      parseValue(value) {
        if (value instanceof Date) {
          if (validateJSDate(value)) {
            return value;
          }
          throw new GraphQLError(
            `DateTime cannot represent an invalid date-time-string ${value}.`
          );
        }

        if (typeof value === 'string') {
          if (validateDateTime(value)) {
            return parseDateTime(value);
          }
          throw new GraphQLError(
            `DateTime cannot represent an invalid date-time-string ${value}.`
          );
        }
        throw new GraphQLError(
          `DateTime cannot represent non string or Date type ${JSON.stringify(
            value
          )}`
        );
      },
      serialize(value) {
        if (value instanceof Date) {
          if (validateJSDate(value)) {
            return value;
          }
          throw new GraphQLError(
            'DateTime cannot represent an invalid Date instance'
          );
        } else if (typeof value === 'string') {
          if (validateDateTime(value)) {
            return parseDateTime(value);
          }
          throw new GraphQLError(
            `DateTime cannot represent an invalid date-time-string ${value}.`
          );
        } else if (typeof value === 'number') {
          try {
            return new Date(value);
          } catch (e) {
            throw new GraphQLError(
              'DateTime cannot represent an invalid Unix timestamp ' + value
            );
          }
        } else {
          throw new GraphQLError(
            'DateTime cannot be serialized from a non string, ' +
              'non numeric or non Date type ' +
              JSON.stringify(value)
          );
        }
      },
      parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
          throw new GraphQLError(
            `DateTime cannot represent non string or Date type ${
              'value' in ast && ast.value
            }`,
            {
              nodes: ast
            }
          );
        }
        const { value } = ast;
        if (validateDateTime(value)) {
          return parseDateTime(value);
        }
        throw new GraphQLError(
          `DateTime cannot represent an invalid date-time-string ${String(
            value
          )}.`,
          {
            nodes: ast
          }
        );
      }
    })
  };
};

export default DateTimeScalar;
