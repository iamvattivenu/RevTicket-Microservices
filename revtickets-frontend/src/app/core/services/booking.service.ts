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
    return this.http.post<Booking>(`${this.apiUrl}/api/bookings`, bookingData);
  }

  getUserBookings(): Observable<Booking[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id || user.userId;
    console.log('User from localStorage:', user);
    console.log('Using userId:', userId);
    return this.http.get<Booking[]>(`${this.apiUrl}/api/bookings/user/${userId}`);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/api/bookings/${id}`);
  }

  cancelBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/bookings/${id}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/api/bookings`);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/bookings/${id}`);
  }
}