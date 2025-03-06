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
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }

}