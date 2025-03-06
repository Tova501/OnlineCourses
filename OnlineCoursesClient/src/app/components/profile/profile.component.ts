import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { emptyUser, User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [MatSelectModule, MatIconModule , MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule , HttpClientModule]
})

export class ProfileComponent implements OnInit{
  profileForm: FormGroup;
  hidePassword = true; 
  user: User = emptyUser;

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService, private userService: UserService) {
    console.log('initiate profile form');
    this.profileForm =this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.loadUserProfile(token);
  }
  
  async loadUserProfile(token: string): Promise<void> {
    try {
      this.user = await firstValueFrom(this.userService.getUserById(this.authService.getUser().userId, token));
      this.profileForm.setValue({
        name: this.user.name,
        role: this.user.role
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async onSubmit(): Promise<void> {
    const token = this.authService.getToken();

    if (this.profileForm.valid) {
      try {
        await firstValueFrom(this.userService.updateUser(this.user?.id, {...this.user, ...this.profileForm.value}, token));
        this.router.navigate(['/']);
      } catch (error) {
        // Handle profile update error
        console.error(error);
      }
    }
  }
}