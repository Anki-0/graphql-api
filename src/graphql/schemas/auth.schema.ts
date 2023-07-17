export default /* GraphQL */ `
  # enum AuthErrorCodes {
  #   INVALID_CREDENTIALS
  #   ACCOUNT_NOT_FOUND
  #   ACCOUNT_LOCKED
  #   EMAIL_NOT_VERIFIED
  #   EMAIL_LINK_EXPIRED
  #   SERVICE_UNAVAILABLE
  #   UNKNOWN_ERROR
  #   TOO_MANY_REQUESTS
  # }

  #####################################################
  ####################  Auth types.  ##################
  #####################################################

  enum Operation {
    register
    login
  }

  ##############################################################
  ############  Auth Signin with credential types.  ############
  ##############################################################
  input SigninWithCredentialsInput {
    email: String!
    password: String!
  }
  type SigninWithCredentialsResponse {
    success: SingninSuccess
    error: SigninError
  }

  type SingninSuccess {
    message: String!
    token: String!
  }

  type SigninError implements Error {
    message: String!
    code: String!
  }

  ################################################################
  ############  Auth Signup with credential types.  ##############
  ################################################################
  input SignupWithCredentialsInput {
    email: String!
    password: String!
    username: String!
  }

  type SignupWithCredentialsResponse {
    success: SingnupSuccess
    error: SignupError
  }

  type SingnupSuccess {
    message: String!
  }

  type SignupError implements Error {
    message: String!
    code: String!
  }

  #####################################################
  ############  Auth Response types.  #################
  #####################################################

  enum TokenType {
    OTP
    LINK
  }
  enum ProviderTypes {
    oauth
    email
    credentials
  }

  input VerifyTokenInput {
    token: String!
    operation: Operation!
    email: String!
    type: TokenType!
    provider: ProviderTypes!
  }
  type VerifyTokenResponse {
    verified: Boolean!
    message: String!
  }

  # input CreateAccountInput {
  #   token: String
  #   operation: Operation!
  #   username: String!
  # }

  # type CreateAccountResponse {
  #   accountCreated: Boolean!
  # }
`;
