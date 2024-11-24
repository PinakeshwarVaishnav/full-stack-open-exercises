const typeDefs = `
type Book {
title: String!,
author: Author!,
published: Int!,
genres: [String!]!
}

type Author {
name: String!
bookCount: Int,
born: Int
}

type User {
username: String!
favoriteGenre: String!
id: ID!
}

type Token {
value: String!
}

type Query {

me: User

bookCount: Int!

authorCount: Int!

allBooks(author: String, genres:[String!]): [Book!]!

allAuthors: [Author!]!
  }

type Mutation {

createUser(
username: String!
favoriteGenre: String!
): User

login(
username: String!
password: String!
): Token

addBook(title: String!, author:String!, published: Int!, genres: [String!]!): Book!

editAuthor(name: String!, setBornTo: Int!): Author
}
`;

module.exports = { typeDefs };
