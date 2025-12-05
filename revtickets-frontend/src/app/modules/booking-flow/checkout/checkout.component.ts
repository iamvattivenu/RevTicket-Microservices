import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeatService } from '../../../core/services/seat.service';
import { BookingService } from '../../../core/services/booking.service';
import { Seat } from '../../../core/models/seat.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, 
    MatSnackBarModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, ReactiveFormsModule
  ],
  template: `
    <div class="checkout-container">
      <div class="checkout-header">
        <h1>Checkout Process</h1>
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
      </div>

      <div class="checkout-content">
        <div class="booking-details">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Booking Summary</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="selected-seats">
                <h4>Selected Seats ({{selectedSeats.length}})</h4>
                <div class="seat-list">
                  <span *ngFor="let seat of selectedSeats" class="seat-tag">
                    {{seat.seatNumber}} ({{seat.seatType}})
                  </span>
                </div>
              </div>
              <div class="price-breakdown">
                <div class="price-item" *ngFor="let category of getPriceBreakdown()">
                  <span>{{category.name}} ({{category.count}} × ₹{{category.price}})</span>
                  <span>₹{{category.total}}</span>
                </div>
                <div class="total-price">
                  <strong>Total: ₹{{getTotalPrice()}}</strong>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="payment-form">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Payment Details</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="paymentForm" (ngSubmit)="processPayment()">
                <mat-form-field appearance="outline">
                  <mat-label>Payment Method</mat-label>
                  <mat-select formControlName="paymentMethod" (selectionChange)="onPaymentMethodChange($event.value)">
                    <mat-option value="credit">Credit Card</mat-option>
                    <mat-option value="debit">Debit Card</mat-option>
                    <mat-option value="upi">UPI</mat-option>
                    <mat-option value="netbanking">Net Banking</mat-option>
                  </mat-select>
                </mat-form-field>

                <div class="payment-details-section">
                  <div *ngIf="isCardPayment()">
                    <mat-form-field appearance="outline">
                      <mat-label>Cardholder Name</mat-label>
                      <input matInput formControlName="cardholderName" placeholder="Enter cardholder name">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Card Number</mat-label>
                      <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456">
                    </mat-form-field>

                    <div class="card-details">
                      <mat-form-field appearance="outline">
                        <mat-label>Expiry Date</mat-label>
                        <input matInput formControlName="expiryDate" placeholder="MM/YY">
                      </mat-form-field>

                      <mat-form-field appearance="outline">
                        <mat-label>CVV</mat-label>
                        <input matInput formControlName="cvv" placeholder="123">
                      </mat-form-field>
                    </div>
                  </div>

                  <div *ngIf="paymentForm.get('paymentMethod')?.value === 'upi'">
                    <mat-form-field appearance="outline">
                      <mat-label>UPI ID</mat-label>
                      <input matInput formControlName="upiId" placeholder="yourname@paytm">
                    </mat-form-field>
                  </div>

                  <div *ngIf="paymentForm.get('paymentMethod')?.value === 'netbanking'">
                    <mat-form-field appearance="outline">
                      <mat-label>Select Bank</mat-label>
                      <mat-select formControlName="bankName">
                        <mat-option value="sbi">State Bank of India</mat-option>
                        <mat-option value="hdfc">HDFC Bank</mat-option>
                        <mat-option value="icici">ICICI Bank</mat-option>
                        <mat-option value="axis">Axis Bank</mat-option>
                        <mat-option value="kotak">Kotak Mahindra Bank</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                </div>
              </form>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" 
                      [disabled]="paymentForm.invalid || isProcessing"
                      (click)="processPayment()">
                {{isProcessing ? 'Processing...' : 'Pay ₹' + getTotalPrice()}}
              </button>
              <button mat-button class="cancel-btn" (click)="goBack()">Cancel</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
    }
    .checkout-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .checkout-header h1 {
      color: var(--text-primary);
      font-size: 2rem;
      margin: 0;
      font-weight: 700;
    }
    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .mat-mdc-card {
      background: var(--card-bg);
      border: 2px solid var(--primary-color);
      color: var(--text-primary);
      box-shadow: var(--shadow-xl), var(--shadow-glow);
      border-radius: var(--radius-lg);
    }
    .mat-mdc-card-header .mat-mdc-card-title {
      color: var(--primary-color);
      font-weight: 700;
    }
    .mat-mdc-card-content h4 {
      color: var(--text-primary);
      margin-bottom: 12px;
      font-weight: 600;
    }
    .seat-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 10px 0;
    }
    .seat-tag {
      background: var(--primary-gradient);
      color: white;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }
    .price-breakdown {
      margin-top: 15px;
    }
    .price-item {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }
    .total-price {
      border-top: 2px solid var(--primary-color);
      padding-top: 12px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      color: var(--text-primary);
      font-weight: 700;
    }
    .price-item {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      color: var(--text-secondary);
    }
    .payment-form form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .payment-form .mat-mdc-form-field {
      width: 100%;
    }
    .payment-form .mat-mdc-card-content {
      padding-top: 24px;
    }
    .payment-form .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: var(--text-secondary);
      --mdc-outlined-text-field-input-text-color: var(--text-primary);
      --mdc-outlined-text-field-outline-color: var(--border-color);
      --mdc-outlined-text-field-hover-outline-color: var(--border-hover);
      --mdc-outlined-text-field-focused-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-label-text-color: var(--primary-color);
      --mdc-outlined-text-field-hover-label-text-color: var(--text-primary);
      --mdc-filled-text-field-caret-color: var(--primary-color);
      --mat-select-panel-background-color: var(--card-bg);
      --mat-option-label-text-color: var(--text-primary);
      --mat-option-hover-state-layer-color: var(--card-hover);
      --mat-option-focus-state-layer-color: var(--card-hover);
      --mat-select-arrow-color: var(--text-primary);
    }
    .payment-form .mat-mdc-form-field .mat-mdc-input-element::placeholder {
      color: var(--text-muted);
    }
    .payment-form ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: var(--card-bg);
    }
    .payment-form ::ng-deep .mat-mdc-form-field-focus-overlay {
      background-color: var(--card-hover);
    }
    .payment-form ::ng-deep .mat-mdc-text-field-wrapper:hover {
      background-color: var(--card-hover);
    }
    .payment-form ::ng-deep .mat-mdc-select-arrow {
      color: var(--text-primary) !important;
    }
    .payment-form ::ng-deep .mat-mdc-select-arrow svg {
      fill: var(--text-primary) !important;
    }
    .payment-form .mat-mdc-select-value {
      color: var(--text-primary);
    }
    .cancel-btn {
      color: var(--text-secondary) !important;
    }
    .cancel-btn:hover {
      background-color: var(--card-hover) !important;
      color: var(--text-primary) !important;
    }
    .card-details {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
    }
    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }
      .card-details {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  selectedSeats: Seat[] = [];
  paymentForm: FormGroup;
  isProcessing = false;
  showId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private seatService: SeatService,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      cardholderName: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      upiId: [''],
      bankName: [''],
      paymentMethod: ['credit', Validators.required]
    });
    this.updateValidators();
  }

  ngOnInit(): void {
    this.showId = this.route.snapshot.queryParams['showId'] || '';
    
    // Get selected seats from sessionStorage
    const storedSeats = sessionStorage.getItem('selectedSeats');
    if (storedSeats) {
      this.selectedSeats = JSON.parse(storedSeats);
    }
    
    if (this.selectedSeats.length === 0) {
      this.snackBar.open('No seats selected', 'Close', { duration: 3000 });
      this.router.navigate(['/booking/seats', this.showId]);
    }
  }

  getPriceBreakdown(): any[] {
    const breakdown: { [key: string]: { count: number; price: number } } = {};
    
    this.selectedSeats.forEach(seat => {
      const category = seat.seatType || 'Regular';
      const price = seat.price || 100;
      if (!breakdown[category]) {
        breakdown[category] = { count: 0, price: price };
      }
      breakdown[category].count++;
    });

    return Object.entries(breakdown).map(([name, data]) => ({
      name,
      count: data.count,
      price: data.price,
      total: data.count * data.price
    }));
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + (seat.price || 100), 0);
  }

  onPaymentMethodChange(method: string): void {
    this.updateValidators();
  }

  isCardPayment(): boolean {
    const method = this.paymentForm.get('paymentMethod')?.value;
    return method === 'credit' || method === 'debit';
  }

  updateValidators(): void {
    const method = this.paymentForm.get('paymentMethod')?.value;
    
    // Clear all validators first
    Object.keys(this.paymentForm.controls).forEach(key => {
      if (key !== 'paymentMethod') {
        this.paymentForm.get(key)?.clearValidators();
        this.paymentForm.get(key)?.updateValueAndValidity();
      }
    });

    // Add validators based on payment method
    if (method === 'credit' || method === 'debit') {
      this.paymentForm.get('cardholderName')?.setValidators([Validators.required]);
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.paymentForm.get('expiryDate')?.setValidators([Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    } else if (method === 'upi') {
      this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]);
    } else if (method === 'netbanking') {
      this.paymentForm.get('bankName')?.setValidators([Validators.required]);
    }

    // Update validity
    Object.keys(this.paymentForm.controls).forEach(key => {
      this.paymentForm.get(key)?.updateValueAndValidity();
    });
  }

  processPayment(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    this.isProcessing = true;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const paymentMethod = this.paymentForm.get('paymentMethod')?.value;
    const methodMap: any = {
      'credit': 'CREDIT_CARD',
      'debit': 'DEBIT_CARD',
      'upi': 'UPI',
      'netbanking': 'NET_BANKING'
    };
    const bookingData = {
      userId: user.id,
      showId: Number(this.showId),
      seatNumbers: this.selectedSeats.map(seat => seat.seatNumber),
      paymentMethod: methodMap[paymentMethod] || 'UPI'
    };

    // Simulate payment processing delay
    setTimeout(() => {
      this.bookingService.createBooking(bookingData).subscribe({
        next: (booking) => {
          this.isProcessing = false;
          this.seatService.clearSelection();
          sessionStorage.setItem('bookingData', JSON.stringify({
            booking: booking,
            selectedSeats: this.selectedSeats,
            totalAmount: this.getTotalPrice()
          }));
          sessionStorage.removeItem('selectedSeats');
          this.router.navigate(['/user/ticket']);
        },
        error: (error) => {
          this.isProcessing = false;
          console.error('Error creating booking:', error);
          this.snackBar.open('Payment failed. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(['/booking/seats', this.showId]);
  }
}