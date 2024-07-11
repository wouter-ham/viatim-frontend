import { Exclude, Expose, Type } from 'class-transformer';

import { IPost } from '../interfaces/post';
import { User } from './user';

@Exclude()
export class Post implements IPost {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public title: string;

  @Expose()
  public content: string;

  @Expose()
  @Type(() => Date)
  public created: Date;

  @Expose()
  @Type(() => Date)
  public updated: Date;

  @Expose()
  @Type(() => Date)
  public deleted: Date;

  @Expose()
  @Type(() => User)
  public user: User;
}
