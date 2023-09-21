import {gql} from '@apollo/client';

export const POSTS = gql`
  query posts($afterCursor: String, $limit: Int = 20, $type: PostFilterType!) {
    posts(input: {afterCursor: $afterCursor, limit: $limit, type: $type}) {
      data {
        author {
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
        authorId
        createdAt
        deletedAt
        description
        id
        isLiked
        likesCount
        mediaUrl
        title
        updatedAt
      }
      pageInfo {
        afterCursor
        count
        perPage
      }
    }
  }
`;

export const POST = gql`
  query post($id: String!) {
    post(input: {id: $id}) {
      author {
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
      authorId
      createdAt
      deletedAt
      description
      id
      isLiked
      likesCount
      mediaUrl
      title
      updatedAt
    }
  }
`;

export const POST_UNLIKE = gql`
  mutation postUnlike($id: String!) {
    postUnlike(input: {id: $id}) {
      author {
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
      authorId
      createdAt
      deletedAt
      description
      id
      isLiked
      likesCount
      mediaUrl
      title
      updatedAt
    }
  }
`;
export const POST_LIKE = gql`
  mutation postLike($id: String!) {
    postLike(input: {id: $id}) {
      author {
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
      authorId
      createdAt
      deletedAt
      description
      id
      isLiked
      likesCount
      mediaUrl
      title
      updatedAt
    }
  }
`;
