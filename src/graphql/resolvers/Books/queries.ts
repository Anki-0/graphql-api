// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const BooksQueries = {
  books: () => [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
  ],
};
