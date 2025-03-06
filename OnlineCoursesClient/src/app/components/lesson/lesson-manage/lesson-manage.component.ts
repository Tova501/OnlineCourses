import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lesson } from '../../../models/lesson.model';
import { LessonService } from '../../../services/lesson.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lesson-manage',
  templateUrl: './lesson-manage.component.html',
  styleUrls: ['./lesson-manage.component.css'],
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule,ReactiveFormsModule ],
  standalone: true
})
export class LessonManageComponent implements OnInit {
  lessonForm: FormGroup;
  lessons: Lesson[] = [];

  constructor(private fb: FormBuilder, private lessonService: LessonService) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      courseId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons() {
    const courseId = this.lessonForm.get('courseId')?.value;
    if (courseId) {
      this.lessonService.getLessons(courseId).subscribe(lessons => {
        this.lessons = lessons;
      });
    }
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      const courseId = this.lessonForm.get('courseId')?.value;
      this.lessonService.createLesson(courseId, this.lessonForm.value, 'your_token_here').subscribe(() => {
        this.loadLessons();
        this.lessonForm.reset();
      });
    }
  }

  deleteLesson(courseId: number, id: number) {
    this.lessonService.deleteLesson(courseId, id, 'your_token_here').subscribe(() => {
      this.loadLessons();
    });
  }
}