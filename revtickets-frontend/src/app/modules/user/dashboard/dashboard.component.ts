import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService } from '../../../core/services/booking.service';
import { User } from '../../../core/models/user.model';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Welcome back, {{currentUser?.name}}!</h1>
        <p>Manage your bookings and profile</p>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>confirmation_number</mat-icon>
              <div>
                <h3>{{totalBookings}}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>event_available</mat-icon>
              <div>
                <h3>{{activeBookings}}</h3>
                <p>Active Bookings</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <mat-card class="action-card" routerLink="/user/bookings">
            <mat-card-content>
              <mat-icon>list</mat-icon>
              <h3>View Bookings</h3>
              <p>See all your ticket bookings</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" routerLink="/user/profile">
            <mat-card-content>
              <mat-icon>person</mat-icon>
              <h3>Edit Profile</h3>
              <p>Update your personal information</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" routerLink="/">
            <mat-card-content>
              <mat-icon>search</mat-icon>
              <h3>Browse Events</h3>
              <p>Find new events to book</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="recent-bookings" *ngIf="recentBookings.length > 0">
        <h2>Recent Bookings</h2>
        <div class="bookings-list">
          <mat-card *ngFor="let booking of recentBookings" class="booking-card">
            <mat-card-content>
              <div class="booking-info">
                <h4>Booking #{{booking.id}}</h4>
                <p>{{booking.bookingDate | date:'medium'}}</p>
                <p>Amount: ₹{{booking.totalAmount}}</p>
                <span class="status" [class]="booking.status">{{booking.status}}</span>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button routerLink="/user/bookings">View Details</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
    }
    .welcome-section {
      margin-bottom: 32px;
      padding: 24px;
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    .welcome-section h1 {
      color: var(--text-primary);
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .welcome-section p {
      color: var(--text-secondary);
      margin: 0;
      font-size: 14px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-md);
    }
    .stat-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .stat-card .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }
    .stat-card mat-icon {
      font-size: 2rem;
      color: var(--primary-color);
    }
    .stat-card h3 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-primary);
      font-weight: 700;
    }
    .stat-card p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .action-card {
      cursor: pointer;
      transition: all var(--transition-normal);
      text-align: center;
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      padding: 24px;
      box-shadow: var(--shadow-md);
    }
    .action-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .action-card mat-icon {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 12px;
    }
    .action-card h3 {
      color: var(--text-primary);
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    .action-card p {
      color: var(--text-secondary);
      font-size: 14px;
      margin: 0;
    }
    .bookings-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }
    .booking-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-md);
    }
    .booking-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .booking-card .booking-info h4 {
      margin: 0 0 8px 0;
      color: var(--text-primary);
      font-size: 16px;
      font-weight: 600;
    }
    .booking-card .booking-info p {
      color: var(--text-secondary);
      font-size: 14px;
      margin: 4px 0;
    }
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .status.confirmed {
      background: #4caf50;
      color: white;
    }
    .status.cancelled {
      background: #f44336;
      color: white;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  recentBookings: Booking[] = [];
  totalBookings = 0;
  activeBookings = 0;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.loadBookings();
  }

  private loadBookings(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.recentBookings = bookings.slice(0, 3);
        this.totalBookings = bookings.length;
        this.activeBookings = bookings.filter(b => b.status === 'confirmed').length;
      },
      error: (error) => console.error('Error loading bookings:', error)
    });
  }
}