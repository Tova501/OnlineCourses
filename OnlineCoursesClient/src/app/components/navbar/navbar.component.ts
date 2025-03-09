import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../authentication/auth-dialog/auth-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule]
})
export class NavbarComponent implements OnInit, OnDestroy { 
  isLoggedIn: boolean = false;
  isTeacher: boolean = true;
  // isTeacher: boolean = false;


  private authSubscription: Subscription = new Subscription();
  private teacherSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.teacherSubscription = this.authService.isTeacher().subscribe(isTeacher => {
       this.isTeacher = isTeacher;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.teacherSubscription) {
      this.teacherSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout(); 
  }
  
  openAuthDialog() {
    this.dialog.open(AuthDialogComponent);
  }
}