import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PaymentRequest {
  amount: number;
  bookingId: string;
  paymentMethod: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  processPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payments/process`, paymentData);
  }
}