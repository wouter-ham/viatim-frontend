import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, AccountComponent],
  imports: [RouterOutlet],
})
export class DashboardModule {}
