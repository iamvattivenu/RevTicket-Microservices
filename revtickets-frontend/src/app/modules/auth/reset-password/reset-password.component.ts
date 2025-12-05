import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatSnackBarModule],
  template: `
    <div class="reset-password-container">
      <mat-card class="reset-password-card">
        <mat-card-header>
          <mat-card-title>Reset Password</mat-card-title>
          <mat-card-subtitle>Enter your new password</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>New Password</mat-label>
              <input matInput type="password" [(ngModel)]="newPassword" name="newPassword" required>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Confirm Password</mat-label>
              <input matInput type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" class="submit-btn">
              Reset Password
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p><a routerLink="/login">Back to Login</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .reset-password-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: var(--primary-bg);
      padding: 20px;
    }
    .reset-password-card {
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
export class ResetPasswordComponent implements OnInit {
  newPassword = '';
  confirmPassword = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.snackBar.open('Invalid reset link', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
      return;
    }
    if (this.newPassword.length < 6) {
      this.snackBar.open('Password must be at least 6 characters!', 'Close', { duration: 3000 });
      return;
    }
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open(error.error?.message || 'Error resetting password', 'Close', { duration: 3000 });
      }
    });
  }
}
