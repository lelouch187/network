import {gql} from '@apollo/client';

export const USER_ME = gql`
  query userMe {
    userMe {
      birthDate
      country
      createdAt
      deletedAt
      email
      firstName
      gender
      id
      lastName
      middleName
      phone
      updatedAt
    }
  }
`;

export const SIGN_UP = gql`
  mutation userSignUp(
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    userSignUp(
      input: {
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      problem {
        message
      }
      token
      user {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation userSignIn($email: String!, $password: String!) {
    userSignIn(input: {email: $email, password: $password}) {
      problem {
        message
      }
      token
      user {
        avatarUrl
        birthDate
        country
        createdAt
        deletedAt
        email
        firstName
        gender
        id
        lastName
        middleName
        phone
        updatedAt
      }
    }
  }
`;
