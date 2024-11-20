const { GraphQLError } = require("graphql");

const validateInput = (args) => {
  const { title, author, genres } = args;

  if (!title || title.length < 3) {
    throw new GraphQLError("title must be at least 3 characters long");
  }

  if (!author || author.length < 4) {
    throw new GraphQLError("author must be at least 4 characters long");
  }

  if (genres || genres.length === 0) {
    throw new GraphQLError("genres cannot be empty");
  }
};

module.exports = { validateInput };
