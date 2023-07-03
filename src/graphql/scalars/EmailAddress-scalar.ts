import { Kind, GraphQLScalarType, GraphQLError, ASTNode } from 'graphql';
import { CustomScalar } from './type.js';

const validate = (value: any, ast?: ASTNode): string => {
  const EMAIL_ADDRESS_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (typeof value !== 'string') {
    throw new GraphQLError(`Value is not string: ${value}`, {
      nodes: ast
    });
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new GraphQLError(`Value is not a valid email address: ${value}`, {
      nodes: ast
    });
  }

  return value;
};

const emailScalar: CustomScalar = (scalarName = 'EmailAddress') => {
  return {
    id: `${scalarName}`,
    scalarTypeDef: `#graphql\n scalar ${scalarName}\n`,
    graphqlScalarType: new GraphQLScalarType({
      name: `${scalarName}`,
      description: `The ${scalarName} scalar type represents an email address as specified by [RFC1123](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address).`,
      parseValue: validate,
      serialize: validate,
      parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
          throw new GraphQLError(`Value is not string : ${ast.kind}`, {
            nodes: ast
          });
        }

        return validate(ast.value, ast);
      }
    })
  };
};

export default emailScalar;
