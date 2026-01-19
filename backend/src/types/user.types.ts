export interface IBaseUser {
  name: string;
  email: string;
}

export interface IUser extends IBaseUser {
  password: string;
}
