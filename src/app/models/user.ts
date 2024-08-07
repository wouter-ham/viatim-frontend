import { Exclude, Expose } from 'class-transformer';

import { IUser } from '../interfaces/user';

@Exclude()
export class User implements IUser {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public middleName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public role: string;

  @Expose()
  public created: Date;

  @Expose()
  public updated: Date;

  @Expose()
  public deleted: Date;

  public get fullName(): string {
    return this.middleName
      ? `${this.firstName} ${this.middleName} ${this.lastName}`
      : `${this.firstName} ${this.lastName}`;
  }
}
