import { gql } from "@apollo/client";

const GET_FILTERED_BOOKS = gql`
  query allBooks($author: String, $genres: [String!]) {
    allBooks(author: $author, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export default GET_FILTERED_BOOKS;
