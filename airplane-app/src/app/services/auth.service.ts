import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse } from '../models/auth.model';

export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';
export const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly user = signal<AuthUser | null>(
    localStorage.getItem(USER_KEY)
      ? (JSON.parse(localStorage.getItem(USER_KEY)!) as AuthUser)
      : null,
  );
  readonly isLoggedIn = computed(() => this.token() !== null);

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(this.http.post<LoginResponse>(`${API_BASE}/auth/login`, credentials));
  }

  setSession(response: LoginResponse): void {
    this.token.set(response.token);
    this.user.set(response.user);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.user.set(null);
    this.router.navigate(['/login']);
  }
}
