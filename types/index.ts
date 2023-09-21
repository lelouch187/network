export type ThemeType = {
  isDarkMode: boolean;
};

export type SignUpRequest = {
  email: String;
  password: String;
  passwordConfirm: String;
};

export type SignInRequest = {
  email: String;
  password: String;
};

export type SignUpResponse = {
  userSignUp: {problem: {message: String}; token: String; user: UserModel};
};

export type SignInResponse = {
  userSignIn: {problem: {message: String}; token: String; user: UserModel};
};

type UserModel = {
  avatarUrl: String;
  birthDate: String;
  country: String;
  createdAt: String;
  deletedAt: String;
  email: String;
  firstName: String;
  gender: String;
  id: String;
  lastName: String;
  middleName: String;
  phone: String;
  updatedAt: String;
};

export type UserMeResponse = {
  userMe: UserModel;
};
type EmailAlreadyUsedProblem = {
  message: String;
};
type PhoneAlreadyUsedProblem = {
  message: String;
};

type EditProfileProblemUnion =
  | EmailAlreadyUsedProblem
  | PhoneAlreadyUsedProblem;

export type EditProfileResponse = {
  userEditProfile: {problem: EditProfileProblemUnion; user: UserModel};
};
type PageAfterCursorInfo = {
  afterCursor: String;
  count: Number;
  perPage: Number;
};

export type PostModel = {
  author: UserModel;
  authorId: String;
  createdAt: String;
  deletedAt: String;
  description: String;
  id: String;
  isLiked: Boolean;
  likesCount: Number;
  mediaUrl: String;
  title: String;
  updatedAt: String;
};

export type FindPostsPaginationResponse = {
  posts: {data: [PostModel]; pageInfo: PageAfterCursorInfo};
};

export type PostResponse = {
  post: {
    author: UserModel;
    authorId: String;
    createdAt: String;
    deletedAt: String;
    description: String;
    id: String;
    isLiked: Boolean;
    likesCount: Number;
    mediaUrl: String;
    title: String;
    updatedAt: String;
  };
};
