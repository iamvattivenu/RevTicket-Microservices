import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { EventService } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';
import { Event, Show } from '../../../core/models/event.model';
import { environment } from '../../../../environments/environment';

interface DayGroup {
  date: Date;
  shows: Show[];
}

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatCardModule, 
    MatButtonModule, MatIconModule, MatSnackBarModule, FormsModule
  ],
  template: `
    <div class="event-details-container" *ngIf="event">

      <div class="event-header">
        <div class="poster-section">
          <img [src]="event.posterUrl" [alt]="event.title" class="event-poster">
        </div>
        
        <div class="details-section">
          <h1>{{event.title}}</h1>
          <div class="event-meta">
            <p><mat-icon>category</mat-icon> {{event.genreOrType}}</p>
            <p><mat-icon>language</mat-icon> {{event.language}}</p>
            <p><mat-icon>location_on</mat-icon> {{event.city}} - {{event.venue}}</p>
            <p *ngIf="event.durationMinutes"><mat-icon>timer</mat-icon> {{formatDuration(event.durationMinutes)}}</p>
            <p><mat-icon>currency_rupee</mat-icon> ₹{{event.price}} onwards</p>
            <div *ngIf="event.rating" class="rating">
              <mat-icon>star</mat-icon> {{event.rating}}/5
            </div>
          </div>
          
          <div class="description">
            <h3>About</h3>
            <p>{{event.description}}</p>
          </div>
        </div>
      </div>

      <div class="shows-section" *ngIf="groupedShows.length > 0">
        <h2>Book Tickets</h2>
        
        <!-- Date Selector -->
        <div class="date-selector">
          <div *ngFor="let dayGroup of groupedShows; let i = index" 
               class="date-tab" 
               [class.active]="selectedDayIndex === i"
               (click)="selectDay(i)">
            <div class="date-number">{{dayGroup.date | date:'d'}}</div>
            <div class="date-month">{{dayGroup.date | date:'MMM'}}</div>
            <div class="date-day">{{dayGroup.date | date:'EEE'}}</div>
            <div class="date-label" *ngIf="getDayLabel(dayGroup.date)">{{getDayLabel(dayGroup.date)}}</div>
          </div>
        </div>
        
        <!-- Shows for Selected Day -->
        <div class="selected-day-shows" *ngIf="selectedDayShows.length > 0">
          <h3>{{groupedShows[selectedDayIndex].date | date:'EEEE, MMMM d'}}</h3>
          <div class="shows-grid">
            <div *ngFor="let show of selectedDayShows" 
                 class="show-time-slot"
                 [class.sold-out]="show.availableSeats === 0"
                 [class.admin-disabled]="authService.isAdmin()"
                 (click)="!authService.isAdmin() && bookShow(show.id)">
              <div class="time">{{show.showTime | date:'h:mm a'}}</div>
              <div class="availability">{{show.availableSeats}} seats</div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="shows.length === 0" class="no-shows">
        <p>No shows available for this event.</p>
      </div>

      <div class="reviews-section" *ngIf="event">
        <h2>Reviews & Ratings</h2>
        <div class="add-review" *ngIf="authService.isAuthenticated() && !authService.isAdmin()">
          <mat-card>
            <mat-card-content>
              <h3>Write a Review</h3>
              <div class="rating-input">
                <span>Rating:</span>
                <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                          (click)="newReview.rating = star"
                          [style.color]="star <= newReview.rating ? '#ffc107' : '#666'">
                  star
                </mat-icon>
              </div>
              <textarea [(ngModel)]="newReview.comment" placeholder="Write your review..." rows="4"></textarea>
              <button mat-raised-button color="primary" (click)="submitReview()">Submit Review</button>
            </mat-card-content>
          </mat-card>
        </div>
        <div class="reviews-list">
          <mat-card *ngFor="let review of reviews" class="review-card">
            <mat-card-content>
              <div class="review-header">
                <strong>{{review.userName}}</strong>
                <div class="review-rating">
                  <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                            [style.color]="star <= review.rating ? '#ffc107' : '#666'">
                    star
                  </mat-icon>
                </div>
              </div>
              <p>{{review.comment}}</p>
              <span class="review-date">{{review.createdAt | date:'short'}}</span>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>

    <div *ngIf="!event" class="loading">
      <p>Loading event details...</p>
    </div>
  `,
  styles: [`
    .event-details-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
      position: relative;
    }


    .event-header {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
      margin-bottom: 40px;
      background: var(--card-bg);
      padding: 24px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    .event-poster {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .event-poster:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 25px rgba(0,0,0,0.4);
    }
    .details-section h1 {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin-bottom: 16px;
      font-weight: 700;
    }

    .event-meta p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      font-size: 14px;
      color: var(--text-secondary);
    }
    .event-meta mat-icon {
      color: var(--primary-color);
      font-size: 18px;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ffc107;
      font-weight: 600;
      font-size: 14px;
      background: #333;
      padding: 6px 12px;
      border-radius: 4px;
      width: fit-content;
      border: 1px solid #444;
    }

    .description {
      margin-top: 20px;
      padding: 16px;
      background: var(--card-hover);
      border-radius: var(--radius-md);
      border-left: 3px solid var(--primary-color);
    }
    .description h3 {
      color: var(--text-primary);
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 700;
    }
    .description p {
      color: var(--text-secondary);
    }
    .shows-section {
      background: var(--card-bg);
      padding: 24px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    .shows-section h2 {
      margin-bottom: 20px;
      color: var(--text-primary);
      font-size: 1.5rem;
      font-weight: 700;
    }
    .date-selector {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      overflow-x: auto;
      padding: 8px 0;
    }
    .date-tab {
      min-width: 80px;
      padding: 12px 8px;
      text-align: center;
      background: var(--card-hover);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-normal);
    }
    .date-tab:hover {
      border-color: var(--primary-color);
      background: var(--card-bg);
      box-shadow: var(--shadow-sm);
    }
    .date-tab.active {
      background: var(--primary-gradient);
      border-color: var(--primary-color);
      color: white;
      box-shadow: var(--shadow-md);
    }
    .date-number {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .date-month {
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    .date-day {
      font-size: 11px;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    .date-label {
      font-size: 10px;
      background: rgba(184, 134, 11, 0.2);
      color: var(--primary-color);
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      margin-top: 4px;
      font-weight: 600;
    }
    .date-tab.active .date-month,
    .date-tab.active .date-day {
      color: rgba(255, 255, 255, 0.8);
    }
    .date-tab.active .date-label {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    .selected-day-shows h3 {
      color: var(--text-primary);
      margin-bottom: 16px;
      font-size: 1.2rem;
      font-weight: 700;
    }
    .shows-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .show-time-slot {
      padding: 12px 16px;
      background: var(--card-hover);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-normal);
      text-align: center;
      min-width: 100px;
    }
    .show-time-slot:hover {
      border-color: var(--primary-color);
      background: var(--card-bg);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .show-time-slot.sold-out {
      background: #555;
      border-color: #666;
      cursor: not-allowed;
      opacity: 0.6;
    }
    .show-time-slot.admin-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .show-time-slot.admin-disabled:hover {
      transform: none;
      border-color: var(--border-color);
    }
    .time {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .availability {
      font-size: 11px;
      color: #4caf50;
    }
    .sold-out .availability {
      color: #f44336;
    }
    .sold-out .availability::after {
      content: ' (Sold Out)';
    }
    .show-card mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .show-card:hover {
      transform: translateY(-2px);
      border-color: #f84464;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }

    .show-card button {
      border-radius: 4px;
      padding: 8px 24px;
      font-weight: 500;
      background: #f84464 !important;
      color: white !important;
    }
    .no-shows, .loading {
      text-align: center;
      padding: 40px;
      color: var(--text-secondary);
      font-size: 16px;
    }
    .reviews-section {
      background: var(--card-bg);
      padding: 24px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      margin-top: 30px;
      box-shadow: var(--shadow-md);
    }
    .reviews-section h2 {
      color: var(--text-primary);
      margin-bottom: 20px;
      font-weight: 700;
    }
    .add-review {
      margin-bottom: 30px;
    }
    .add-review mat-card {
      background: var(--card-hover);
      border: 1px solid var(--border-color);
    }
    .add-review h3 {
      color: var(--text-primary);
      margin-bottom: 16px;
      font-weight: 700;
    }
    .rating-input {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      color: var(--text-primary);
    }
    .rating-input mat-icon {
      cursor: pointer;
      font-size: 24px;
    }
    .add-review textarea {
      width: 100%;
      padding: 12px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      margin-bottom: 16px;
      font-family: inherit;
    }
    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .review-card {
      background: var(--card-hover);
      border: 1px solid var(--border-color);
    }
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .review-header strong {
      color: var(--text-primary);
      font-weight: 700;
    }
    .review-rating {
      display: flex;
    }
    .review-rating mat-icon {
      font-size: 18px;
    }
    .review-card p {
      color: var(--text-secondary);
      margin: 8px 0;
    }
    .review-date {
      color: var(--text-muted);
      font-size: 12px;
    }
    @media (max-width: 768px) {
      .event-header {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
      }
      .event-details-container {
        padding: 10px;
        border-radius: 0;
      }
      .details-section h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null;
  shows: Show[] = [];
  groupedShows: DayGroup[] = [];
  selectedDayIndex: number = 0;
  selectedDayShows: Show[] = [];
  reviews: any[] = [];
  newReview = { rating: 0, comment: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.loadEventDetails(eventId);
      this.loadShows(eventId);
      this.loadReviews(eventId);
    });
  }

  private loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event || null;
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.snackBar.open('Error loading event details', 'Close', { duration: 3000 });
      }
    });
  }

  private loadShows(eventId: string): void {
    console.log('Loading shows for event ID:', eventId);
    this.eventService.getShowsForEvent(eventId).subscribe({
      next: (shows) => {
        console.log('API returned shows:', shows);
        console.log('Number of shows:', shows.length);
        this.shows = shows;
        this.groupShowsByDay();
      },
      error: (error) => {
        console.error('Error loading shows:', error);
        console.error('Event ID that failed:', eventId);
      }
    });
  }

  private groupShowsByDay(): void {
    const grouped = new Map<string, Show[]>();
    const now = new Date();
    
    console.log('Grouping shows, total:', this.shows.length);
    console.log('Current time:', now);
    
    this.shows.forEach(show => {
      const showDate = new Date(show.showTime);
      console.log('Show time:', show.showTime, 'Parsed:', showDate, 'Is future:', showDate >= now);
      
      // Skip past shows
      if (showDate < now) {
        console.log('Skipping past show:', show.showTime);
        return;
      }
      
      const dateKey = showDate.toDateString();
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(show);
    });
    
    console.log('Grouped shows:', grouped.size, 'days');
    
    this.groupedShows = Array.from(grouped.entries()).map(([dateStr, shows]) => ({
      date: new Date(dateStr),
      shows: shows.sort((a, b) => new Date(a.showTime).getTime() - new Date(b.showTime).getTime())
    }));
    
    console.log('Final grouped shows:', this.groupedShows);
    
    // Select first day by default
    if (this.groupedShows.length > 0) {
      this.selectDay(0);
    }
  }

  selectDay(index: number): void {
    this.selectedDayIndex = index;
    this.selectedDayShows = this.groupedShows[index]?.shows || [];
  }

  getDayLabel(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return '';
  }

  bookShow(showId: string): void {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please login to continue booking.', 'Login', { duration: 5000 })
        .onAction().subscribe(() => {
          this.router.navigate(['/login']);
        });
      return;
    }
    
    this.router.navigate(['/booking/seats', showId]);
  }

  loadReviews(eventId: string): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/reviews/event/${eventId}`).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (err) => console.error('Error loading reviews:', err)
    });
  }

  submitReview(): void {
    if (this.newReview.rating === 0) {
      this.snackBar.open('Please select a rating', 'Close', { duration: 3000 });
      return;
    }
    if (!this.newReview.comment.trim()) {
      this.snackBar.open('Please write a review', 'Close', { duration: 3000 });
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const reviewData = {
      eventId: Number(this.event?.id),
      userId: user.id,
      rating: this.newReview.rating,
      comment: this.newReview.comment
    };
    console.log('Submitting review:', reviewData);
    this.http.post(`${environment.apiUrl}/api/reviews`, reviewData).subscribe({
      next: (response) => {
        console.log('Review submitted:', response);
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.newReview = { rating: 0, comment: '' };
        this.loadReviews(this.event?.id || '');
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.snackBar.open('Error submitting review', 'Close', { duration: 3000 });
      }
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
  }
}