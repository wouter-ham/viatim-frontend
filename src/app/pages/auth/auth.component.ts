import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(public readonly store: Store) {}
}
