import {  gql } from '@apollo/client';
export const GET_USERS = gql`
  query Query {
    users {
      _id
      name
      email
      phone
      password
      gender
      image
      bod
      address
      accessToken
    }
}
`;

export const ADD_USERS = gql`
    mutation Mutation($name: String!, $email: String!, $image: String, $providerUser: String! $password: String!) {
            addUser(name: $name, email: $email, image: $image, providerUser: $providerUser, password: $password) {
              result
              data {
                _id
              }
            }
          }
`;

export const CHECK_LOGIN = gql`
   mutation CheckLogin($email: String!, $password: String!) {
  checkLogin(email: $email, password: $password) {
    result
    data {
      accessToken
      image
      address
      bod
      email
      gender
      name
      phone
      _id
    }
  }
}
`;