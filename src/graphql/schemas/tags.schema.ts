export default `#graphql
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


`;
