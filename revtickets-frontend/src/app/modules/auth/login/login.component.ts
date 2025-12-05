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
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login to RevTickets</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    class="full-width" [disabled]="loginForm.invalid || isLoading">
              {{isLoading ? 'Logging in...' : 'Login'}}
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p><a routerLink="/forgot-password">Forgot Password?</a></p>
          <p>Don't have an account? <a routerLink="/register">Sign up here</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      padding: 100px 20px;
      max-width: 520px;
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .login-card {
      width: 100%;
      background: white;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-xl);
      border-radius: var(--radius-xl);
      overflow: hidden;
      position: relative;
    }
    
    .login-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--primary-gradient);
    }
    
    mat-card-header {
      padding: 40px 40px 24px;
      text-align: center;
    }
    
    mat-card-header .mat-mdc-card-title {
      font-size: 2rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    
    mat-card-content {
      padding: 24px 40px 32px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 28px;
    }
    
    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: var(--text-secondary);
      --mdc-outlined-text-field-input-text-color: var(--text-primary);
      --mdc-outlined-text-field-outline-color: var(--border-color);
      --mdc-outlined-text-field-hover-outline-color: var(--border-hover);
      --mdc-outlined-text-field-focused-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-label-text-color: var(--primary-color);
      margin-bottom: 20px;
    }
    
    ::ng-deep .mat-mdc-text-field-wrapper {
      background: white !important;
      border-radius: var(--radius-md) !important;
    }
    
    ::ng-deep .mat-mdc-form-field-input-control input {
      color: var(--text-primary) !important;
      font-size: 15px;
      padding: 16px !important;
    }
    
    mat-card-actions {
      padding: 0 40px 40px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    button[type="submit"] {
      background: var(--primary-gradient) !important;
      border-radius: var(--radius-md) !important;
      padding: 16px !important;
      font-weight: 700 !important;
      font-size: 16px !important;
      width: 100% !important;
      border: none !important;
      transition: all var(--transition-normal) !important;
      box-shadow: var(--shadow-md) !important;
      height: 54px !important;
      color: white !important;
      letter-spacing: 0.02em !important;
    }
    
    button[type="submit"]:hover:not(:disabled) {
      transform: translateY(-2px) !important;
      box-shadow: var(--shadow-lg), var(--shadow-glow) !important;
    }
    
    button[type="submit"]:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
      transform: none !important;
    }
    
    mat-card-actions {
      padding: 0 40px 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    mat-card-actions p {
      text-align: center;
      color: var(--text-secondary);
      font-size: 14px;
      margin: 0;
    }
    
    mat-card-actions p:last-child {
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }
    
    mat-card-actions a {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      font-weight: 700;
      transition: all var(--transition-fast);
    }
    
    mat-card-actions a:hover {
      opacity: 0.8;
    }
    
    ::ng-deep .mat-mdc-form-field-error {
      color: var(--error-color) !important;
      font-size: 13px;
      font-weight: 600;
    }
    
    @media (max-width: 480px) {
      .login-container {
        padding: 80px 16px;
      }
      
      mat-card-header,
      mat-card-content,
      mat-card-actions {
        padding-left: 24px;
        padding-right: 24px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          const message = error.error?.message || error.error || 'Login failed. Please check your credentials.';
          this.snackBar.open(message, 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}