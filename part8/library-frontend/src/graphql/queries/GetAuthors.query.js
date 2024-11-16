import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export default GET_AUTHORS;
