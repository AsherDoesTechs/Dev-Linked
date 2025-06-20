export interface User {
  _id?: string;
  name: string;
  email: string;
  username: string;
  picture: string;
  followers: string[];
  following: string[];
  createdAt?: Date;
}
