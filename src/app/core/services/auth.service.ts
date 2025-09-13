import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, SignUpRequest, SignUpResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // JSON Server URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`);
  }

  signUp(userData: SignUpRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, userData);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return new Observable(observer => {
      this.getUserByEmail(email).subscribe(users => {
        observer.next(users.length > 0);
        observer.complete();
      });
    });
  }
}
