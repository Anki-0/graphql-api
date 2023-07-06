# Blog Graphql API

Welcome to the Blog Graphql API project! This project aims to showcase the implementation of a GraphQL API using Apollo Server for a blog. The API allows clients to interact with the blog's data efficiently and flexibly.

## **Table of Contents**

- Introduction
- Features
- Tech Stack
- Installation
- Usage
- Examples
- Contributing
- License

## **Introduction**

The Blog GraphQL API project demonstrates how GraphQL can revolutionize the way clients interact with a blog's data. GraphQL is a query language and runtime that enables clients to request precisely the data they need in a single query. This project implements a GraphQL API using Apollo Graphql and Graphql Tools to provide an optimized and flexible approach to accessing blog-related information.

Features
Efficient retrieval of blog posts, comments, and other related data
Advanced querying options with filtering, pagination, and sorting capabilities
Mutations for creating, updating, and deleting blog posts and comments

## **Tech Stack**

- Apollo Server – framework
- Sequelize – ORM
- MySql – database
- Graphql-Codegen – GraphQL Code Generator
- GraphQL Tools – custom directive and scalars
- DataLoader – for batching and caching

## Installation

To install and set up the Personal Blog GraphQL API project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Anki-0/graphql-api.git
```

2. Install the dependencies:

```bash
cd graphql-api
npm i
```

3. Configure the project by updating the configuration file:

```bash

```

4. Start the server:

```bash
npm run dev -> development server
npm run prod -> production server
```

Usage
Once the server is running, you can interact with the GraphQL API using a GraphQL client or a tool like GraphQL Playground. The API endpoint can be accessed at http://localhost:4000

Examples
Here are some example queries and mutations that you can try with the Blog GraphQL API:

```graphql
query GET_POSTS($input: PostFilterInput, $format: String, $pagination: PaginationInput) {
  posts(input: $input, pagination: $pagination) {
    data {
      id
      postTitle: title
      postContent: content
      postImage: image
      createdAt(format: $format)
      status
      tags {
        id
        tag_name
        createdAt
        updatedAt
      }
      author: publishedBy {
        id
        username
        displayName: name
        image
      }
    }
  }
}
```

Mutation to create a new blog post:

```graphql
mutation CREATE_POST($input: PostCreationInput!) {
  createPost(input: $input) {
    id
    title
    status
    subTitle
    publishedBy {
      id
      username
      email
      user_role
      image
      name
      address
      phone_number
    }
    content
    image
    banner
    tags {
      id
      tag_name
    }
    createdAt
    updatedAt
  }
}
```

Feel free to explore the available schema and create your own queries and mutations!

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the project's code of conduct.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as permitted by the license.

Enjoy using the Personal Blog GraphQL API project! If you have any questions or need assistance, please don't hesitate to reach out.

![Static Badge](https://img.shields.io/badge/built%20with-GraphQL-e10098.svg)
