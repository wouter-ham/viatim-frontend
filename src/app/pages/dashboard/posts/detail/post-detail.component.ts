import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, Observable, Subscription, tap } from 'rxjs';

import { IPost } from '../../../../interfaces/post';
import { Post } from '../../../../models/post';
import { LoadPost, PostsState, UpdatePost } from '../../../../states/posts';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  public isBusy: boolean = false;
  public error?: { title: string; message?: string };

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
    this.store.dispatch(new LoadPost(this.router.snapshot.paramMap.get('id')));
  }

  public ngOnInit(): void {
    this.postSubscription = this.post$.subscribe((post: Post): void => {
      this.form.patchValue(post);
    });
  }

  public submit(): void {
    if (!this.form.valid) {
      return;
    }

    try {
      this.isBusy = true;

      const post: IPost = { ...this.form.value };

      this.store
        .dispatch(new UpdatePost(post))
        .pipe(
          catchError((e) => {
            this.error = {
              title: 'Iets ging verkeerd.',
              message: e.error.message,
            };
            this.isBusy = false;
            return EMPTY;
          }),
          tap((): boolean => (this.isBusy = false)),
        )
        .subscribe();
    } catch (e) {
      this.error = {
        title: 'Iets ging verkeerd.',
        message: e.error.message,
      };
    }

    this.store.dispatch(new Navigate(['/dashboard/posts']));
  }

  public ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
