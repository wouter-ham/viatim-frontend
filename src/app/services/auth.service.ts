import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private http: HttpClient) {}

  public checkHash(hash: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/check-hash/${hash}`);
  }

  public activateUser(hash: string, password: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/${hash}/activate`, { password });
  }

  public resetPassword(user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/reset-password`, user);
  }

  public signInUser(email: string, password: string): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/users/login`, { username: email, password })
      .pipe(map((data: { access_token: string }) => data.access_token));
  }

  public getCurrentJwtToken(): string {
    const token: string = localStorage.getItem('jwtToken');

    if (!token) {
      return null;
    }

    return JSON.parse(token);
  }

  public getCurrentUser(): User {
    const token: string = this.getCurrentJwtToken();

    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);
    return plainToInstance(User, {
      id: decoded.sub,
      role: decoded.role,
      name: decoded.name,
    });
  }

  public refreshToken(token: string): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/users/refresh`, { token })
      .pipe(map((data: { access_token: string }) => data.access_token));
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
