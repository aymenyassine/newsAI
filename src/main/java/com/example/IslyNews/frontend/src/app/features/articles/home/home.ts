import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models/article.model';
import { ArticleCardComponent } from '../../../shared/article-card/article-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  template: `
    <div class="min-h-screen pt-16">

      <!-- Hero -->
      <section class="relative overflow-hidden py-20 px-4">
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
               style="background: radial-gradient(circle, #8B5CF6, transparent)"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
               style="background: radial-gradient(circle, #06B6D4, transparent)"></div>
        </div>
        <div class="max-w-7xl mx-auto text-center relative">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            AI-Powered News Platform
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span class="text-white">The Future of</span><br>
            <span class="text-gradient">News Intelligence</span>
          </h1>
          <p class="text-zinc-400 text-lg max-w-xl mx-auto">
            Curated journalism meets artificial intelligence. Stay ahead of the story.
          </p>
        </div>
      </section>

      <!-- Featured Article -->
      @if (featured()) {
        <section class="max-w-7xl mx-auto px-4 mb-12">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-1 h-4 rounded-full" style="background: #8B5CF6"></span>
            <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Featured</span>
          </div>
          <a [routerLink]="['/articles', featured()!.id]"
             class="group relative block rounded-2xl overflow-hidden card-bg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:glow-purple">
            <div class="md:flex">
              <div class="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-zinc-900">
                @if (featured()!.imageUrl) {
                  <img [src]="featured()!.imageUrl" [alt]="featured()!.title"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80">
                } @else {
                  <div class="w-full h-full min-h-64"
                       style="background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))"></div>
                }
                <div class="absolute inset-0" style="background: linear-gradient(to right, transparent, rgba(24,24,27,0.5))"></div>
              </div>
              <div class="md:w-1/2 p-8 flex flex-col justify-center">
                <span class="text-xs text-cyan-400 font-semibold uppercase tracking-widest mb-3">Breaking</span>
                <h2 class="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-purple-300 transition-colors">
                  {{ featured()!.title }}
                </h2>
                <p class="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {{ featured()!.content }}
                </p>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                       style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
                    {{ featured()!.author?.username?.charAt(0)?.toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-white">{{ featured()!.author?.username }}</p>
                    <p class="text-xs text-zinc-500">{{ featured()!.createdAt | date:'MMMM d, y' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </section>
      }

      <!-- Articles Grid -->
      <section class="max-w-7xl mx-auto px-4 pb-20">
        <div class="flex items-center gap-2 mb-6">
          <span class="w-1 h-4 rounded-full" style="background: #06B6D4"></span>
          <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Latest Stories</span>
        </div>

        @if (loading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="card-bg rounded-xl h-72 animate-pulse"></div>
            }
          </div>
        } @else if (articles().length === 0) {
          <div class="text-center py-20 text-zinc-600">No articles yet.</div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (article of rest(); track article.id) {
              <app-article-card [article]="article" />
            }
          </div>
        }
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  articles = signal<Article[]>([]);
  loading = signal(true);

  featured = () => this.articles()[0] ?? null;
  rest = () => this.articles().slice(1);

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles.set(data.filter(a => a.status === 'ACTIVE'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
