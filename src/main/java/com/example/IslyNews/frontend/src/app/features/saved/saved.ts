import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SavedArticleService } from '../../core/services/saved-article.service';
import { AuthService } from '../../core/services/auth.service';
import { SavedArticle } from '../../core/models/saved-article.model';
import { ArticleCardComponent } from '../../shared/article-card/article-card';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  template: `
    <div class="min-h-screen pt-20 pb-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-4 rounded-full" style="background: #06B6D4"></span>
            <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Library</span>
          </div>
          <h1 class="text-3xl font-black text-white">Saved Articles</h1>
        </div>

        @if (loading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1,2,3]; track i) {
              <div class="card-bg rounded-xl h-72 animate-pulse"></div>
            }
          </div>
        } @else if (saved().length === 0) {
          <div class="text-center py-24">
            <div class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                 style="background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.2)">
              <svg class="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </div>
            <p class="text-zinc-500 text-sm">No saved articles yet.</p>
            <a routerLink="/" class="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Browse the feed →
            </a>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of saved(); track item.id) {
              <div class="relative group">
                <app-article-card [article]="item.article" />
                <button (click)="remove(item)"
                        class="absolute top-3 left-3 w-7 h-7 rounded-lg bg-zinc-900/90 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/50 transition-all opacity-0 group-hover:opacity-100">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class SavedComponent implements OnInit {
  saved = signal<SavedArticle[]>([]);
  loading = signal(true);

  constructor(private savedService: SavedArticleService, public auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (!user) return;
    this.savedService.getByUser(user.id).subscribe({
      next: (data) => { this.saved.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  remove(item: SavedArticle): void {
    this.savedService.remove(item.id).subscribe(() => {
      this.saved.update(list => list.filter(s => s.id !== item.id));
    });
  }
}
