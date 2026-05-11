import { User } from './user.model';
import { Comment } from './comment.model';

export type ArticleStatus = 'ACTIVE' | 'HIDDEN';

export interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  status: ArticleStatus;
  author: User;
  comments: Comment[];
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  imageUrl: string;
  status: ArticleStatus;
}
