import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Change Password</h2>
    <mat-dialog-content>
      <form [formGroup]="passwordForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Current Password</mat-label>
          <input matInput [type]="hideCurrentPassword ? 'password' : 'text'" 
                 formControlName="currentPassword" required>
          <button mat-icon-button matSuffix type="button" 
                  (click)="hideCurrentPassword = !hideCurrentPassword">
            <mat-icon>{{hideCurrentPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required')">
            Current password is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>New Password</mat-label>
          <input matInput [type]="hideNewPassword ? 'password' : 'text'" 
                 formControlName="newPassword" required>
          <button mat-icon-button matSuffix type="button" 
                  (click)="hideNewPassword = !hideNewPassword">
            <mat-icon>{{hideNewPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
            New password is required
          </mat-error>
          <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">
            Password must be at least 6 characters
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Confirm New Password</mat-label>
          <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" 
                 formControlName="confirmPassword" required>
          <button mat-icon-button matSuffix type="button" 
                  (click)="hideConfirmPassword = !hideConfirmPassword">
            <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
            Please confirm your password
          </mat-error>
          <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('mismatch')">
            Passwords do not match
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="passwordForm.invalid"
              (click)="onSubmit()">
        Change Password
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    mat-dialog-content {
      min-width: 400px;
      padding: 20px 24px;
    }
  `]
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    
    if (!newPassword || !confirmPassword) return null;
    
    if (confirmPassword.value && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.dialogRef.close({
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
