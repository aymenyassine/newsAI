import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CreateCommentRequest } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly API = 'http://localhost:8082/comments';

  constructor(private http: HttpClient) {}

  getByArticle(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API}/article/${articleId}`);
  }

  add(req: CreateCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(this.API, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
