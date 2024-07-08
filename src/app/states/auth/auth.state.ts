import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { jwtDecode } from 'jwt-decode';
import { switchMap } from 'rxjs/operators';

import { LoginUser, LogoutUser, RefreshToken, ResetPassword } from './auth.actions';
import { Observable, of } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AuthStateModel } from './auth.state-model';
import { UsersStateModel } from '../users/users.state-model';

const getUserFromToken = (token: string): User => {
  const decoded = jwtDecode(token) as any;
  return plainToInstance(User, { ...decoded, id: decoded.sub });
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    token: null,
    role: null,
  },
})
@Injectable({ providedIn: 'root' })
export class AuthState implements NgxsOnInit {
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    const user: User = AuthState.user(state);

    if (!user) {
      return false;
    }

    return state.user?.role === 'admin';
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  public constructor(
    private store: Store,
    private authService: AuthService,
  ) {}

  public ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    const state: AuthStateModel = ctx.getState();
    if (!state.user && state.token) {
      const user: User = getUserFromToken(state.token);
      ctx.patchState({ user });
    }
  }

  @Action(LoginUser)
  public loginUser(ctx: StateContext<AuthStateModel>, action: LoginUser): Observable<any> {
    return this.authService.signInUser(action.email, action.password).pipe(
      switchMap((token: string): Observable<void> => {
        const user: User = getUserFromToken(token);
        ctx.patchState({ user, token, role: user.role });

        if (!user) {
          return ctx.dispatch([new Navigate(['/login'])]);
        }

        return ctx.dispatch([new Navigate([`/dashboard`])]);
      }),
    );
  }

  @Action(RefreshToken)
  public refreshToken(ctx: StateContext<AuthStateModel>, action: RefreshToken): Observable<any> {
    return this.authService.refreshToken(action.token).pipe(
      switchMap((token: string): Observable<string | void> => {
        ctx.patchState({ token });

        const state: AuthStateModel = ctx.getState();
        const user: User = AuthState.user(state);

        if (!user) {
          return this.store.dispatch([new Navigate(['/login'])]);
        }

        return of(token);
      }),
    );
  }

  @Action(ResetPassword)
  public resetPassword(_: StateContext<UsersStateModel>, { user }: ResetPassword): Observable<any> {
    return this.authService.resetPassword(user);
  }

  @Action(LogoutUser)
  public logoutUser(ctx: StateContext<AuthStateModel>): Observable<any> {
    ctx.patchState({ token: null });
    return this.store.dispatch([new Navigate(['/login'])]);
  }
}
