import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
  template: `
    <div class="bookings-container">
      <h1>My Bookings</h1>
      
      <mat-tab-group>
        <mat-tab label="All Bookings">
          <div class="bookings-grid">
            <mat-card *ngFor="let booking of allBookings" class="booking-card">
              <mat-card-header>
                <mat-card-title>{{booking.show?.event?.title || 'Event'}}</mat-card-title>
                <mat-card-subtitle>Booking #{{booking.id}} | {{booking.bookingDate | date:'medium'}}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="booking-details">
                  <p><strong>Seats:</strong> {{booking.seatNumbers}}</p>
                  <p><strong>Amount:</strong> ₹{{booking.totalAmount}}</p>
                  <p><strong>Status:</strong> 
                    <span class="status" [class]="booking.status">{{booking.status}}</span>
                  </p>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button (click)="viewTicket(booking)" style="color: #666666;">
                  <mat-icon>qr_code</mat-icon>
                  View Ticket
                </button>
                <button mat-button color="warn" 
                        *ngIf="booking.status === 'CONFIRMED' || booking.status === 'confirmed'"
                        (click)="cancelBooking(booking.id.toString())">
                  Cancel
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
        
        <mat-tab label="Active Bookings">
          <div class="bookings-grid">
            <mat-card *ngFor="let booking of activeBookings" class="booking-card">
              <mat-card-header>
                <mat-card-title>{{booking.show?.event?.title || 'Event'}}</mat-card-title>
                <mat-card-subtitle>Booking #{{booking.id}} | {{booking.bookingDate | date:'medium'}}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="booking-details">
                  <p><strong>Seats:</strong> {{booking.seatNumbers}}</p>
                  <p><strong>Amount:</strong> ₹{{booking.totalAmount}}</p>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="viewTicket(booking)" style="color: white;">
                  <mat-icon>qr_code</mat-icon>
                  View Ticket
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>

      <div *ngIf="allBookings.length === 0" class="no-bookings">
        <mat-icon>confirmation_number</mat-icon>
        <h2>No bookings yet</h2>
        <p>Start booking your favorite events!</p>
        <button mat-raised-button color="primary" (click)="browseEvents()">Browse Events</button>
      </div>
    </div>
  `,
  styles: [`
    .bookings-container {
      padding: 32px 20px;
      max-width: 1400px;
      margin: 0 auto;
      min-height: 100vh;
    }
    
    .bookings-container h1 {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
      margin-bottom: 32px;
    }
    .bookings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
      margin-top: 28px;
    }
    
    .booking-card {
      background: white;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }
    
    .booking-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary-gradient);
      transform: scaleX(0);
      transition: transform var(--transition-normal);
    }
    
    .booking-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    
    .booking-card:hover::before {
      transform: scaleX(1);
    }
    .booking-card mat-card-title {
      color: var(--text-primary);
      font-size: 17px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    
    .booking-card mat-card-subtitle {
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 500;
      margin-top: 6px;
    }
    
    .booking-details p {
      margin: 10px 0;
      color: var(--text-secondary);
      font-size: 14px;
    }
    
    .booking-details strong {
      color: var(--text-primary);
      font-weight: 600;
    }
    .status {
      display: inline-block;
      padding: 6px 14px;
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    
    .status.confirmed,
    .status.CONFIRMED {
      background: var(--accent-gradient);
      color: white;
      box-shadow: var(--shadow-sm);
    }
    
    .status.cancelled,
    .status.CANCELLED {
      background: linear-gradient(135deg, #ff5252, #f44336);
      color: white;
      box-shadow: var(--shadow-sm);
    }
    .no-bookings {
      text-align: center;
      padding: 80px 40px;
      background: white;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    
    .no-bookings mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: var(--text-muted);
      margin-bottom: 24px;
    }
    
    .no-bookings h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 12px;
    }
    
    .no-bookings p {
      color: var(--text-secondary);
      margin-bottom: 28px;
      font-size: 15px;
    }
    
    @media (max-width: 768px) {
      .bookings-container {
        padding: 24px 16px;
      }
      
      .bookings-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
    ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      color: var(--text-primary) !important;
    }
    ::ng-deep .mat-mdc-tab-indicator .mdc-tab-indicator__content--underline {
      border-color: var(--primary-color) !important;
    }
  `]
})
export class BookingsComponent implements OnInit {
  allBookings: Booking[] = [];
  activeBookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.allBookings = bookings;
        this.activeBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'confirmed');
      },
      error: (error) => console.error('Error loading bookings:', error)
    });
  }

  viewTicket(booking: Booking): void {
    this.router.navigate(['/user/ticket', booking.id]);
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          alert('Ticket cancelled successfully!');
          this.loadBookings();
        },
        error: (error) => {
          console.error('Error cancelling booking:', error);
          alert('Error cancelling booking. Please try again.');
        }
      });
    }
  }

  browseEvents(): void {
    this.router.navigate(['/']);
  }
}