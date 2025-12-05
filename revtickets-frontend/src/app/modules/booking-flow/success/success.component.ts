import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="success-container">
      <mat-card class="success-card">
        <mat-card-content>
          <div class="success-icon">
            <mat-icon>check_circle</mat-icon>
          </div>
          <h2>Booking Successful!</h2>
          <p>Your tickets have been booked successfully.</p>
          <p><strong>Transaction ID:</strong> {{transactionId}}</p>
          <p>You will receive a confirmation email shortly.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goToBookings()">
            View My Bookings
          </button>
          <button mat-button (click)="goHome()">
            Back to Home
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .success-container { 
      padding: 20px; 
      background: var(--primary-bg); 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
    .success-card { 
      background: var(--card-bg); 
      color: var(--text-primary); 
      max-width: 500px; 
      text-align: center;
      border: 2px solid var(--success-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
    }
    .success-icon mat-icon { 
      font-size: 4rem; 
      color: var(--success-color); 
      width: 4rem; 
      height: 4rem; 
    }
    h2 { 
      color: var(--success-color); 
      margin: 20px 0;
      font-weight: 700;
    }
    p {
      color: var(--text-secondary);
      margin: 12px 0;
    }
    p strong {
      color: var(--text-primary);
    }
  `]
})
export class SuccessComponent implements OnInit {
  transactionId = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.transactionId = sessionStorage.getItem('transactionId') || 'N/A';
  }

  goToBookings(): void {
    this.router.navigate(['/user/bookings']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}