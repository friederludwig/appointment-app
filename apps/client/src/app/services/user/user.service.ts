import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  login(user: User): Observable<LoginResponse> {
    return new Observable((observer) => {
      this.httpClient
        .post<LoginResponse>('api/auth/login', {
          email: user.email,
          password: user.password,
        })
        .subscribe({
          next: (res: LoginResponse) => {
            localStorage.setItem('token', res.access_token);
            observer.next(res);
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  getCurrentUser(): User | null {
    const token = this.authService.getToken();

    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
