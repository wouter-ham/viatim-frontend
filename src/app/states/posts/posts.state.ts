import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { CreatePost, DeletePost, LoadPosts, UpdatePost } from './posts.actions';
import { PostsStateModel } from './posts.state-model';

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
  },
})
@Injectable({ providedIn: 'root' })
export class PostsState {
  @Selector()
  static posts(state: PostsStateModel): Post[] {
    return state.posts;
  }

  public constructor(private postsService: PostsService) {}

  @Action(LoadPosts)
  public loadPosts(ctx: StateContext<PostsStateModel>): Observable<Post[]> {
    return this.postsService.getPosts().pipe(
      tap((posts: Post[]) => {
        console.log(posts);
        console.log(posts[0]);
        console.log(typeof posts);
        return ctx.patchState({ posts });
      }),
    );
  }

  @Action(CreatePost)
  public createPost(ctx: StateContext<PostsStateModel>, { post }: CreatePost): Observable<Post> {
    return this.postsService.createPost(post).pipe(
      tap((post: Post) => {
        const posts: Post[] = ctx.getState().posts;
        return ctx.patchState({ posts: [...posts, post] });
      }),
    );
  }

  @Action(UpdatePost)
  public updatePost(ctx: StateContext<PostsStateModel>, { post }: UpdatePost): Observable<Post> {
    return this.postsService.updatePost(post).pipe(
      tap((post: Post) => {
        const posts: Post[] = ctx.getState().posts;
        posts[posts.indexOf(post)] = post;
        return ctx.patchState({ posts });
      }),
    );
  }

  @Action(DeletePost)
  public deletePost(ctx: StateContext<PostsStateModel>, { post }: DeletePost): Observable<{ success: boolean }> {
    return this.postsService.deletePost(post.id).pipe(
      tap(() => {
        const posts: Post[] = [...ctx.getState().posts];
        return ctx.patchState({
          posts: posts.slice(
            posts.findIndex((p: Post) => p.id === post.id),
            1,
          ),
        });
      }),
    );
  }
}
