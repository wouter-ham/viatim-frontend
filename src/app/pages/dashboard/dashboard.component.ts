import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(public readonly store: Store) {}

  public navigate(to: string): void {
    this.store.dispatch(new Navigate([to]));
  }
}
