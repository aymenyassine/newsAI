import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
             style="background: radial-gradient(circle, #06B6D4, transparent)"></div>
      </div>

      <div class="w-full max-w-md relative">
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                 style="background: linear-gradient(135deg, #8B5CF6, #06B6D4);">
              <span class="text-white font-black">IN</span>
            </div>
            <span class="font-black text-2xl text-gradient">IslyNews</span>
          </div>
          <h1 class="text-2xl font-black text-white">Create account</h1>
          <p class="text-zinc-500 text-sm mt-1">Join the future of news</p>
        </div>

        <div class="card-bg rounded-2xl p-8">
          <form (ngSubmit)="submit()" class="space-y-5">
            <div>
              <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Username</label>
              <input [(ngModel)]="username" name="username" required
                     placeholder="johndoe"
                     class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors">
            </div>
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
            <div>
              <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Confirm Password</label>
              <input [(ngModel)]="confirmPassword" name="confirmPassword" type="password" required
                     placeholder="••••••••"
                     class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                     [class.border-red-500]="confirmPassword && password !== confirmPassword"
                     [class.border-green-500]="confirmPassword && password === confirmPassword">
              @if (confirmPassword && password !== confirmPassword) {
                <p class="text-xs text-red-400 mt-1">Passwords do not match</p>
              }
            </div>

            @if (error()) {
              <div class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {{ error() }}
              </div>
            }
            @if (success()) {
              <div class="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                Account created! Redirecting to login...
              </div>
            }

            <button type="submit" [disabled]="loading() || success()"
                    class="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50"
                    style="background: linear-gradient(135deg, #06B6D4, #0891B2);">
              {{ loading() ? 'Creating...' : 'Create Account' }}
            </button>
          </form>

          <p class="text-center text-sm text-zinc-500 mt-6">
            Already have an account?
            <a routerLink="/auth/login" class="text-purple-400 hover:text-purple-300 transition-colors ml-1">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match.');
      return;
    }
    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters.');
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: () => {
        this.error.set('Registration failed. Email may already be in use.');
        this.loading.set(false);
      },
    });
  }
}
