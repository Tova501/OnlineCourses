import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [MatSelectModule,MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>
    ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registering:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe(response => {
        console.log('Registration successful:', response);
        this.dialogRef.close();
      }, error => {
        console.error('Registration error:', error);
      });
    }
  }
}