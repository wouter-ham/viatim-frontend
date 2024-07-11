import { IUser } from './user';

export interface IPost {
  id: string;
  userId: string;
  title: string;
  content: string;

  user?: IUser;

  created: Date;
  updated: Date;
  deleted?: Date;
}
