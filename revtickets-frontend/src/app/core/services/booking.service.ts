import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingRequest } from '../models/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(bookingData: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, bookingData);
  }

  getUserBookings(): Observable<Booking[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings/user/${user.id}`);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${id}`);
  }

  cancelBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${id}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${id}`);
  }
}