import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;

    if (Date.now() >= expirationTime) {
      this.clearToken();
      return false;
    }

    return !!token;
  }
}
