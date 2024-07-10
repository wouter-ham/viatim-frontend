import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../../models/user';
import { UsersService } from '../../services';
import { DeleteUser, LoadUsers, SaveUser } from './users.actions';
import { UsersStateModel } from './users.state-model';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable({ providedIn: 'root' })
export class UsersState {
  @Selector()
  static users(state: UsersStateModel): Array<User> {
    return state.users;
  }

  public constructor(
    private store: Store,
    private usersService: UsersService,
  ) {}

  @Action(LoadUsers)
  public loadUsers(ctx: StateContext<UsersStateModel>): Observable<Array<User>> {
    return this.usersService.getUsers().pipe(
      tap((users: Array<User>) => {
        return ctx.patchState({ users });
      }),
    );
  }

  @Action(DeleteUser)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public deleteUser(ctx: StateContext<UsersStateModel>, { user }: DeleteUser): Observable<UsersStateModel> {
    return of(null);
  }

  @Action(SaveUser)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public saveUser(ctx: StateContext<UsersStateModel>, { user }: SaveUser): Observable<any> {
    return of(null);
  }
}
