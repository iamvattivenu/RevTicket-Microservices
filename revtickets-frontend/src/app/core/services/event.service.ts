import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, Show } from '../models/event.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events/category/${category}`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`);
  }

  searchEvents(query: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events/search?q=${query}`);
  }

  getShowsForEvent(eventId: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/shows/event/${eventId}`);
  }

  createEvent(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/admin/events`, event);
  }

  updateEvent(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/admin/events/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/events/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`);
  }

  blockUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/users/${id}/block`, {});
  }

  unblockUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/users/${id}/unblock`, {});
  }
}