import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

import { IPost } from '../../../../interfaces/post';
import { Post } from '../../../../models/post';
import { CreatePost, LoadPosts, PostsState } from '../../../../states/posts';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
})
export class PostOverviewComponent {
  public posts$: Observable<Post[]> = inject(Store).select(PostsState.posts);

  public form: FormGroup = new FormGroup({
    id: new FormControl(v4(), Validators.required),
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });

  public constructor(public readonly store: Store) {
    this.store.dispatch(new LoadPosts());
  }

  public submit(): void {
    const post: IPost = { ...this.form.value };

    this.store.dispatch(new CreatePost(post));

    this.form.setValue({ id: v4(), title: null, content: null });
  }
}
