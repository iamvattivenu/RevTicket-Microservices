import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/show.model';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private apiUrl = 'http://localhost:8080/api/shows';

  constructor(private http: HttpClient) {}

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrl);
  }

  getShowsByEventId(eventId: string): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/event/${eventId}`);
  }

  createShow(show: any): Observable<Show> {
    return this.http.post<Show>(this.apiUrl, show);
  }

  deleteShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
