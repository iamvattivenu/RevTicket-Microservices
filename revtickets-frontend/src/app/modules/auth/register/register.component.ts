import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSnackBarModule
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Join RevTickets</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" required>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" required>
              <mat-error *ngIf="registerForm.get('phone')?.hasError('required')">
                Phone is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    class="full-width" [disabled]="registerForm.invalid || isLoading">
              {{isLoading ? 'Creating Account...' : 'Sign Up'}}
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      padding: 80px 20px 20px 20px;
      max-width: 1000px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
    }
    
    .register-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(184, 134, 11, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(184, 134, 11, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .register-card {
      width: 100%;
      max-width: 460px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 2px solid var(--primary-color);
      color: var(--text-primary);
      box-shadow: none;
      border-radius: 8px;
    }
    
    mat-card-header {
      padding: 24px;
    }
    
    mat-card-header .mat-mdc-card-title {
      color: var(--primary-color);
      font-weight: 600;
      text-align: center;
      margin: 0;
      font-size: 1.5rem;
    }
    
    mat-card-content {
      padding: 24px;
    }
    
    mat-card-content {
      padding: 32px 40px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 24px;
    }
    
    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: var(--text-primary);
      --mdc-outlined-text-field-input-text-color: var(--text-primary);
      --mdc-outlined-text-field-outline-color: var(--border-color);
      --mdc-outlined-text-field-hover-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-label-text-color: var(--primary-color);
      --mdc-outlined-text-field-hover-label-text-color: var(--text-primary);
      background: transparent;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    
    ::ng-deep .mat-mdc-text-field-wrapper {
      background: transparent !important;
      border-radius: 12px;
    }
    
    ::ng-deep .mat-mdc-form-field-input-control input {
      color: var(--text-primary) !important;
      font-size: 16px;
      padding: 16px !important;
      font-weight: 400;
    }
    
    ::ng-deep .mat-mdc-form-field-input-control input::placeholder {
      color: var(--text-secondary);
    }
    
    mat-card-actions {
      padding: 0 40px 40px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    button[type="submit"] {
      background: var(--primary-gradient) !important;
      border-radius: 12px !important;
      padding: 18px 24px !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      width: 100% !important;
      border: none !important;
      transition: all 0.3s ease !important;
      text-transform: none !important;
      box-shadow: 0 4px 15px rgba(184, 134, 11, 0.3) !important;
      height: 56px !important;
      color: #ffffff !important;
    }
    
    button[type="submit"]:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(184, 134, 11, 0.4) !important;
      opacity: 0.9;
    }
    
    button[type="submit"]:active {
      transform: translateY(0) !important;
    }
    
    button[type="submit"]:disabled {
      background: linear-gradient(135deg, #555, #666) !important;
      color: #888 !important;
      cursor: not-allowed !important;
      transform: none !important;
      box-shadow: none !important;
    }
    
    mat-card-actions p {
      text-align: center;
      color: var(--text-secondary);
      font-size: 15px;
      margin: 0;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
    }
    
    mat-card-actions a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    mat-card-actions a:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
    
    ::ng-deep .mat-mdc-form-field-error {
      color: #ff5252 !important;
      font-size: 13px;
      font-weight: 500;
    }
    
    @media (max-width: 480px) {
      .register-card {
        max-width: 100%;
        margin: 10px;
        border-radius: 16px;
      }
      
      mat-card-header {
        padding: 32px 24px 16px;
      }
      
      mat-card-title {
        font-size: 1.75rem;
      }
      
      mat-card-content {
        padding: 24px;
      }
      
      mat-card-actions {
        padding: 0 24px 32px;
      }
      
      button[type="submit"] {
        height: 52px !important;
        font-size: 15px !important;
      }
      
      .full-width {
        margin-bottom: 20px;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
}