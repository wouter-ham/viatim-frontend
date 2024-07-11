import { Post } from '../../models/post';

export interface PostsStateModel {
  post: Post;
  posts: Post[];
}
