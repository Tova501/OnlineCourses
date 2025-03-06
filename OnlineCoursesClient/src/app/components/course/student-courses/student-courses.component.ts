import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { RouterModule } from '@angular/router';
import { LessonListComponent } from "../../lesson/lesson-list/lesson-list.component";

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule, LessonListComponent],
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private authService: AuthService, private courseService: CourseService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    const userId = this.authService.getUser().userId;

    this.courseService.getCoursesByStudentId(userId, token).subscribe(courses => {
      this.courses = courses;
    }, error => {
      console.error('Error fetching student courses:', error);
    });
  }

  unenroll(courseId: number): void {
    const token = this.authService.getToken();
    const userId = this.authService.getUser().userId;

    this.courseService.unenrollFromCourse(courseId, userId, token).subscribe(() => {
      console.log('Unenrolled from course successfully');
      this.courseService.getCoursesByStudentId(userId, token).subscribe(courses => {
        this.courses = courses;
      }, error => {
        console.error('Error fetching student courses:', error);
      });
    }, error => {
      console.error('Error unenrolling from course:', error);
    });
  }
}
