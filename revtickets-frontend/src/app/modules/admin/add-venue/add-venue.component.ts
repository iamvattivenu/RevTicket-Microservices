import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VenueService, Venue } from '../../../core/services/venue.service';

@Component({
  selector: 'app-add-venue',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, MatIconModule
  ],
  template: `
    <div class="add-venue-container">
      <mat-card class="add-venue-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>{{isEditMode ? 'edit_location' : 'add_location'}}</mat-icon>
            {{isEditMode ? 'Edit Venue' : 'Add New Venue'}}
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #venueForm="ngForm">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Venue Name</mat-label>
                <input matInput [(ngModel)]="venue.name" name="name" required>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>City</mat-label>
                <mat-select [(ngModel)]="venue.city" name="city" required>
                  <mat-option value="Chennai">Chennai</mat-option>
                  <mat-option value="Mumbai">Mumbai</mat-option>
                  <mat-option value="Bangalore">Bangalore</mat-option>
                  <mat-option value="Delhi">Delhi</mat-option>
                  <mat-option value="Hyderabad">Hyderabad</mat-option>
                  <mat-option value="Pune">Pune</mat-option>
                  <mat-option value="Kolkata">Kolkata</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Venue Type</mat-label>
                <mat-select [(ngModel)]="venue.type" name="type" required>
                  <mat-option value="Cinema">Cinema</mat-option>
                  <mat-option value="Concert Hall">Concert Hall</mat-option>
                  <mat-option value="Stadium">Stadium</mat-option>
                  <mat-option value="Theatre">Theatre</mat-option>
                  <mat-option value="Arena">Arena</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address</mat-label>
                <textarea matInput [(ngModel)]="venue.address" name="address" rows="2" required></textarea>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Seating Capacity</mat-label>
                <input matInput type="number" [(ngModel)]="venue.totalSeats" name="totalSeats" required>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!venueForm.valid">
                {{isEditMode ? 'Update Venue' : 'Add Venue'}}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .add-venue-container {
      padding: 80px 20px 20px 20px;
      max-width: 1000px;
      margin: 0 auto;
      min-height: 100vh;
    }
    
    .add-venue-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(248, 68, 100, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(248, 68, 100, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .add-venue-card {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #f84464;
      color: #333333;
      box-shadow: none;
      border-radius: 8px;
    }
    
    mat-card-header {
      padding: 24px;
    }
    
    mat-card-header .mat-mdc-card-title {
      color: #f84464;
      font-weight: 600;
      text-align: center;
      margin: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    
    mat-card-title mat-icon {
      color: #f84464;
      font-size: 2rem;
    }
    
    mat-card-content {
      padding: 32px 40px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .half-width {
      width: 50%;
    }
    
    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: #333333;
      --mdc-outlined-text-field-input-text-color: #333333;
      --mdc-outlined-text-field-outline-color: #cccccc;
      --mdc-outlined-text-field-hover-outline-color: #666666;
      --mdc-outlined-text-field-focused-outline-color: #f84464;
      --mdc-outlined-text-field-focused-label-text-color: #f84464;
      --mdc-outlined-text-field-hover-label-text-color: #333333;
      background: transparent;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    
    ::ng-deep .mat-mdc-text-field-wrapper {
      background: transparent !important;
      border-radius: 12px;
    }
    
    ::ng-deep .mat-mdc-form-field-input-control input,
    ::ng-deep .mat-mdc-form-field-input-control textarea {
      color: #333333 !important;
      font-size: 16px;
      padding: 16px !important;
      font-weight: 400;
    }
    
    ::ng-deep .mat-mdc-select-value {
      color: #333333 !important;
    }
    
    ::ng-deep .mat-mdc-select-value-text {
      color: #333333 !important;
    }
    
    ::ng-deep .mat-mdc-select-arrow {
      color: #333333 !important;
    }
    
    ::ng-deep .mat-mdc-option {
      color: #333333 !important;
      background-color: #ffffff !important;
    }
    
    ::ng-deep .mat-mdc-option:hover {
      background-color: #f5f5f5 !important;
      color: #000000 !important;
    }
    
    ::ng-deep .mat-mdc-option.mdc-list-item--selected {
      background-color: #f84464 !important;
      color: #ffffff !important;
    }
    
    ::ng-deep .mat-mdc-select-panel {
      background: #ffffff !important;
      border: 1px solid #e0e0e0 !important;
      border-radius: 8px !important;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #333;
    }
    
    button[mat-raised-button] {
      background: #f84464 !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 4px !important;
      padding: 12px 24px !important;
      font-weight: 500 !important;
      font-size: 14px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      transition: all 0.2s ease !important;
      height: 48px !important;
      min-width: 120px !important;
    }
    
    button[mat-raised-button]:hover {
      background: #e63946 !important;
      box-shadow: 0 2px 8px rgba(248, 68, 100, 0.3) !important;
    }
    
    button[mat-raised-button]:disabled {
      background: #666666 !important;
      color: #999999 !important;
    }
    
    button[mat-button] {
      color: #666666 !important;
      border-radius: 8px !important;
      font-weight: 500 !important;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }
      .half-width {
        width: 100%;
      }
      .add-venue-card {
        max-width: 100%;
        margin: 10px;
        border-radius: 16px;
      }
      mat-card-content {
        padding: 24px;
      }
    }
  `]
})
export class AddVenueComponent {
  venue: Partial<Venue> = {
    name: '',
    city: '',
    address: '',
    totalSeats: 0,
    type: ''
  };
  isEditMode = false;

  constructor(private router: Router, private venueService: VenueService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['venue']) {
      this.venue = navigation.extras.state['venue'];
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.venue.id) {
      this.venueService.updateVenue(this.venue.id, this.venue as Venue).subscribe({
        next: (updatedVenue) => {
          console.log('Venue updated:', updatedVenue);
          alert(`Venue "${this.venue.name}" updated successfully!`);
          this.router.navigate(['/admin/manage-venues']);
        },
        error: (error) => {
          console.error('Error updating venue:', error);
          alert('Error updating venue. Please try again.');
        }
      });
    } else {
      this.venueService.addVenue(this.venue as Venue).subscribe({
        next: (createdVenue) => {
          console.log('Venue created:', createdVenue);
          alert(`Venue "${this.venue.name}" added successfully!`);
          this.router.navigate(['/admin/manage-venues']);
        },
        error: (error) => {
          console.error('Error creating venue:', error);
          alert('Error creating venue. Please try again.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/manage-venues']);
  }
}