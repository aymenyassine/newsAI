import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/30"
         style="background: rgba(9,9,11,0.85); backdrop-filter: blur(20px);">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center"
               style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
            <span class="text-white font-black text-sm">IN</span>
          </div>
          <span class="font-black text-xl tracking-tight text-gradient">IslyNews</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-6">
          <a routerLink="/" routerLinkActive="text-purple-400" [routerLinkActiveOptions]="{exact:true}"
             class="text-sm text-zinc-400 hover:text-white transition-colors">Feed</a>
          @if (auth.isLoggedIn()) {
            <a routerLink="/saved" routerLinkActive="text-purple-400"
               class="text-sm text-zinc-400 hover:text-white transition-colors">Saved</a>
          }
          @if (auth.hasRole('JOURNALIST', 'ADMIN')) {
            <a routerLink="/articles/create" routerLinkActive="text-purple-400"
               class="text-sm text-zinc-400 hover:text-white transition-colors">Publish</a>
          }
          @if (auth.hasRole('ADMIN')) {
            <a routerLink="/admin" routerLinkActive="text-purple-400"
               class="text-sm text-zinc-400 hover:text-white transition-colors">Admin</a>
          }
        </div>

        <!-- Auth -->
        <div class="flex items-center gap-3">
          @if (auth.isLoggedIn()) {
            <div class="flex items-center gap-3">
              <div class="hidden sm:flex items-center gap-2">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                     style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
                  {{ auth.currentUser()?.username?.charAt(0)?.toUpperCase() }}
                </div>
                <span class="text-xs text-zinc-400">{{ auth.currentUser()?.username }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                      [class]="roleBadgeClass()">
                  {{ auth.role() }}
                </span>
              </div>
              <button (click)="auth.logout()"
                      class="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-all">
                Logout
              </button>
            </div>
          } @else {
            <a routerLink="/auth/login"
               class="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all">
              Login
            </a>
            <a routerLink="/auth/register"
               class="text-xs px-4 py-1.5 rounded-lg font-medium text-white transition-all glow-purple"
               style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
              Register
            </a>
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  roleBadgeClass(): string {
    const role = this.auth.role();
    if (role === 'ADMIN') return 'bg-red-500/20 text-red-400 border border-red-500/30';
    if (role === 'JOURNALIST') return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
    return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
  }
}
