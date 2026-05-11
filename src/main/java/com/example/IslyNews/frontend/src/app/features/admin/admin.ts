import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { UserService } from '../../core/services/user.service';
import { ArticleService } from '../../core/services/article.service';
import { AdminStats } from '../../core/models/admin.model';
import { User } from '../../core/models/user.model';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen pt-20 pb-16 px-4">
      <div class="max-w-7xl mx-auto">

        <!-- Header -->
        <div class="mb-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-1 h-4 rounded-full" style="background: #F43F5E"></span>
            <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Control Center</span>
          </div>
          <h1 class="text-3xl font-black text-white">Admin Panel</h1>
        </div>

        <!-- Stats -->
        @if (stats()) {
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            @for (stat of statCards(); track stat.label) {
              <div class="card-bg rounded-2xl p-5 border"
                   [style]="'border-color: ' + stat.color + '30'">
                <p class="text-xs text-zinc-500 uppercase tracking-widest mb-1">{{ stat.label }}</p>
                <p class="text-3xl font-black" [style]="'color: ' + stat.color">{{ stat.value }}</p>
              </div>
            }
          </div>
        }

        <div class="grid md:grid-cols-2 gap-8">

          <!-- Users Management -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span class="w-1 h-4 rounded-full" style="background: #8B5CF6"></span>
                <h2 class="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Users</h2>
              </div>
              <button (click)="showCreateUser = !showCreateUser"
                      class="text-xs px-3 py-1.5 rounded-lg border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-all">
                + New Journalist
              </button>
            </div>

            @if (showCreateUser) {
              <div class="card-bg rounded-xl p-4 mb-4 border border-purple-500/20">
                <div class="space-y-3">
                  <input [(ngModel)]="newUser.username" placeholder="Username"
                         class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500">
                  <input [(ngModel)]="newUser.email" placeholder="Email" type="email"
                         class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500">
                  <input [(ngModel)]="newUser.password" placeholder="Password" type="password"
                         class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500">
                  <button (click)="createJournalist()"
                          class="w-full py-2 rounded-lg text-sm font-medium text-white"
                          style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
                    Create Journalist
                  </button>
                </div>
              </div>
            }

            <div class="space-y-2 max-h-96 overflow-y-auto">
              @if (usersLoading()) {
                <div class="text-center py-8 text-zinc-600 text-sm">Loading...</div>
              }
              @for (user of users(); track user.id) {
                <div class="card-bg rounded-xl px-4 py-3 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                         style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
                      {{ user.username?.charAt(0)?.toUpperCase() }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">{{ user.username }}</p>
                      <p class="text-xs text-zinc-500">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-0.5 rounded-full"
                          [class]="roleBadge(user.role)">{{ user.role }}</span>
                    <button (click)="deleteUser(user.id)"
                            class="w-6 h-6 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              }
            </div>
          </section>

          <!-- Articles Management -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <span class="w-1 h-4 rounded-full" style="background: #06B6D4"></span>
              <h2 class="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Articles</h2>
            </div>
            <div class="space-y-2 max-h-[480px] overflow-y-auto">
              @if (articlesLoading()) {
                <div class="text-center py-8 text-zinc-600 text-sm">Loading...</div>
              }
              @for (article of articles(); track article.id) {
                <div class="card-bg rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">{{ article.title }}</p>
                    <p class="text-xs text-zinc-500">{{ article.author?.username }} · {{ article.createdAt | date:'MMM d' }}</p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs px-2 py-0.5 rounded-full"
                          [class]="article.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700 text-zinc-400'">
                      {{ article.status }}
                    </span>
                    <button (click)="deleteArticle(article.id)"
                            class="w-6 h-6 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
})
export class AdminComponent implements OnInit {
  stats = signal<AdminStats | null>(null);
  users = signal<User[]>([]);
  articles = signal<Article[]>([]);
  usersLoading = signal(true);
  articlesLoading = signal(true);
  showCreateUser = false;
  newUser = { username: '', email: '', password: '' };

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.stats.set(s));
    this.userService.getAll().subscribe({ next: u => { this.users.set(u); this.usersLoading.set(false); }, error: () => this.usersLoading.set(false) });
    this.articleService.getAll().subscribe({ next: a => { this.articles.set(a); this.articlesLoading.set(false); }, error: () => this.articlesLoading.set(false) });
  }

  statCards() {
    const s = this.stats()!;
    return [
      { label: 'Users', value: s.totalUsers, color: '#8B5CF6' },
      { label: 'Articles', value: s.totalArticles, color: '#06B6D4' },
      { label: 'Comments', value: s.totalComments, color: '#F59E0B' },
      { label: 'Likes', value: s.totalLikes, color: '#F43F5E' },
    ];
  }

  roleBadge(role: string): string {
    if (role === 'ADMIN') return 'bg-red-500/20 text-red-400';
    if (role === 'JOURNALIST') return 'bg-cyan-500/20 text-cyan-400';
    return 'bg-purple-500/20 text-purple-400';
  }

  createJournalist(): void {
    this.userService.createJournalist(this.newUser).subscribe(u => {
      this.users.update(list => [...list, u]);
      this.newUser = { username: '', email: '', password: '' };
      this.showCreateUser = false;
    });
  }

  deleteUser(id: number): void {
    this.userService.delete(id).subscribe(() => {
      this.users.update(list => list.filter(u => u.id !== id));
    });
  }

  deleteArticle(id: number): void {
    this.articleService.delete(id).subscribe(() => {
      this.articles.update(list => list.filter(a => a.id !== id));
    });
  }
}
