import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  imports: [
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  standalone: true,
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  constructor(private authService: AuthService, private courseService: CourseService) { }

  courses: Course[] = [];

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }

  enroll(courseId: number): void {
    const token = this.authService.getToken();
    const userId = this.authService.getUser().userId;

    this.courseService.enrollInCourse(courseId, userId, token).subscribe(() => {
      console.log('Enrolled in course successfully');
      // Refresh the course list or update the UI as needed
    }, error => {
      console.error('Error enrolling in course:', error);
    });
  }

  unenroll(courseId: number): void {
    const token = this.authService.getToken();
    const userId = this.authService.getUser().userId;

    this.courseService.unenrollFromCourse(courseId, userId, token).subscribe(() => {
      console.log('Unenrolled from course successfully');
    }, error => {
      console.error('Error unenrolling from course:', error);
    });
  }
}