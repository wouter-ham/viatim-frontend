import { IPost } from '../../interfaces/post';

export class LoadPosts {
  public static readonly type = '[Posts] Load posts';
}

export class CreatePost {
  public static readonly type = '[Posts] Create a post';
  public constructor(public post: IPost) {}
}

export class UpdatePost {
  public static readonly type = '[Posts] Update a post';
  public constructor(public post: IPost) {}
}

export class DeletePost {
  public static readonly type = '[Posts] Delete a post';
  public constructor(public post: IPost) {}
}
