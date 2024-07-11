import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard.component';
import { PostListItemComponent } from './posts/components/post-list-item.component';
import { PostDetailComponent } from './posts/detail/post-detail.component';
import { PostOverviewComponent } from './posts/overview/post-overview.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    PostListItemComponent,
    PostOverviewComponent,
    PostDetailComponent,
  ],
  imports: [RouterOutlet, AsyncPipe, NgIf, NgForOf, RouterLink, ReactiveFormsModule, DatePipe],
})
export class DashboardModule {}
