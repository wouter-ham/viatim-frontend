import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

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
