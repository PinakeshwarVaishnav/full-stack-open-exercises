const { validateInput } = require("./utility");
const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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

    // optimized implementation of allAuthors resolver using mongodb aggregation
    // this approach uses $lookup to fetch authors and their book counts in a singl query,
    // effectively avoiding the n+1 problem and improving performance
    allAuthors: async () => {
      const authorsWithBookCount = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
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
      console.log("authors with book count are", authorsWithBookCount);
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
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
