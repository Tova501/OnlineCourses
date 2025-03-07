import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { ManageMyCoursesComponent } from './components/course/manage-my-courses/manage-my-courses.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CourseAddComponent } from './components/course/course-add/course-add.component';
import { CourseManageComponent } from './components/course/course-manage/course-manage.component';
import { LessonListComponent } from './components/lesson/lesson-list/lesson-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserManageComponent } from './components/user/user-manage/user-manage.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentCoursesComponent } from './components/course/student-courses/student-courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'manage-courses', component: ManageMyCoursesComponent, canActivate: [AuthGuard] },
  { path: 'courses/:courseId/lessons', component: LessonListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: UserManageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'add-course',component:CourseAddComponent,canActivate:[AuthGuard]},
  { path: 'my-courses',component:StudentCoursesComponent,canActivate:[AuthGuard]} ,
  { path: 'manage-course/:id',component:CourseManageComponent,canActivate:[AuthGuard]}
];