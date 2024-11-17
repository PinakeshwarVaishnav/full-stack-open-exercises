import { gql } from "@apollo/client";

const ADD_AUTHOR_DETAIL = gql`
  mutation AddAuthorDetail($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export default ADD_AUTHOR_DETAIL;
