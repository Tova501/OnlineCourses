import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../../services/lesson.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, HttpClientModule]
})
export class LessonAddComponent implements OnInit {
  lessonForm: FormGroup;
  courseId: number=0;

  constructor(private fb: FormBuilder, private lessonService: LessonService, private authService: AuthService, private route: ActivatedRoute) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      this.lessonService.createLesson(this.courseId, this.lessonForm.value, this.authService.getToken()).subscribe(() => {
        // Handle successful lesson creation
      }, error => {
        // Handle lesson creation error
        console.error(error);
      });
    }
  }
}