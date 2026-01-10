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
    return this.http.get<Event[]>(`${this.apiUrl}/api/events`);
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/api/events/category/${category}`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/api/events/${id}`);
  }

  searchEvents(query: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/api/events/search?q=${query}`);
  }

  getShowsForEvent(eventId: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/api/shows/event/${eventId}`);
  }

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/api/shows`);
  }

  createEvent(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/api/admin/events`, event);
  }

  updateEvent(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/api/admin/events/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/admin/events/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/admin/users`);
  }

  blockUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/admin/users/${id}/block`, {});
  }

  unblockUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/admin/users/${id}/unblock`, {});
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/users/${id}`, user);
  }
}