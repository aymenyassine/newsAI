import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/articles/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'articles/create',
    loadComponent: () => import('./features/articles/create-article/create-article').then(m => m.CreateArticleComponent),
    canActivate: [roleGuard(['JOURNALIST', 'ADMIN'])],
  },
  {
    path: 'articles/:id',
    loadComponent: () => import('./features/articles/article-detail/article-detail').then(m => m.ArticleDetailComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'saved',
    loadComponent: () => import('./features/saved/saved').then(m => m.SavedComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then(m => m.AdminComponent),
    canActivate: [roleGuard(['ADMIN'])],
  },
  { path: '**', redirectTo: '' },
];
