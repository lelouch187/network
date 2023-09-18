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
