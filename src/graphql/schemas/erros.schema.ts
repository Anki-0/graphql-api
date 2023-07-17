export default /* GraphQL */ `
  interface Error {
    message: String!
    code: String!
  }

  type InvalidCredentialError implements Error {
    message: String!
    code: String!
  }
`;
