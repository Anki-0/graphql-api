export default /* GraphQL */ `
  #####################################################
  ####################  Auth types.  ##################
  #####################################################

  interface Error {
    message: String!
  }

  enum Operation {
    register
    login
  }

  #####################################################
  ##############  Auth Input types.  ##################
  #####################################################
  input SigninInput {
    email: EmailAddress!
  }

  input SignupInput {
    email: EmailAddress!
  }

  input VerifyTokenInput {
    token: String!
    operation: Operation!
  }

  input CreateAccountInput {
    token: String
    operation: Operation!
    username: String!
  }

  #####################################################
  ############  Auth Response types.  #################
  #####################################################

  type SingupResponse {
    success: SignupSuccess
    error: SignupError
  }

  type SignupSuccess {
    message: String!
    link: String
  }
  type SignupError implements Error {
    message: String!
  }

  type SigninResponse {
    success: SingninSuccess
    error: SigninError
  }

  type SigninError implements Error {
    message: String!
  }

  type SingninSuccess {
    message: String!
  }

  type VerifyTokenResponse {
    verified: Boolean!
    message: String!
  }

  type CreateAccountResponse {
    accountCreated: Boolean!
  }
`;
