import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public constructor(public readonly store: Store) {}
}
