import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="ticket-container" *ngIf="booking">
      <div class="ticket-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Digital Ticket</h1>
      </div>

      <div class="ticket-card">
        <div class="ticket-top">
          <div class="event-info">
            <h2>{{booking.show?.event?.title || 'Event Ticket'}}</h2>
            <p class="booking-id">Booking ID: {{booking.id}}</p>
          </div>
          <div class="qr-section">
            <div class="qr-code">
              <mat-icon>qr_code_2</mat-icon>
              <p>{{booking.qrCode}}</p>
            </div>
          </div>
        </div>

        <div class="ticket-divider">
          <div class="perforation"></div>
        </div>

        <div class="ticket-bottom">
          <div class="ticket-details">
            <div class="detail-row" *ngIf="booking.show?.showTime">
              <span class="label">Show Time:</span>
              <span class="value">{{booking.show.showTime | date:'medium'}}</span>
            </div>
            <div class="detail-row" *ngIf="booking.show?.venue?.name">
              <span class="label">Venue:</span>
              <span class="value">{{booking.show.venue.name}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Seats:</span>
              <span class="value">{{booking.seatNumbers}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Amount Paid:</span>
              <span class="value">₹{{booking.totalAmount}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Booking Date:</span>
              <span class="value">{{booking.bookingDate | date:'medium'}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value status" [class]="booking.status">{{booking.status}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Payment ID:</span>
              <span class="value">{{booking.paymentId}}</span>
            </div>
          </div>
        </div>

        <div class="ticket-footer">
          <p class="terms">Please present this ticket at the venue entrance</p>
          <p class="terms">Valid only for the booked seats and show time</p>
        </div>
      </div>

      <div class="ticket-actions">
        <button mat-raised-button color="primary" (click)="downloadTicket()">
          <mat-icon>download</mat-icon>
          Download Ticket
        </button>
        <button mat-button (click)="shareTicket()">
          <mat-icon>share</mat-icon>
          Share
        </button>
      </div>
    </div>

    <div *ngIf="!booking" class="loading">
      <p>Loading ticket...</p>
    </div>
  `,
  styles: [`
    .ticket-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
    }
    .ticket-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 30px;
    }
    .ticket-header h1 {
      color: var(--text-primary);
      font-size: 1.8rem;
      margin: 0;
      font-weight: 700;
    }
    .ticket-card {
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      margin-bottom: 30px;
    }
    .ticket-top {
      background: var(--primary-gradient);
      color: white;
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .event-info h2 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .booking-id {
      margin: 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .qr-section {
      text-align: center;
    }
    .qr-code {
      background: white;
      color: #333;
      padding: 16px;
      border-radius: 8px;
      min-width: 100px;
    }
    .qr-code mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    .qr-code p {
      margin: 8px 0 0 0;
      font-size: 10px;
      font-weight: 600;
    }
    .ticket-divider {
      height: 2px;
      background: #f0f0f0;
      position: relative;
    }
    .perforation {
      height: 100%;
      background: repeating-linear-gradient(
        to right,
        #ddd 0px,
        #ddd 8px,
        transparent 8px,
        transparent 16px
      );
    }
    .ticket-bottom {
      padding: 24px;
      background: #fafafa;
      color: #333;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }
    .detail-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .label {
      font-weight: 600;
      color: #666;
    }
    .value {
      font-weight: 500;
      color: #333;
    }
    .status.confirmed {
      background: #4caf50;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .status.cancelled {
      background: #f44336;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .ticket-footer {
      background: #f0f0f0;
      padding: 16px 24px;
      text-align: center;
    }
    .terms {
      margin: 4px 0;
      font-size: 12px;
      color: #666;
    }
    .ticket-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
    .loading {
      text-align: center;
      padding: 60px;
      color: var(--text-secondary);
    }
    @media (max-width: 768px) {
      .ticket-container {
        padding: 10px;
      }
      .ticket-top {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class TicketComponent implements OnInit {
  booking: Booking | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get booking data from sessionStorage (from checkout)
    const bookingData = sessionStorage.getItem('bookingData');
    if (bookingData) {
      const data = JSON.parse(bookingData);
      this.booking = {
        id: Date.now(),
        numberOfSeats: data.selectedSeats.length,
        seatNumbers: data.selectedSeats.map((seat: any) => `${seat.row}${seat.number}`).join(','),
        totalAmount: data.totalAmount,
        bookingDate: new Date(),
        status: 'confirmed',
        paymentId: 'PAY' + Date.now(),
        qrCode: 'QR' + Date.now().toString().slice(-6)
      };
      
      // Show success notification and start 11-second countdown
      this.snackBar.open('Payment successful! Redirecting to home page in 11 seconds...', 'Close', { duration: 11000 });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 11000);
      
      sessionStorage.removeItem('bookingData');
    } else {
      // Fallback to route param if no session data
      const bookingId = this.route.snapshot.params['id'];
      if (bookingId) {
        this.loadBooking(bookingId);
      } else {
        this.router.navigate(['/user/bookings']);
      }
    }
  }

  private loadBooking(bookingId: string): void {
    this.bookingService.getBookingById(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
      },
      error: (error) => {
        console.error('Error loading booking:', error);
        this.router.navigate(['/user/bookings']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/user/bookings']);
  }

  downloadTicket(): void {
    if (!this.booking) return;
    
    // Create ticket content as HTML
    const movieName = this.booking.show?.event?.title || 'Event';
    const showTime = this.booking.show?.showTime ? new Date(this.booking.show.showTime).toLocaleString() : 'N/A';
    const venueName = this.booking.show?.venue?.name || 'N/A';
    const ticketContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; border: 2px solid #333; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #f84464, #ff6b8a); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0 0 10px 0;">${movieName}</h2>
          <p style="margin: 0; font-size: 14px;">Booking ID: ${this.booking.id}</p>
        </div>
        <div style="padding: 20px; background: white; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 48px;">🎫</div>
            <p style="margin: 5px 0; font-size: 12px; font-weight: bold;">${this.booking.qrCode}</p>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 15px;">
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Show Time:</strong> <span>${showTime}</span></p>
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Venue:</strong> <span>${venueName}</span></p>
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Seats:</strong> <span>${this.booking.seatNumbers}</span></p>
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Amount:</strong> <span>₹${this.booking.totalAmount}</span></p>
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Date:</strong> <span>${this.booking.bookingDate ? new Date(this.booking.bookingDate).toLocaleDateString() : 'N/A'}</span></p>
            <p style="margin: 8px 0; display: flex; justify-content: space-between;"><strong>Status:</strong> <span style="background: #4caf50; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">${this.booking.status}</span></p>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            <p style="margin: 2px 0;">Present this ticket at venue entrance</p>
            <p style="margin: 2px 0;">Valid only for booked seats</p>
          </div>
        </div>
      </div>
    `;
    
    // Create a new window and print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ticket - ${this.booking.id}</title>
            <style>
              body { margin: 20px; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${ticketContent}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }

  shareTicket(): void {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Event Ticket',
        text: `Booking ID: ${this.booking?.id}`,
        url: window.location.href
      });
    }
  }
}