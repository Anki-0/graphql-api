export default /* GraphQL */ `
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
`;
