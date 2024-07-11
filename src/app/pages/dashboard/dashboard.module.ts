import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post/post.component';
import { PostListItemComponent } from './posts/components/post-list-item.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [DashboardComponent, PostsComponent, PostComponent, PostListItemComponent, AccountComponent],
  imports: [RouterOutlet, AsyncPipe, NgIf, NgForOf, RouterLink, ReactiveFormsModule, DatePipe],
})
export class DashboardModule {}
