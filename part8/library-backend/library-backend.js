require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/book");
const Author = require("./models/author");
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);
const mongoose = require("mongoose");
const author = require("./models/author");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting to database", err.message));

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
bookCount: Int,
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
    authorCount: async () => {
      const count = await Author.countDocuments();
      return count;
    },
    allBooks: async (_, { author, genre }) => {
      if (!author && !genre) {
        console.log("no filters for author and genre found");
        return Book.find({}).populate("author");
      }

      console.log("author parameter", author);
      console.log("genre parameter", genre);

      const queryConditions = {};

      if (genre) {
        queryConditions.genre = genre;
      }

      if (author) {
        queryConditions.author = author;
      }

      const filteredBooks = await Book.find(queryConditions).populate("author");

      return filteredBooks;
    },
    allAuthors: async () => {
      const authorsWithBookCount = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "name",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $project: {
            name: 1,
            born: 1,
            bookCount: { $size: "$books" },
          },
        },
      ]);
      return authorsWithBookCount;
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      const author = await Author.findOne({ name: args.author });
      let authorId;

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        const newSavedAuthor = await newAuthor.save();
        console.log("new saved author is", newSavedAuthor);
        authorId = newSavedAuthor._id;
        console.log("newly created author's authorId is", authorId);
      } else {
        authorId = author._id;
        console.log("authorId is", authorId);
      }

      try {
        const book = new Book({
          ...args,
          author: authorId,
        });
        console.log("saving book", book);
        await book.save();
        return book;
      } catch (error) {
        console.log("error adding book", error);
        throw new Error("failed to add book");
      }
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const result = await Author.updateOne(
        { name: name },
        { $set: { born: setBornTo } },
      );

      if (result.matchedCount === 0) {
        return null;
      }

      const updatedAuthor = await Author.findOne({ name: name });
      return updatedAuthor;
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
