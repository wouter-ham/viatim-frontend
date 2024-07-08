import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';

import { UsersStateModel } from './users.state-model';
import { UsersService } from '../../services';

import { DeleteUser, LoadUsers, OpenUsersList, SaveUser } from './users.actions';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthState } from '../auth';
import { User } from '../../models/user';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable({ providedIn: 'root' })
export class UsersState implements NgxsOnInit {
  @Selector()
  static users(state: UsersStateModel): Array<User> {
    return state.users;
  }

  public constructor(
    private store: Store,
    private usersService: UsersService,
  ) {}

  public ngxsOnInit(ctx: StateContext<UsersStateModel>): void {
    this.store
      .select(AuthState.token)
      .pipe(
        filter((token: string) => !!token),
        switchMap(() => this.store.select(AuthState.isAdmin)),
        filter((isAdmin) => isAdmin),
        switchMap(() => ctx.dispatch(new LoadUsers())),
      )
      .subscribe();
  }

  @Action(OpenUsersList)
  public openUsersList(_: StateContext<UsersStateModel>): Observable<any> {
    return this.store.dispatch(new Navigate([`/dashboard/users`]));
  }

  @Action(LoadUsers)
  public loadUsers(ctx: StateContext<UsersStateModel>): Observable<Array<User>> {
    return this.usersService.getUsers().pipe(
      tap((users: Array<User>) => {
        return ctx.patchState({ users });
      }),
    );
  }

  @Action(DeleteUser)
  public deleteUser(ctx: StateContext<UsersStateModel>, { user }: DeleteUser): Observable<UsersStateModel> {
    return of(null);
  }

  @Action(SaveUser)
  public saveUser(ctx: StateContext<UsersStateModel>, { user }: SaveUser): Observable<any> {
    return of(null);
  }
}
