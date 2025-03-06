import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import { LessonService } from '../../../services/lesson.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  standalone: true,
  styleUrls: ['./lesson-list.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class LessonListComponent implements OnInit {
  @Input() courseId: number = 0;
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    if (this.courseId) {
      this.lessonService.getLessons(this.courseId).subscribe(lessons => {
        this.lessons = lessons;
      }, error => {
        console.error('Error fetching lessons:', error);
      });
    }
  }
}