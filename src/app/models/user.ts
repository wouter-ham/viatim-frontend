import { Exclude, Expose } from 'class-transformer';
import { IUser } from '../interfaces/user';

@Exclude()
export class User implements IUser {
  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public firstName: string;

  @Expose()
  public middleName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public role: string;

  @Expose()
  public modified: Date;

  @Expose()
  public created: Date;

  @Expose()
  public deleted: Date;

  public get fullName(): string {
    return this.middleName
      ? `${this.firstName} ${this.middleName} ${this.lastName}`
      : `${this.firstName} ${this.lastName}`;
  }
}
