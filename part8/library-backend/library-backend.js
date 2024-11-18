require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/book");
const Author = require("./models/author");
const dbPassword = process.env.DB_PASSWORD;
const mongoose = require("mongoose");
const uri = `mongodb+srv://pinakeshwarvtech:${dbPassword}@cluster0.ebubh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting to database", err));

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
type Book {
title: String!,
author: Author!,
published: Int!,
genres: [String!]!
}

type Author {
name: String!
bookCount: Int!,
born: Int
}

type Query {

bookCount: Int!

authorCount: Int!

allBooks(author: String, genre:String): [Book!]!

allAuthors: [Author!]!
  }

type Mutation {

addBook(title: String!, author:String!, published: Int!, genres: [String!]!): Book!

editAuthor(name: String!, setBornTo: Int!): Author
}
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const count = await Book.countDocuments();
      return count;
    },
    authorCount: () => {
      return authors.length;
    },
    allBooks: async (_, { author, genre }) => {
      console.log("author parameter", author);
      console.log("genre parameter", genre);
      const queryConditions = {};

      if (genre) {
        queryConditions.genre = genre;
      }

      if (author) {
        queryConditions.author = author;
      }

      const filteredBooks = await Book.find(queryConditions);

      return filteredBooks;
    },
    allAuthors: () => {
      const bookCount = {};
      books.forEach((book) => {
        if (bookCount[book.author]) {
          bookCount[book.author]++;
        } else {
          bookCount[book.author] = 1;
        }
      });
      return authors.map((author) => ({
        name: author.name,
        bookCount: bookCount[author.name] || 0,
        born: author.born,
      }));
    },
  },
  Mutation: {
    addBook: async (_, { title, author, published, genres }) => {
      const book = new Book({
        id: books.length + 1,
        title,
        author,
        published,
        genres,
      });
      await book.save();
      return book;
    },
    editAuthor: (parent, { name, setBornTo }) => {
      const authorIndex = authors.findIndex((author) => author.name === name);
      if (authorIndex === -1) {
        return null;
      }
      authors[authorIndex].born = setBornTo;
      return authors[authorIndex];
    },
  },
  Author: {
    born: (book) => {
      return book.born || null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
