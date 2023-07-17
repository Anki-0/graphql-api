import {gql} from 'graphql-tag'; export default gql/* GraphQL */ `
 

                      directive @date(
                      defaultFormat: String = "dd/MM/yyyy"
                      ) on FIELD_DEFINITION
    


    enum SearchFilterArgs {
      hash
      exact
      regexp
      term
      fulltext
    }
    directive @search(by: [SearchFilterArgs!]) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
    


                      directive @date(
                      defaultFormat: String = "dd/MM/yyyy"
                      ) on FIELD_DEFINITION
    


    enum SearchFilterArgs {
      hash
      exact
      regexp
      term
      fulltext
    }
    directive @search(by: [SearchFilterArgs!]) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
    

 scalar EmailAddress

 scalar DateTime 

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

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

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

  interface Error {
    message: String!
    code: String!
  }

  type InvalidCredentialError implements Error {
    message: String!
    code: String!
  }

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

  enum PostStatus {
    published
    draft
    private
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    subTitle: String
    status: String!
    publishedBy: User!
    modifiedBy: String
    content: String
    image: String
    banner: String
    tags: [Tag]
    createdAt: DateTime! @date
    updatedAt: DateTime @date
  }

  #####################################################
  ##########  Users Filter Input types.  ##############
  #####################################################

  enum sortFilter {
    DESC
    ASC
  }

  input orderByFilter {
    createdAt: sortFilter
    updatedAt: sortFilter
  }

  input FindPostByInput {
    _or: [FindPostByInput!]
    id: String @search(by: [exact, fulltext, hash])
    title: String @search(by: [exact])
    slug: String @search(by: [exact])
    publishedBy: String
    status: PostStatus = published @search
    image: String
    content: String
    createdAt: DateTime @search
    updatedAt: DateTime @search

    _and: [FindPostByInput!]
    _not: [FindPostByInput!]
  }

  input PostFilterInput {
    where: FindPostByInput
    orderBy: orderByFilter
    # paginate: PaginationInput
  }

  input PostCreationInput {
    title: String!
    subTitle: String
    status: String!
    content: String
    image: String
    banner: String
    tags: [String]
  }

  input PostDeletionArgs {
    postId: ID!
  }

  #####################################################
  #############  Users Query Responses.  ##############
  #####################################################

  type PostsResponse {
    data: [Post]!
    pagination: PaginationResponse
  }

  type PostDeletionRespose {
    success: PostDeleteSuccess
    error: PostDeleteError
  }

  type PostDeleteSuccess {
    message: String!
  }
  type PostDeleteError {
    message: String!
  }

  type Tag {
    id: ID
    tag_name: String
    count: Int
    createdAt: String @date
    updatedAt: String @date
  }

  type PopularTagsResponse {
    id: ID
    tag_name: String
    count: Int
    createdAt: String @date
    updatedAt: String @date
  }

  input FindTagsByInput {
    userid: String
    username: String
    tagname: String
    id: ID
  }

  input TagsFilterInput {
    where: FindTagsByInput
  }

  type User {
    id: ID!
    username: String! @search
    email: String!
    user_role: String!
    name: String
    image: String
    address: String
    phone_number: String
    bio: String
    user_token: String
    birthdate: DateTime
    email_verified: DateTime
    user_token_expat: DateTime
    createdAt: DateTime! @date
    updatedAt: DateTime @date
  }

  enum UserAccountStatus {
    PENDING
    ACTIVE
    SUSPENDED
  }

  enum UserRoles {
    admin
    client
  }

  input FindUserByInput {
    id: String @search(by: [exact])
    name: String
    username: String @search(by: [exact])
    email_verified: DateTime
    email: String @search(by: [exact])
    image: String
    birthdate: DateTime
    phone_number: Int
    bio: String
    user_role: UserRoles
    account_status: UserAccountStatus
    createdAt: DateTime
    updatedAt: DateTime

    _or: [FindUserByInput!]
    _and: [FindUserByInput!]
    _not: [FindUserByInput!]
  }

  input UserFilterInput {
    where: FindUserByInput
  }
`