import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  imports: [    MatCardModule,
      RouterModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      ReactiveFormsModule,
      HttpClientModule],
      standalone  : true,
  styleUrls: ['./course-manage.component.css']
})
export class CourseManageComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      this.courseService.createCourse(course, 'your-token-here').subscribe(response => {
        // Handle course creation success
      }, error => {
        // Handle course creation error
      });
    }
  }
}