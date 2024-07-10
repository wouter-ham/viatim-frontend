import { User } from '../../models/user';

export class LoadUsers {
  public static readonly type = '[Users] Load users';
}

export class DeleteUser {
  public static readonly type = '[Users] Delete user';
  public constructor(public user: User) {}
}

export class SaveUser {
  public static readonly type = '[Users] Save user';
  public constructor(public user: User) {}
}
