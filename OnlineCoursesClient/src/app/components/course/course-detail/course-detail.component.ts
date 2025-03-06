import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';
import { LessonListComponent } from "../../lesson/lesson-list/lesson-list.component";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  standalone: true,
  styleUrls: ['./course-detail.component.css'],
  imports: [LessonListComponent]
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // const token = this.authService.getToken();
    // this.isLoggedIn = !!token;
    if (id) {
      this.courseService.getCourseById(+id).subscribe(course => {
        this.course = course;
      }, error => {
        console.error('Error fetching course details:', error);
      });
    }
  }

  enroll(): void {
    if (this.course) {
      // Implement enrollment logic here
      console.log(`Enrolled in course: ${this.course.title}`);
    }
  }
}