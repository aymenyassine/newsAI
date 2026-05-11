import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { ArticleStatus } from '../../../core/models/article.model';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen pt-20 pb-16 px-4">
      <div class="max-w-3xl mx-auto">

        <div class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-4 rounded-full" style="background: #8B5CF6"></span>
            <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Publish</span>
          </div>
          <h1 class="text-3xl font-black text-white">New Article</h1>
        </div>

        <form (ngSubmit)="submit()" class="space-y-6">

          <div>
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Title</label>
            <input [(ngModel)]="form.title" name="title" required
                   placeholder="Enter a compelling headline..."
                   class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors">
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Image URL</label>
            <input [(ngModel)]="form.imageUrl" name="imageUrl"
                   placeholder="https://..."
                   class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors">
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Content</label>
            <textarea [(ngModel)]="form.content" name="content" required rows="14"
                      placeholder="Write your article..."
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none leading-relaxed"></textarea>
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Status</label>
            <div class="flex gap-3">
              @for (s of statuses; track s.value) {
                <button type="button" (click)="form.status = s.value"
                        class="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all"
                        [class]="form.status === s.value
                          ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                          : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'">
                  {{ s.label }}
                </button>
              }
            </div>
          </div>

          @if (error()) {
            <p class="text-red-400 text-sm">{{ error() }}</p>
          }

          <button type="submit" [disabled]="loading()"
                  class="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50 glow-purple"
                  style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
            {{ loading() ? 'Publishing...' : 'Publish Article' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class CreateArticleComponent {
  form = { title: '', content: '', imageUrl: '', status: 'ACTIVE' as ArticleStatus };
  loading = signal(false);
  error = signal<string | null>(null);

  statuses = [
    { value: 'ACTIVE' as ArticleStatus, label: 'Active' },
    { value: 'HIDDEN' as ArticleStatus, label: 'Hidden' },
  ];

  constructor(private articleService: ArticleService, private router: Router) {}

  submit(): void {
    if (!this.form.title.trim() || !this.form.content.trim()) return;
    this.loading.set(true);
    this.error.set(null);
    this.articleService.create(this.form).subscribe({
      next: (a) => this.router.navigate(['/articles', a.id]),
      error: (e) => {
        this.error.set(e.error?.message ?? 'Failed to publish article.');
        this.loading.set(false);
      },
    });
  }
}
