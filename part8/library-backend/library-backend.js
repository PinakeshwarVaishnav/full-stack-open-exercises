const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);
const mongoose = require("mongoose");
const author = require("./models/author");
const { validateInput } = require("./utility");
const { GraphQLError } = require("graphql");

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

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },

    bookCount: async () => {
      const count = await Book.countDocuments();
      return count;
    },

    authorCount: async () => {
      const count = await Author.countDocuments();
      return count;
    },

    allBooks: async (root, { author, genres }) => {
      if (!author && !genres) {
        console.log("no filters for author and genres found");
        return Book.find({}).populate("author");
      }

      console.log("author parameter", author);
      console.log("genre parameter", genres);

      const queryConditions = {};

      if (genres && genres.length > 0) {
        queryConditions.genres = genres;
      }

      if (author) {
        const foundAuthor = await Author.findOne({ name: author });
        if (foundAuthor) {
          queryConditions.author = foundAuthor._id;
        } else {
          console.log("author not found");
          return [];
        }
      }
      if (author && genres) {
        const filteredBooks = await Book.find({
          author: queryConditions.author,
          genres: { $in: queryConditions.genres },
        }).populate("author");

        console.log(
          "books with both author and genres filter are",
          filteredBooks,
        );
        return filteredBooks;
      } else if (author && !genres) {
        const filteredBooks = await Book.find({
          author: queryConditions.author,
        }).populate("author");

        console.log("books with only author filter are", filteredBooks);
        return filteredBooks;
      } else if (!author && genres) {
        const filteredBooks = await Book.find({
          genres: { $in: queryConditions.genres },
        }).populate("author");

        console.log("books with only genres filter are", filteredBooks);
        return filteredBooks;
      } else {
        return "no books found for the filters";
      }
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
    addBook: async (root, args, context) => {
      console.log("request for new book is", args);
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      validateInput(args);

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
        await book.save();
        const newBook = await book.populate("author");
        console.log("saved book", newBook);
        return newBook;
      } catch (error) {
        console.log("error adding book", error);
        throw new Error("failed to add book");
      }
    },

    editAuthor: async (root, { name, setBornTo }, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

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

    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });

        const newUser = await user.save();
        console.log("new created user is", newUser);
        return newUser;
      } catch (error) {
        throw new GraphQLError("creating the user failed", error);
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
