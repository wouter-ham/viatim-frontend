import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private http: HttpClient) {}

  public checkHash(hash: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/check-hash/${hash}`);
  }

  public activateUser(hash: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${hash}/activate`, { password });
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/reset-password`, { email });
  }

  public signInUser(email: string, password: string): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map((data: { access_token: string }) => data.access_token));
  }

  public registerUser(user: IUser): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/users/register`, user)
      .pipe(map((data: { access_token: string }) => data.access_token));
  }

  public refreshToken(token: string): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/users/refresh`, { token })
      .pipe(map((data: { access_token: string }) => data.access_token));
  }
}
