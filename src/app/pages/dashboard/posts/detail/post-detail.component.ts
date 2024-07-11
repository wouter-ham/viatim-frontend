import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { IPost } from '../../../../interfaces/post';
import { Post } from '../../../../models/post';
import { LoadPost, PostsState, UpdatePost } from '../../../../states/posts';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public post$: Observable<Post> = inject(Store).select(PostsState.post);

  public form: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });

  private postSubscription: Subscription;

  public constructor(
    public readonly store: Store,
    private router: ActivatedRoute,
  ) {
    console.log(this.router.snapshot.paramMap.get('id'));
    this.store.dispatch(new LoadPost(this.router.snapshot.paramMap.get('id')));
  }

  public ngOnInit(): void {
    this.postSubscription = this.post$.subscribe((post: Post): void => {
      this.form.patchValue(post);
    });
  }

  public submit(): void {
    const post: IPost = { ...this.form.value };

    this.store.dispatch(new UpdatePost(post));
    this.store.dispatch(new Navigate(['/dashboard/posts']));
  }

  public ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
