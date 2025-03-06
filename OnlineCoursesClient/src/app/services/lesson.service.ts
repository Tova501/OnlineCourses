import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }

  getLessonById(courseId: number, id: number, token: string): Observable<Lesson> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${id}`, { headers });
  }

  createLesson(courseId: number, lesson: Lesson, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  updateLesson(courseId: number, id: number, lesson: Lesson, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${id}`, lesson, { headers });
  }

  deleteLesson(courseId: number, id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${id}`, { headers });
  }
}
