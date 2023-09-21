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

export const USER_EDIT_PROFILE = gql`
  mutation userEditProfile(
    $avatarUrl: String
    $birthDate: String
    $country: String
    $email: String!
    $firstName: String
    $gender: GenderType
    $lastName: String
    $middleName: String
    $phone: String
  ) {
    userEditProfile(
      input: {
        avatarUrl: $avatarUrl
        birthDate: $birthDate
        country: $country
        email: $email
        firstName: $firstName
        gender: $gender
        lastName: $lastName
        middleName: $middleName
        phone: $phone
      }
    ) {
      problem {
        __typename
        ... on EmailAlreadyUsedProblem {
          message
        }
        ... on PhoneAlreadyUsedProblem {
          message
        }
      }
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
