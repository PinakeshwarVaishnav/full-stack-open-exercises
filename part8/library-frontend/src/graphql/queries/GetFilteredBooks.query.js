import { gql } from "@apollo/client";

const GET_FILTERED_BOOKS = gql`
  query GetBooksByGenre($genres: [String!]) {
    allBooks(genres: $genres) {
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
