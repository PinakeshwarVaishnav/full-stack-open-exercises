import { gql } from "@apollo/client";

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export default BOOK_ADDED;
