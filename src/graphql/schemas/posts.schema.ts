export default `#graphql

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
  
`;
