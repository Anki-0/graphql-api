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
  tags(input: TagsFilterInput, pagination: PaginationInput): [Tag]!
  popularTags(pagination:PaginationInput):[PopularTagsResponse]!
}

type Mutation {
  # Auth
  emailSignup(input: SignupInput!): SingupResponse!
  signIn(input: SigninInput!): SigninResponse!
  verifyToken(input: VerifyTokenInput!): VerifyTokenResponse!
  createAccount(input: CreateAccountInput!): CreateAccountResponse!

  #Post
  createPost(input: PostCreationInput!): Post!
  deletePost(input: PostDeletionArgs!): PostDeletionRespose!
}


`;
