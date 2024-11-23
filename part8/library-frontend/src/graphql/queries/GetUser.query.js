import { gql } from "@apollo/client";

const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export default GET_USER;
