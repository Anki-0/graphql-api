export default /* GraphQL */ `
  #####################################################
  ###################  Common types.  #################
  #####################################################

  input PaginationInput {
    offset: Int
    limit: Int
  }

  type PaginationResponse {
    hasNextPage: Boolean
    hasPrevPage: Boolean
  }
`;
