import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatRadioModule, FormsModule],
  template: `
    <div class="payment-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Payment</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="payment-methods">
            <mat-radio-group [(ngModel)]="selectedMethod">
              <mat-radio-button value="card">Credit/Debit Card</mat-radio-button>
              <mat-radio-button value="upi">UPI</mat-radio-button>
              <mat-radio-button value="netbanking">Net Banking</mat-radio-button>
            </mat-radio-group>
          </div>
          <div class="amount">
            <h3>Total: ₹{{amount}}</h3>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="processPayment()">
            Pay Now
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .payment-container { 
      padding: 20px; 
      background: var(--primary-bg); 
      min-height: 100vh; 
    }
    mat-card { 
      background: var(--card-bg); 
      color: var(--text-primary); 
      max-width: 500px; 
      margin: 0 auto;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
    }
    .payment-methods { 
      margin: 20px 0; 
    }
    mat-radio-button { 
      display: block; 
      margin: 10px 0;
      color: var(--text-primary);
    }
    .amount { 
      text-align: center; 
      margin: 20px 0; 
    }
    .amount h3 {
      color: var(--text-primary);
      font-weight: 700;
    }
    ::ng-deep .mat-mdc-card-title {
      color: var(--primary-color) !important;
      font-weight: 700;
    }
  `]
})
export class PaymentComponent implements OnInit {
  selectedMethod = 'card';
  amount = 0;

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.amount = parseInt(sessionStorage.getItem('totalAmount') || '0');
  }

  processPayment(): void {
    this.paymentService.processPayment({
      amount: this.amount,
      bookingId: 'BOOK' + Date.now(),
      paymentMethod: this.selectedMethod
    }).subscribe({
      next: (response) => {
        if (response.success) {
          sessionStorage.setItem('transactionId', response.transactionId);
          this.router.navigate(['/booking/success']);
        }
      }
    });
  }
}