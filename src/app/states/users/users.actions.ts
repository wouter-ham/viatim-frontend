import { User } from '../../models/user';

export class OpenUsersList {
  public static readonly type = '[Users] Open users list';
}

export class OpenUserForm {
  public static readonly type = '[Users] Open user form';
  public constructor(public user?: User) {}
}

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