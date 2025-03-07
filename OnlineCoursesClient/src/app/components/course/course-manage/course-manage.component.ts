import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { LessonService } from '../../../services/lesson.service';
import { Lesson } from '../../../models/lesson.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  imports: [
    MatIconModule,
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
  styleUrls: ['./course-manage.component.css']
})
export class CourseManageComponent implements OnInit {
  course: Course | undefined;
  isLoggedIn: boolean = false;
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: ['', Validators.required],
      lessons: this.fb.array([])
    });
  }

  get lessonForms() {
    return this.courseForm.get('lessons') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
    if (id) {
      this.courseService.getCourseById(+id).subscribe(course => {
        this.course = course;
        this.lessonService.getLessons(this.course!.id).subscribe(lessons => {
          this.setLessons(lessons);
        });
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          teacherId: course.teacherId
        });

      }, error => {
        console.error('Error fetching course details:', error);
      });
    }
  }

  setLessons(lessons: Lesson[]) {
    const lessonFGs = lessons.map(lesson => this.fb.group({
      id: [lesson.id],
      title: [lesson.title, Validators.required],
      content: [lesson.content, Validators.required]
    }));
    const lessonFormArray = this.fb.array(lessonFGs);
    this.courseForm.setControl('lessons', lessonFormArray);
  }

  addLesson() {
    const lesson = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.lessonForms.push(lesson);
  }

  deleteLesson(i: number) {
    const lessonId = this.lessonForms.at(i).value.id;
    if (lessonId) {
      this.lessonService.deleteLesson(this.course!.id, lessonId, this.authService.getToken()).subscribe(() => {
        this.lessonForms.removeAt(i);
      }, error => {
        console.error('Error deleting lesson:', error);
      });
    } else {
      this.lessonForms.removeAt(i);
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      this.courseService.updateCourse(this.course!.id, course, this.authService.getToken()).subscribe(response => {
        // Handle course update success
      }, error => {
        // Handle course update error
      });
    }
  }
}