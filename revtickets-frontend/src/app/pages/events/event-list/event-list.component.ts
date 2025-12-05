import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  template: `
    <div class="event-list-container">

      <div class="header">
        <h1>{{categoryTitle}}</h1>
        <mat-form-field>
          <mat-label>Search Movies</mat-label>
          <input matInput [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="Search by title, genre, or location">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="events-grid" *ngIf="events.length > 0">
        <mat-card *ngFor="let event of filteredEvents" class="event-card" 
                  [routerLink]="['/events/details', event.id]">
          <img mat-card-image [src]="event.posterUrl" [alt]="event.title">
          <mat-card-header>
            <mat-card-title>{{event.title}}</mat-card-title>
            <mat-card-subtitle>{{event.language}} | {{event.genreOrType}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>{{event.city}}</strong> - {{event.venue}}</p>
            <p>₹{{event.price}} onwards</p>
            <div *ngIf="event.rating" class="rating">
              ⭐ {{event.rating}}/5
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Book Now</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="events.length === 0" class="no-events">
        <p>No events found in this category.</p>
      </div>
    </div>
  `,
  styles: [`
    .event-list-container {
      padding: 32px 20px;
      min-height: 100vh;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      gap: 24px;
    }
    
    .header h1 {
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
      margin: 0;
    }
    
    .header mat-form-field {
      width: 320px;
    }
    ::ng-deep .header mat-form-field {
      --mdc-outlined-text-field-label-text-color: var(--text-primary);
      --mdc-outlined-text-field-input-text-color: var(--text-primary);
      --mdc-outlined-text-field-outline-color: var(--border-color);
      --mdc-outlined-text-field-hover-outline-color: var(--border-hover);
      --mdc-outlined-text-field-focused-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-label-text-color: var(--primary-color);
    }
    .header mat-form-field input::placeholder {
      color: var(--text-muted) !important;
      font-size: 14px;
    }
    ::ng-deep .header mat-form-field .mat-mdc-form-field-icon-suffix {
      color: var(--text-primary) !important;
    }
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 24px;
    }
    
    .event-card {
      cursor: pointer;
      transition: all var(--transition-normal);
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    
    .event-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }
    .event-card img {
      height: 300px;
      object-fit: cover;
      width: 100%;
      transition: transform var(--transition-slow);
    }
    
    .event-card:hover img {
      transform: scale(1.05);
    }
    
    .event-card mat-card-header {
      padding: 16px;
    }
    
    .event-card mat-card-title {
      color: var(--text-primary);
      font-size: 15px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.01em;
    }
    
    .event-card mat-card-subtitle {
      color: var(--text-secondary);
      font-size: 13px;
      margin: 6px 0 0;
      font-weight: 500;
    }
    
    .event-card mat-card-content {
      padding: 0 16px 16px;
      color: var(--text-secondary);
      font-size: 13px;
    }
    
    .rating {
      display: inline-block;
      padding: 6px 12px;
      background: linear-gradient(135deg, #ffa726, #ff9800);
      color: white;
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 700;
      box-shadow: var(--shadow-sm);
    }
    .no-events {
      text-align: center;
      padding: 80px 40px;
      background: white;
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    
    .no-events p {
      color: var(--text-secondary);
      font-size: 16px;
    }
    
    @media (max-width: 768px) {
      .event-list-container {
        padding: 24px 16px;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .header mat-form-field {
        width: 100%;
      }
      
      .events-grid {
        gap: 20px;
      }
    }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchQuery = '';
  category = '';
  categoryTitle = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      this.category = params['category'];
      console.log('Category:', this.category);
      this.categoryTitle = this.getCategoryTitle(this.category);
      this.loadEvents();
    });
  }

  private loadEvents(): void {
    console.log('Loading events for category:', this.category);
    if (this.category) {
      this.eventService.getEventsByCategory(this.category).subscribe({
        next: (events) => {
          console.log('Events loaded:', events.length);
          this.events = events;
          this.filteredEvents = events;
        },
        error: (error) => {
          console.error('Error loading events:', error);
          console.log('Category that failed:', this.category);
        }
      });
    } else {
      this.eventService.getAllEvents().subscribe({
        next: (events) => {
          console.log('All events loaded:', events.length);
          this.events = events;
          this.filteredEvents = events;
        },
        error: (error) => console.error('Error loading events:', error)
      });
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredEvents = this.events;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.genreOrType.toLowerCase().includes(query) ||
      (event.city && event.city.toLowerCase().includes(query)) ||
      (event.venue && event.venue.toLowerCase().includes(query))
    );
  }

  private getCategoryTitle(category: string): string {
    const titles: { [key: string]: string } = {
      'movies': '🎬 Movies',
      'concerts': 'Concerts',
      'sports': 'Sports',
      'comedy': 'Comedy Shows'
    };
    return titles[category] || 'All Events';
  }
}