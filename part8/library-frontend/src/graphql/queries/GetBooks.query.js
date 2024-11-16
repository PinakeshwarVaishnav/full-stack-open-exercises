import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export default GET_BOOKS;
