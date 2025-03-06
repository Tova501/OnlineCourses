import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserPostModel, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  getUserById(id: number, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const user = this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
    console.log('user service, getUserById:', user);
    return user;
  }

  updateUser(id: number, user: UserPostModel, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}