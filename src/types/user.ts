export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SetProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
}
