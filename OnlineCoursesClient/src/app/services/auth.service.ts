import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private teacherStatus = new BehaviorSubject<boolean>(this.checkIfTeacher());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('authToken');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isTeacher(): Observable<boolean> {
    return this.teacherStatus.asObservable();
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.loggedIn.next(true);
          this.teacherStatus.next(this.checkIfTeacher());
        }
      })
    );
  }

  login(credentials: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.loggedIn.next(true);
          this.teacherStatus.next(this.checkIfTeacher());
        }
      })
    );
  }

  getToken(): string {
    if (typeof localStorage === 'undefined') {
      return '';
    }
    return localStorage.getItem('authToken') || '';
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  logout(): void {
    this.clearToken();
    this.loggedIn.next(false);
    this.teacherStatus.next(false);
  }

  getUser(): any {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      console.log('auth, getUser, token:', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      const user = payload.user || payload; // Assuming user might be directly in payload
      console.log('User:', user);
  
      return user;
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return null;
    }
  }

  private checkIfTeacher(): boolean {
    const user = this.getUser();
    console.log('Is user a teacher?', user && user.role === 'teacher'); // Add this line
    return user && user.role === 'teacher';
  }
}