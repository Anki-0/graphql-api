export default /* GraphQL */ `
  ########################################################################
  ##  This file hold our Root Definitions (read as Query and Mutation)  ##
  ########################################################################

  type Query {
    #Users
    users(input: UserFilterInput): [User]!

    #Post
    posts(input: PostFilterInput, pagination: PaginationInput): PostsResponse

    # TAGS
    tags(input: TagsFilterInput, pagination: PaginationInput): [Tag]!
    popularTags(pagination: PaginationInput): [PopularTagsResponse]!
  }

  type Mutation {
    # Auth
    signinWithCredentials(
      input: SigninWithCredentialsInput!
    ): SigninWithCredentialsResponse!
    signupWithCredentials(
      input: SignupWithCredentialsInput!
    ): SignupWithCredentialsResponse!
    verifyToken(input: VerifyTokenInput!): VerifyTokenResponse!
    # signup(input: SignupInput!): SingupResponse!
    # createAccount(input: CreateAccountInput!): CreateAccountResponse!

    #Post
    createPost(input: PostCreationInput!): Post!
    deletePost(input: PostDeletionArgs!): PostDeletionRespose!
  }
`;
