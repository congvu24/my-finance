export interface User {
  username: String;
  token: String;
  name: String;
  avatar: String;
  age: Number;
  isMale: Boolean;
  uid: String;
}

export interface UserLoginInfo {
  username: String;
  password: String;
}
