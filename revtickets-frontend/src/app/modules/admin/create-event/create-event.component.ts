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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Event } from '../../../core/models/event.model';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule
  ],
  template: `
    <div class="create-event-container">
      <mat-card class="create-event-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>{{isEditMode ? 'edit' : 'add_circle'}}</mat-icon>
            {{isEditMode ? 'Edit Event' : 'Create New Event'}}
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #eventForm="ngForm">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Event Title</mat-label>
                <input matInput [(ngModel)]="event.title" name="title" required>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Category</mat-label>
                <mat-select [(ngModel)]="event.category" name="category" required>
                  <mat-option value="movies">Movies</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Language</mat-label>
                <mat-select [(ngModel)]="event.language" name="language" required>
                  <mat-option value="English">English</mat-option>
                  <mat-option value="Hindi">Hindi</mat-option>
                  <mat-option value="Tamil">Tamil</mat-option>
                  <mat-option value="Telugu">Telugu</mat-option>
                  <mat-option value="Kannada">Kannada</mat-option>
                  <mat-option value="Malayalam">Malayalam</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Genre/Type</mat-label>
                <input matInput [(ngModel)]="event.genreOrType" name="genreOrType" required>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput [(ngModel)]="event.description" name="description" rows="3" required></textarea>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Poster Image URL</mat-label>
                <input matInput [(ngModel)]="event.posterUrl" name="posterUrl" placeholder="https://example.com/image.jpg">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>City</mat-label>
                <input matInput [(ngModel)]="event.city" name="city" required>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Venue</mat-label>
                <input matInput [(ngModel)]="event.venue" name="venue" required>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Price (₹)</mat-label>
                <input matInput type="number" [(ngModel)]="event.price" name="price" required>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Duration (minutes)</mat-label>
                <input matInput type="number" [(ngModel)]="event.durationMinutes" name="duration">
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!eventForm.valid">
                {{isEditMode ? 'Update Event' : 'Create Event'}}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .create-event-container {
      padding: 80px 20px 20px 20px;
      max-width: 1000px;
      margin: 0 auto;
      min-height: 100vh;
    }
    
    .create-event-container::before {
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
    
    .create-event-card {
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
      .create-event-card {
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
export class CreateEventComponent {
  event: Event = {
    id: '',
    title: '',
    category: 'movies',
    language: 'English',
    genreOrType: '',
    description: '',
    city: '',
    venue: '',
    dateTime: new Date(),
    durationMinutes: 120,
    posterUrl: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop',
    rating: 4.0,
    price: 0,
    isActive: true
  };
  isEditMode = false;

  constructor(private router: Router, private eventService: EventService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['event']) {
      this.event = navigation.extras.state['event'];
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    const eventRequest: any = {
      title: this.event.title,
      category: this.event.category.toUpperCase(),
      language: this.event.language,
      genreOrType: this.event.genreOrType,
      description: this.event.description,
      city: this.event.city,
      venue: this.event.venue,
      durationMinutes: this.event.durationMinutes,
      posterUrl: this.event.posterUrl,
      rating: this.event.rating,
      price: this.event.price,
      isActive: true
    };
    
    if (this.isEditMode && this.event.id) {
      this.eventService.updateEvent(this.event.id, eventRequest).subscribe({
        next: (updatedEvent) => {
          console.log('Event updated:', updatedEvent);
          alert(`Event "${this.event.title}" updated successfully!`);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error updating event:', error);
          alert('Error updating event. Please try again.');
        }
      });
    } else {
      this.eventService.createEvent(eventRequest).subscribe({
        next: (createdEvent) => {
          console.log('Event created:', createdEvent);
          alert(`Event "${this.event.title}" created successfully! It will now appear in the ${this.event.category} category.`);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error creating event:', error);
          alert('Error creating event. Please try again.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}