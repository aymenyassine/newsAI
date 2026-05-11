import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, CreateArticleRequest } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly API = 'http://localhost:8082/articles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.API);
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.API}/${id}`);
  }

  getSummary(id: number): Observable<string> {
    return this.http.get(`${this.API}/${id}/summary`, { responseType: 'text' });
  }

  create(article: CreateArticleRequest): Observable<Article> {
    return this.http.post<Article>(this.API, article);
  }

  update(id: number, article: Partial<CreateArticleRequest>): Observable<Article> {
    return this.http.put<Article>(`${this.API}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
