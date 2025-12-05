import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatIconModule, MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>
            <div class="avatar">
              <mat-icon>account_circle</mat-icon>
            </div>
            My Profile
          </mat-card-title>
          <mat-card-subtitle>Update your personal information</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" required>
              <mat-error *ngIf="profileForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" readonly>
              <mat-hint>Email cannot be changed</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" required>
              <mat-error *ngIf="profileForm.get('phone')?.hasError('required')">
                Phone is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Role</mat-label>
              <input matInput formControlName="role" readonly>
              <mat-hint>Role cannot be changed</mat-hint>
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" 
                  [disabled]="profileForm.invalid || isLoading"
                  (click)="onSubmit()">
            {{isLoading ? 'Updating...' : 'Update Profile'}}
          </button>
          <button mat-button class="reset-btn" (click)="resetForm()">Reset</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="security-card">
        <mat-card-header>
          <mat-card-title>Account Security</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Keep your account secure by regularly updating your password.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="accent" (click)="changePassword()">
            Change Password
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 80px 20px 20px 20px;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .profile-card, .security-card {
      background: #ffffff;
      border: 2px solid #f84464;
      color: #333333;
      box-shadow: none;
      border-radius: 8px;
    }
    .mat-mdc-card-header .mat-mdc-card-title {
      color: #f84464;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .mat-mdc-card-header .mat-mdc-card-subtitle {
      color: #999999;
      margin-top: 8px;
    }
    .profile-card .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #f84464;
      border-radius: 50%;
    }
    .avatar mat-icon {
      font-size: 1.5rem;
      color: #ffffff;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-card-actions {
      display: flex;
      gap: 10px;
    }
    mat-card-content {
      padding-top: 24px;
    }
    .security-card mat-card-content {
      padding-top: 0;
    }
    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: #666666;
      --mdc-outlined-text-field-input-text-color: #333333;
      --mdc-outlined-text-field-outline-color: #cccccc;
      --mdc-outlined-text-field-hover-outline-color: #666666;
      --mdc-outlined-text-field-focused-outline-color: #666666;
      --mdc-outlined-text-field-focused-label-text-color: #666666;
      --mdc-outlined-text-field-hover-label-text-color: #ffffff;
      --mdc-outlined-text-field-disabled-label-text-color: #999999;
      background: transparent;
      border-radius: 8px;
    }
    ::ng-deep .mat-mdc-form-field-input-control input {
      color: #333333 !important;
      font-size: 16px;
      padding: 16px !important;
      font-weight: 400;
    }
    ::ng-deep .mat-mdc-form-field-input-control input:disabled {
      color: #f0f0f0 !important;
    }
    ::ng-deep .mat-mdc-form-field-hint {
      color: #999999 !important;
    }
    ::ng-deep .mat-mdc-form-field-error {
      color: #ff5252 !important;
    }
    .reset-btn {
      color: #cccccc !important;
    }
    .reset-btn:hover {
      background-color: rgba(204, 204, 204, 0.1) !important;
      color: #ffffff !important;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{value: '', disabled: true}],
      phone: ['', Validators.required],
      role: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.isLoading = true;
      
      // Update user data
      const updatedUser = {
        ...this.currentUser,
        name: this.profileForm.get('name')?.value,
        phone: this.profileForm.get('phone')?.value
      };
      
      // Update AuthService
      this.authService.updateUser(updatedUser);
      
      // Update current user and form
      this.currentUser = updatedUser;
      this.profileForm.patchValue({
        name: updatedUser.name,
        phone: updatedUser.phone
      });
      
      // Simulate API call
      setTimeout(() => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        this.isLoading = false;
      }, 1000);
    }
  }

  resetForm(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        phone: this.currentUser.phone
      });
    }
  }

  changePassword(): void {
    this.snackBar.open('Password change feature coming soon!', 'Close', { duration: 3000 });
  }
}