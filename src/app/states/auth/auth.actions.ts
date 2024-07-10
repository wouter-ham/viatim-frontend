import { IUser } from '../../interfaces/user';

export class LoginUser {
  public static readonly type = '[Auth] Login User';

  public constructor(
    public email: string,
    public password: string,
  ) {}
}

export class RegisterUser {
  public static readonly type = '[Auth] Register User';

  public constructor(public user: IUser) {}
}

export class RefreshToken {
  public static readonly type = '[Auth] Refresh Token';

  public constructor(public token: string) {}
}

export class ResetPassword {
  public static readonly type = '[Auth] Reset password';
  public constructor(public email: string) {}
}

export class LogoutUser {
  public static readonly type = '[Auth] Logout User';

  public constructor() {}
}
