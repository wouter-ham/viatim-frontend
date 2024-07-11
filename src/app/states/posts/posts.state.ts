import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { CreatePost, DeletePost, LoadPost, LoadPosts, UpdatePost } from './posts.actions';
import { PostsStateModel } from './posts.state-model';

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    post: null,
    posts: [],
  },
})
@Injectable({ providedIn: 'root' })
export class PostsState {
  @Selector()
  static post(state: PostsStateModel): Post {
    return state.post;
  }

  @Selector()
  static posts(state: PostsStateModel): Post[] {
    return state.posts;
  }

  public constructor(private postsService: PostsService) {}

  @Action(LoadPost)
  public loadPost(ctx: StateContext<PostsStateModel>, { id }: LoadPost): Observable<Post> {
    return this.postsService.getPostById(id).pipe(
      tap((post: Post) => {
        return ctx.patchState({ post });
      }),
    );
  }

  @Action(LoadPosts)
  public loadPosts(ctx: StateContext<PostsStateModel>): Observable<Post[]> {
    return this.postsService.getPosts().pipe(
      tap((posts: Post[]) => {
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
        const index: number = posts.findIndex((p: Post): boolean => p.id === post.id);
        return ctx.patchState({
          posts: posts.filter((_: Post, i: number): boolean => i !== index),
        });
      }),
    );
  }
}
