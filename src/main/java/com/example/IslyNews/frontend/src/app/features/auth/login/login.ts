import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <!-- Background glow -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
             style="background: radial-gradient(circle, #8B5CF6, transparent)"></div>
      </div>

      <div class="w-full max-w-md relative">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                 style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
              <span class="text-white font-black">IN</span>
            </div>
            <span class="font-black text-2xl text-gradient">IslyNews</span>
          </div>
          <h1 class="text-2xl font-black text-white">Welcome back</h1>
          <p class="text-zinc-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div class="card-bg rounded-2xl p-8">
          <form (ngSubmit)="submit()" class="space-y-5">
            <div>
              <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Email</label>
              <input [(ngModel)]="email" name="email" type="email" required
                     placeholder="you@example.com"
                     class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors">
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
              <input [(ngModel)]="password" name="password" type="password" required
                     placeholder="••••••••"
                     class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors">
            </div>

            @if (error()) {
              <div class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {{ error() }}
              </div>
            }

            <button type="submit" [disabled]="loading()"
                    class="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50 glow-purple"
                    style="background: linear-gradient(135deg, #8B5CF6, #7C3AED);">
              {{ loading() ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <p class="text-center text-sm text-zinc-500 mt-6">
            No account?
            <a routerLink="/auth/register" class="text-purple-400 hover:text-purple-300 transition-colors ml-1">Register</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Invalid email or password.');
        this.loading.set(false);
      },
    });
  }
}
