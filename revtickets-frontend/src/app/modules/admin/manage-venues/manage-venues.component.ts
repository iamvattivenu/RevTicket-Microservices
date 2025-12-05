import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VenueService, Venue } from '../../../core/services/venue.service';

@Component({
  selector: 'app-manage-venues',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, MatCardModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  template: `
    <div class="venues-container">
      <div class="header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Manage Venues</h1>
      </div>

      <div class="venues-grid">
        <mat-card class="venue-card" *ngFor="let venue of venues">
          <mat-card-header>
            <mat-card-title>{{venue.name}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p><strong>City:</strong> {{venue.city}}</p>
            <p><strong>Address:</strong> {{venue.address}}</p>
            <p><strong>Capacity:</strong> {{venue.totalSeats}} seats</p>
            <p><strong>Type:</strong> {{venue.type}}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="editVenue(venue)">Edit</button>
            <button mat-button color="warn" (click)="deleteVenue(venue.id)">Delete</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="add-venue-card" (click)="addVenue()">
          <mat-card-content>
            <mat-icon>add_circle</mat-icon>
            <h3>Add New Venue</h3>
            <p>Create a new venue location</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .venues-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    .header h1 {
      color: #333333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }
    .header button {
      color: #333333;
    }
    .venues-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .venue-card {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .venue-card mat-card-title {
      color: #333333;
      font-weight: 600;
    }
    .venue-card mat-card-content p {
      color: #666666;
      margin: 8px 0;
    }
    .add-venue-card {
      background: #ffffff;
      border: 2px dashed #f84464;
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
    }
    .add-venue-card:hover {
      border-color: #ff6b8a;
      background: #f5f5f5;
    }
    .add-venue-card mat-icon {
      font-size: 3rem;
      color: #f84464;
      margin-bottom: 12px;
    }
    .add-venue-card h3 {
      color: #333333;
      margin: 0 0 8px 0;
    }
    .add-venue-card p {
      color: #666666;
      margin: 0;
    }
  `]
})
export class ManageVenuesComponent implements OnInit {
  venues: Venue[] = [];

  constructor(private router: Router, private venueService: VenueService) {}

  ngOnInit(): void {
    this.loadVenues();
  }

  private loadVenues(): void {
    this.venueService.getAllVenues().subscribe({
      next: (venues) => this.venues = venues,
      error: (error) => console.error('Error loading venues:', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  addVenue(): void {
    this.router.navigate(['/admin/add-venue']);
  }

  editVenue(venue: Venue): void {
    this.router.navigate(['/admin/add-venue'], { state: { venue } });
  }

  deleteVenue(venueId: number): void {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(venueId).subscribe({
        next: () => {
          this.loadVenues();
          alert('Venue deleted successfully!');
        },
        error: (error) => console.error('Error deleting venue:', error)
      });
    }
  }
}