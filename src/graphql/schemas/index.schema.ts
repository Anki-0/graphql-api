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
    signin(input: SigninInput!): SigninResponse!
    signup(input: SignupInput!): SingupResponse!
    verifyToken(input: VerifyTokenInput!): VerifyTokenResponse!
    createAccount(input: CreateAccountInput!): CreateAccountResponse!

    #Post
    createPost(input: PostCreationInput!): Post!
    deletePost(input: PostDeletionArgs!): PostDeletionRespose!
  }
`;
