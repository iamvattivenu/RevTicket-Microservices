import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSnackBarModule, MatIconModule
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

            <div class="divider">
              <span>OR</span>
            </div>

            <button mat-raised-button type="button" class="google-btn" (click)="loginWithGoogle()">
              <span class="google-btn-content">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                <span>Sign in with Google</span>
              </span>
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

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 24px 0;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--border-color);
    }

    .divider span {
      padding: 0 16px;
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 600;
    }

    .google-btn {
      width: 100% !important;
      height: 48px !important;
      background: white !important;
      color: #444 !important;
      border: 1px solid #ddd !important;
      padding: 0 !important;
      font-weight: 500 !important;
      font-size: 15px !important;
      border-radius: 8px !important;
    }

    .google-btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      height: 100%;
    }

    .google-btn svg {
      flex-shrink: 0;
    }

    .google-btn:hover {
      background: #f8f8f8 !important;
      border-color: #ccc !important;
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
export class RegisterComponent implements OnInit {
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

  ngOnInit(): void {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get('id_token');
      if (idToken) {
        this.handleGoogleCallback(idToken);
      }
    }
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

  loginWithGoogle(): void {
    const clientId = '1027193563356-ta6hhmqco0f1tbk95ljr671754odkh1q.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:4200/register';
    const scope = 'profile email';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token id_token&scope=${scope}&nonce=${Date.now()}`;
    window.location.href = authUrl;
  }

  handleGoogleCallback(idToken: string): void {
    this.isLoading = true;
    this.authService.googleLogin(idToken).subscribe({
      next: (response) => {
        window.history.replaceState({}, document.title, '/register');
        this.snackBar.open('Google sign-in successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        window.history.replaceState({}, document.title, '/register');
        const message = error.error?.message || 'Google sign-in failed';
        this.snackBar.open(message, 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }
}