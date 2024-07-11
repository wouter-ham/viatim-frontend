import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment';
import { IPost } from '../interfaces/post';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(map((data: Post[]) => plainToInstance(Post, data)));
  }

  public getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.apiUrl}/posts/${id}`)
      .pipe(map((data: Post) => plainToInstance(Post, data)));
  }

  public getPostByUserId(userId: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.apiUrl}/posts/users/${userId}`)
      .pipe(map((data: Post) => plainToInstance(Post, data)));
  }

  public createPost(post: IPost): Observable<Post> {
    return this.http
      .post<Post>(`${environment.apiUrl}/posts/${post.id}`, post)
      .pipe(map((data: Post) => plainToInstance(Post, data)));
  }

  public updatePost(post: IPost): Observable<Post> {
    return this.http
      .put<Post>(`${environment.apiUrl}/posts/${post.id}`, post)
      .pipe(map((data: Post) => plainToInstance(Post, data)));
  }

  public deletePost(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${environment.apiUrl}/posts/${id}`);
  }
}
