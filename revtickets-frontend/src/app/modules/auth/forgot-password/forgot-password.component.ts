import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatSnackBarModule],
  template: `
    <div class="forgot-password-container">
      <mat-card class="forgot-password-card">
        <mat-card-header>
          <mat-card-title>Reset Password</mat-card-title>
          <mat-card-subtitle>Enter your email to reset your password</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" class="submit-btn">
              Send Reset Link
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p>Remember your password? <a routerLink="/login">Back to Login</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: var(--primary-bg);
      padding: 20px;
    }
    .forgot-password-card {
      width: 100%;
      max-width: 400px;
      background: var(--card-bg);
      color: var(--text-primary);
    }
    mat-card-title {
      color: var(--text-primary) !important;
    }
    mat-card-subtitle {
      color: var(--text-secondary) !important;
      margin-top: 8px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    ::ng-deep .mat-mdc-form-field .mdc-floating-label {
      color: var(--text-primary) !important;
    }
    ::ng-deep .mat-mdc-form-field .mdc-floating-label--float-above {
      color: var(--primary-color) !important;
    }
    ::ng-deep .mat-mdc-form-field input {
      color: var(--text-primary) !important;
    }
    .submit-btn {
      width: 100%;
      margin-top: 16px;
    }
    mat-card-actions {
      text-align: center;
    }
    mat-card-actions p {
      color: var(--text-secondary);
      font-size: 14px;
    }
    mat-card-actions a {
      color: var(--primary-color);
      text-decoration: none;
    }
    mat-card-actions a:hover {
      text-decoration: underline;
    }
  `]
})
export class ForgotPasswordComponent {
  email = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Close', { duration: 5000 });
          this.email = '';
        },
        error: (error) => {
          this.snackBar.open(error.error?.message || 'Failed to send reset link', 'Close', { duration: 5000 });
        }
      });
    }
  }
}