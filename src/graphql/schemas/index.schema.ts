export default `#graphql
########################################################################
##  This file hold our Root Definitions (read as Query and Mutation)  ##
########################################################################

type Query {
  #Users
  users(input: UserFilterInput): [User]!

  #Post
  posts(input: PostFilterInput, pagination: PaginationInput): PostsResponse

  # TAGS
  tags(input: TagsFilterInput): [Tag]!
}

type Mutation {
  # Auth
  emailSignup(input: SignupInput!): SingupResponse!
  signIn(input: SigninInput!): SigninResponse!
  verifyToken(input: VerifyTokenInput!): VerifyTokenResponse!
  createAccount(input: CreateAccountInput!): CreateAccountResponse!

  #Post
  createPost(input: PostCreationInput!): Post!
}


`;
