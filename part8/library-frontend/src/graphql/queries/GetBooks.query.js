import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export default GET_BOOKS;
