import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { LessonService } from '../../../services/lesson.service';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, HttpClientModule]
})
export class CourseAddComponent {
  courseForm: FormGroup;
  lessons: FormArray;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private lessonService: LessonService,
    private authService: AuthService
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lessons: this.fb.array([])
    });
    this.lessons = this.courseForm.get('lessons') as FormArray;
  }

  get lessonForms() {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson() {
    const lesson = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.lessonForms.push(lesson);
  }

  deleteLesson(i: number) {
    this.lessonForms.removeAt(i);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value, this.authService.getToken()).subscribe(res => {
        const courseId = res.courseId;
        console.log('course ', courseId);
        console.log('res', res);
        const lessons = this.courseForm.value.lessons;
        console.log('lessons', lessons);
        lessons.forEach((lesson: any) => {
          this.lessonService.createLesson(courseId, lesson, this.authService.getToken()).subscribe();
        });
        this.router.navigate(['/manage-courses']);
      }, error => {
        console.error(error);
      });
    }
  }
}