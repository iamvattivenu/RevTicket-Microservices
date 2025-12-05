import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Venue {
  id: number;
  name: string;
  city: string;
  address: string;
  totalSeats: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/venues`);
  }

  addVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(`${this.apiUrl}/admin/venues`, venue);
  }

  updateVenue(id: number, updatedVenue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/venues/${id}`, updatedVenue);
  }

  deleteVenue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/venues/${id}`);
  }
}