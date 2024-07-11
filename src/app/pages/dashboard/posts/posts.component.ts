import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

import { IPost } from '../../../interfaces/post';
import { Post } from '../../../models/post';
import { CreatePost, LoadPosts, PostsState } from '../../../states/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent {
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

    console.log(post);

    this.store.dispatch(new CreatePost(post));
  }
}
