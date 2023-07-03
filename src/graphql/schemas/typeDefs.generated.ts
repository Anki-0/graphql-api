import {gql} from 'graphql-tag'; export default gql`#graphql
#graphql

                      directive @date(
                      defaultFormat: String = "dd/MM/yyyy"
                      ) on FIELD_DEFINITION
    
#graphql

    enum SearchFilterArgs {
      hash
      exact
      regexp
      term
      fulltext
    }
    directive @search(by: [SearchFilterArgs!]) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
    
#graphql

                      directive @date(
                      defaultFormat: String = "dd/MM/yyyy"
                      ) on FIELD_DEFINITION
    
#graphql

    enum SearchFilterArgs {
      hash
      exact
      regexp
      term
      fulltext
    }
    directive @search(by: [SearchFilterArgs!]) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
    
#graphql
 scalar EmailAddress
#graphql
 scalar DateTime 
#graphql



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
input SignupInput {
  email: EmailAddress!
}

input SigninInput {
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

#graphql
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
#graphql


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
  
#graphql
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
  deletePost(input: PostDeletionArgs!): PostDeletionRespose!
}


#graphql

enum PostStatus {
    published
    draft
    private
  }
  
  type Post {
    id: ID!
    title: String!
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
    publishedBy: String
    status: PostStatus = published
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

  input PostDeletionArgs{
    postId:ID!
  } 
  
  #####################################################
  #############  Users Query Responses.  ##############
  #####################################################
  
  type PostsResponse {
    data: [Post]!
    pagination: PaginationResponse
  }

  type PostDeletionRespose{
    success:PostDeleteSuccess
    error:PostDeleteError
  }

  type PostDeleteSuccess{
    message:String!
  }
  type PostDeleteError{
    message:String!
  }
  
#graphql
type Tag {
  id: ID
  tag_name: String
  createdAt: String
  updatedAt: String
}

input FindTagsByInput {
  postId: String
  userId: String
}

input TagsFilterInput {
  where: FindTagsByInput
}


#graphql
type User {
  id: ID!
  username: String! @search
  email: String!
  user_role: String!
  name: String
  image: String
  address: String
  phone_number: Int
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