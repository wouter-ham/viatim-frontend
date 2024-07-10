import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { LogoutUser } from '../../../states/auth';

@Component({
  selector: 'app-users',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public constructor(public readonly store: Store) {}

  public logout(): void {
    this.store.dispatch(new LogoutUser());
  }
}
