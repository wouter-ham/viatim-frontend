import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.apiUrl}/users`)
      .pipe(map((data: User[]) => plainToInstance(User, data)));
  }

  public getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((data: User) => plainToInstance(User, data)));
  }

  public updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${environment.apiUrl}/users/${user.id}`, user)
      .pipe(map((data: User) => plainToInstance(User, data)));
  }
}
