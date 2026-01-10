import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/api/users/profile`, user);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/profile`);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/users/change-password`, {
      currentPassword,
      newPassword
    });
  }
}