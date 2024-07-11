import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { User } from '../../../models/user';
import { AuthState, LogoutUser } from '../../../states/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public user$: Observable<User> = inject(Store).select(AuthState.user);

  public constructor(public readonly store: Store) {}

  public logout(): void {
    this.store.dispatch(new LogoutUser());
  }
}
