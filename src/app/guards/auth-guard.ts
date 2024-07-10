import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate } from '@angular/router';
import { AuthState, LogoutUser } from '../states/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  public canActivate(): any {
    const isAuthenticated: boolean = this.store.selectSnapshot(AuthState.isAuthenticated);

    console.log(isAuthenticated);

    if (!isAuthenticated) {
      return this.store.dispatch(new LogoutUser());
    }

    return isAuthenticated;
  }
}
