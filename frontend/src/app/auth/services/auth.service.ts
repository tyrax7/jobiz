import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'jobiz_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  loadCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/auth/me`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}