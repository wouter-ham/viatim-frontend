import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { AccountComponent } from './account/account.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, AccountComponent],
  imports: [RouterOutlet],
})
export class DashboardModule {}
