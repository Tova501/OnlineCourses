import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, MatTabsModule, MatIconModule, MatButtonModule],
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}