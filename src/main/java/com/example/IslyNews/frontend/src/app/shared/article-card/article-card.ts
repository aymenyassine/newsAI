import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <a [routerLink]="['/articles', article.id]"
       class="group block card-bg rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:glow-purple">

      <!-- Image -->
      <div class="relative h-48 overflow-hidden bg-zinc-900">
        @if (article.imageUrl) {
          <img [src]="article.imageUrl" [alt]="article.title"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80">
        } @else {
          <div class="w-full h-full flex items-center justify-center"
               style="background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2));">
            <svg class="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
        }
        <!-- Status badge -->
        @if (article.status === 'HIDDEN') {
          <span class="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-400 border border-zinc-700">
            Hidden
          </span>
        }
        <!-- Gradient overlay -->
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(24,24,27,0.8) 0%, transparent 60%)"></div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <h3 class="font-bold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {{ article.title }}
        </h3>
        <p class="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-3">
          {{ article.content | slice:0:120 }}{{ (article.content || '').length > 120 ? '...' : '' }}
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                 style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
              {{ article.author?.username?.charAt(0)?.toUpperCase() }}
            </div>
            <span class="text-xs text-zinc-500">{{ article.author?.username }}</span>
          </div>
          <span class="text-xs text-zinc-600">{{ article.createdAt | date:'MMM d' }}</span>
        </div>
      </div>
    </a>
  `,
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;
}
