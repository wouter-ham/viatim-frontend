import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Post } from '../../../../models/post';
import { User } from '../../../../models/user';
import { AuthState } from '../../../../states/auth';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;

  public user$: Observable<User> = inject(Store).select(AuthState.user);
}
