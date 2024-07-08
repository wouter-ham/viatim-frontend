import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environment';

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
