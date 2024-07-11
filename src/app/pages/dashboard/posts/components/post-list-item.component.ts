import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Post } from '../../../../models/post';
import { User } from '../../../../models/user';
import { AuthState } from '../../../../states/auth';
import { DeletePost } from '../../../../states/posts';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent {
  @Input() post: Post;

  public user$: Observable<User> = inject(Store).select(AuthState.user);

  constructor(private store: Store) {}

  public delete(post: Post): void {
    if (confirm('Weet je zeker dat je deze post wilt verwijderen?')) {
      this.store.dispatch(new DeletePost(post));
    }
  }
}
