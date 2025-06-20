export interface Post {
  _id?: string;
  authorId: string;
  content: string;
  likes: string[];
  comments?: Comment[];
  createdAt?: Date;
}

export interface Comment {
  userId: string;
  content: string;
  createdAt?: Date;
}
