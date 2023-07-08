export default `#graphql
type Tag {
  id: ID
  tag_name: String
  count: Int
  createdAt: String @date
  updatedAt: String @date
}

type PopularTagsResponse{
  id: ID
  tag_name: String
  count: Int
  createdAt: String @date
  updatedAt: String @date
}

input FindTagsByInput {
  userid: String,
  username: String,
  tagname: String,
  id:ID
}

input TagsFilterInput {
  where: FindTagsByInput
}


`;
