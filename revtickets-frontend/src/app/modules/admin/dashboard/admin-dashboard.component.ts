import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { type Event } from '../../../core/models/event.model';
import { EventService } from '../../../core/services/event.service';
import { BookingService } from '../../../core/services/booking.service';
import { ShowService } from '../../../core/services/show.service';
import { SeatService } from '../../../core/services/seat.service';
import { Booking } from '../../../core/models/booking.model';
import { Show } from '../../../core/models/show.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatChipsModule],
  template: `
    <div class="admin-dashboard">
      <mat-tab-group>
        <mat-tab label="Dashboard">
          <div class="tab-content">
      <div class="header">
        <h1>Admin Dashboard</h1>
        <p>Manage events, venues, and view analytics</p>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>movie</mat-icon>
              <div>
                <h3>{{totalEvents}}</h3>
                <p>Total Events</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>confirmation_number</mat-icon>
              <div>
                <h3>{{totalBookings}}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>currency_rupee</mat-icon>
              <div>
                <h3>₹{{totalRevenue}}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <mat-card class="action-card" (click)="createEvent()">
            <mat-card-content>
              <mat-icon>add</mat-icon>
              <h3>Create Event</h3>
              <p>Add new movies, concerts, or shows</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" (click)="manageVenues()">
            <mat-card-content>
              <mat-icon>location_on</mat-icon>
              <h3>Manage Venues</h3>
              <p>Add or edit theatre locations</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" (click)="viewReports()">
            <mat-card-content>
              <mat-icon>analytics</mat-icon>
              <h3>View Reports</h3>
              <p>Analytics and booking trends</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="recent-events">
        <div class="events-header">
          <h2>Recent Events</h2>
          <div class="event-filters">
            <mat-form-field>
              <mat-label style="color: #666666;">Filter by Status</mat-label>
              <mat-select [(ngModel)]="eventStatusFilter" (selectionChange)="filterEvents()">
                <mat-option value="ALL">All</mat-option>
                <mat-option value="true">Active</mat-option>
                <mat-option value="false">Inactive</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
        <div class="events-table">
          <mat-card *ngFor="let event of recentEvents" class="event-row">
            <mat-card-content>
              <div class="event-info">
                <img [src]="event.posterUrl" [alt]="event.title" class="event-thumb">
                <div class="event-details">
                  <h4>{{event.title}}</h4>
                  <p>{{event.category}} | {{event.language}}</p>
                  <p>{{event.city}} - {{event.venue}}</p>
                </div>
                <div class="event-status">
                  <span class="status" [class]="event.isActive ? 'active' : 'inactive'">
                    {{event.isActive ? 'Active' : 'Inactive'}}
                  </span>
                  <p>₹{{event.price}}</p>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="editEvent(event)" style="color: #666666;">Edit</button>
              <button mat-button color="warn" (click)="deleteEvent(event.id)">Delete</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
          </div>
        </mat-tab>

        <mat-tab label="Booking Management">
          <div class="tab-content">
            <h2 style="color: var(--text-primary); font-weight: 700;">All Bookings</h2>
            <div class="filter-bar">
              <mat-form-field>
                <mat-label style="color: var(--text-primary);">Filter by Status</mat-label>
                <mat-select [(ngModel)]="bookingFilter" (selectionChange)="filterBookings()">
                  <mat-option value="ALL">All</mat-option>
                  <mat-option value="PENDING">Pending</mat-option>
                  <mat-option value="CONFIRMED">Confirmed</mat-option>
                  <mat-option value="CANCELLED">Cancelled</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="bookings-table">
              <mat-card *ngFor="let booking of filteredBookings" class="booking-row">
                <mat-card-content>
                  <div class="booking-info">
                    <div><strong>ID:</strong> {{booking.id}}</div>
                    <div><strong>User:</strong> {{booking.user?.name || 'N/A'}}</div>
                    <div><strong>Event:</strong> {{booking.show?.event?.title || 'N/A'}}</div>
                    <div><strong>Seats:</strong> {{booking.seatNumbers}}</div>
                    <div><strong>Amount:</strong> ₹{{booking.totalAmount}}</div>
                    <mat-chip [style.background]="getStatusColor(booking.status)">{{booking.status}}</mat-chip>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="warn" (click)="cancelBookingAdmin(booking.id)" [disabled]="booking.status === 'CANCELLED'">Cancel</button>
                  <button mat-button color="warn" (click)="deleteBooking(booking.id)" *ngIf="booking.status === 'CANCELLED'">Delete</button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Event Scheduling">
          <div class="tab-content">
            <h2 style="color: var(--text-primary); font-weight: 700;">Manage Shows</h2>
            <mat-card class="create-show-card">
              <mat-card-content>
                <h3 style="color: var(--text-primary); font-weight: 700;">Create New Show</h3>
                <div class="form-row">
                  <mat-form-field>
                    <mat-label style="color: var(--text-primary);">Select Event</mat-label>
                    <mat-select [(ngModel)]="newShow.eventId">
                      <mat-option *ngFor="let event of allEvents" [value]="event.id">{{event.title}}</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label style="color: var(--text-primary);">Show Date & Time</mat-label>
                    <input matInput type="datetime-local" [(ngModel)]="newShow.showTime">
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label style="color: var(--text-primary);">Available Seats</mat-label>
                    <input matInput type="number" [(ngModel)]="newShow.availableSeats">
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="createShow()">Create Show</button>
                </div>
              </mat-card-content>
            </mat-card>
            <div class="shows-list">
              <mat-card *ngFor="let show of allShows" class="show-row">
                <mat-card-content>
                  <div class="show-info">
                    <img [src]="show.event?.posterUrl" [alt]="show.event?.title" class="show-poster">
                    <div class="show-details">
                      <div><strong>Event:</strong> {{show.event?.title}}</div>
                      <div><strong>Time:</strong> {{show.showTime | date:'medium'}}</div>
                      <div><strong>Seats:</strong> {{show.availableSeats}}</div>
                      <mat-chip [style.background]="show.isActive ? '#4caf50' : '#f44464'" [style.color]="'white'">{{show.isActive ? 'Active' : 'Inactive'}}</mat-chip>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="warn" (click)="deleteShow(show.id)">Delete</button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Seat Management">
          <div class="tab-content">
            <h2 style="color: var(--text-primary); font-weight: 700;">Generate Seats for Shows</h2>
            <mat-card class="seat-gen-card">
              <mat-card-content>
                <div class="form-row">
                  <mat-form-field>
                    <mat-label style="color: var(--text-primary);">Select Show</mat-label>
                    <mat-select [(ngModel)]="selectedShowId">
                      <mat-option *ngFor="let show of allShows" [value]="show.id">
                        {{show.event?.title}} - {{show.showTime | date:'short'}}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <h3 style="color: var(--text-primary); margin-top: 20px; font-weight: 700;">Seat Categories</h3>
                <div class="seat-categories">
                  <div class="category-row">
                    <mat-form-field>
                      <mat-label style="color: var(--text-primary);">Regular Seats</mat-label>
                      <input matInput type="number" [(ngModel)]="seatCategories.regular" placeholder="0">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label style="color: var(--text-primary);">Silver Seats</mat-label>
                      <input matInput type="number" [(ngModel)]="seatCategories.silver" placeholder="0">
                    </mat-form-field>
                  </div>
                  <div class="category-row">
                    <mat-form-field>
                      <mat-label style="color: var(--text-primary);">Gold Seats</mat-label>
                      <input matInput type="number" [(ngModel)]="seatCategories.gold" placeholder="0">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label style="color: var(--text-primary);">Premium Seats</mat-label>
                      <input matInput type="number" [(ngModel)]="seatCategories.premium" placeholder="0">
                    </mat-form-field>
                  </div>
                  <div class="total-seats">
                    <strong>Total Seats: {{getTotalSeats()}}</strong>
                  </div>
                </div>
                <div style="margin-top: 20px; display: flex; gap: 10px;">
                  <button mat-raised-button color="primary" (click)="generateSeats()">Generate Seats</button>
                  <button mat-raised-button (click)="resetSeatCategories()">Reset</button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="User Management">
          <div class="tab-content">
            <h2 style="color: var(--text-primary); font-weight: 700;">Registered Users</h2>
            <div class="users-table">
              <mat-card *ngFor="let user of allUsers" class="user-row">
                <mat-card-content>
                  <div class="user-info">
                    <div><strong>ID:</strong> {{user.id}}</div>
                    <div><strong>Name:</strong> {{user.name}}</div>
                    <div><strong>Email:</strong> {{user.email}}</div>
                    <div><strong>Phone:</strong> {{user.phone || 'N/A'}}</div>
                    <div><strong>Role:</strong> {{user.role}}</div>
                    <mat-chip [style.background]="user.isBlocked ? '#f44336' : '#4caf50'" [style.color]="'white'">
                      {{user.isBlocked ? 'Blocked' : 'Active'}}
                    </mat-chip>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button color="warn" (click)="blockUser(user.id)" *ngIf="!user.isBlocked && user.role !== 'ADMIN'">Block</button>
                  <button mat-button color="primary" (click)="unblockUser(user.id)" *ngIf="user.isBlocked">Unblock</button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Bulk Operations">
          <div class="tab-content">
            <h2 style="color: var(--text-primary); font-weight: 700;">Bulk Event Operations</h2>
            <div class="bulk-actions">
              <button mat-raised-button color="primary" (click)="bulkActivateEvents()">Activate All Events</button>
              <button mat-raised-button style="background: #dc2626 !important; color: white !important; box-shadow: var(--shadow-md) !important; border-radius: var(--radius-md) !important;" (click)="bulkDeactivateEvents()">Deactivate All Events</button>
              <button mat-raised-button style="background: white !important; color: var(--text-primary) !important; border: 2px solid var(--border-color) !important; box-shadow: var(--shadow-md) !important; border-radius: var(--radius-md) !important;" (click)="bulkUpdatePrices()">Update All Prices</button>
            </div>
            <mat-card class="bulk-price-card">
              <mat-card-content>
                <h3 style="color: var(--text-primary); font-weight: 700;">Bulk Price Update</h3>
                <mat-form-field>
                  <mat-label style="color: var(--text-primary);">New Price (₹)</mat-label>
                  <input matInput type="number" [(ngModel)]="bulkPrice">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="applyBulkPrice()">Apply to All</button>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: var(--primary-bg);
      min-height: 100vh;
    }
    .header {
      margin-bottom: 32px;
    }
    .header h1 {
      color: var(--text-primary);
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 8px 0;
    }
    .header p {
      color: var(--text-secondary);
      margin: 0;
      font-size: 14px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }
    .stat-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .stat-card .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }
    .stat-card mat-icon {
      font-size: 2rem;
      color: var(--primary-color);
    }
    .stat-card h3 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-primary);
      font-weight: 700;
    }
    .stat-card p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .action-card {
      cursor: pointer;
      transition: all var(--transition-normal);
      text-align: center;
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      padding: 24px;
      box-shadow: var(--shadow-md);
    }
    .action-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }
    .action-card mat-icon {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 12px;
    }
    .action-card h3 {
      color: var(--text-primary);
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    .action-card p {
      color: var(--text-secondary);
      font-size: 14px;
      margin: 0;
    }
    .events-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .event-row {
      background: var(--card-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }
    .event-row:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-2px);
    }
    .event-row .event-info {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }
    .event-thumb {
      width: 60px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    .event-details {
      flex: 1;
    }
    .event-details h4 {
      margin: 0 0 4px 0;
      color: var(--text-primary);
      font-size: 16px;
      font-weight: 600;
    }
    .event-details p {
      margin: 2px 0;
      color: var(--text-secondary);
      font-size: 14px;
    }
    .event-status {
      text-align: right;
    }
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .status.active {
      background: #4caf50;
      color: white;
    }
    .status.inactive {
      background: #f44336;
      color: white;
    }
    .tab-content {
      padding: 20px;
    }
    .filter-bar {
      margin-bottom: 20px;
    }
    .filter-bar ::ng-deep .mat-mdc-form-field,
    .create-show-card ::ng-deep .mat-mdc-form-field,
    .seat-gen-card ::ng-deep .mat-mdc-form-field,
    .bulk-price-card ::ng-deep .mat-mdc-form-field,
    .event-filters ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-label-text-color: var(--text-secondary);
      --mdc-outlined-text-field-input-text-color: var(--text-primary);
      --mdc-outlined-text-field-outline-color: var(--border-color);
      --mdc-outlined-text-field-hover-outline-color: var(--border-hover);
      --mdc-outlined-text-field-focused-outline-color: var(--primary-color);
      --mdc-outlined-text-field-focused-label-text-color: var(--primary-color);
    }
    .filter-bar ::ng-deep .mat-mdc-select-value,
    .create-show-card ::ng-deep .mat-mdc-select-value,
    .seat-gen-card ::ng-deep .mat-mdc-select-value,
    .event-filters ::ng-deep .mat-mdc-select-value {
      color: var(--text-primary) !important;
    }
    .filter-bar ::ng-deep .mat-mdc-select-arrow,
    .create-show-card ::ng-deep .mat-mdc-select-arrow,
    .seat-gen-card ::ng-deep .mat-mdc-select-arrow,
    .event-filters ::ng-deep .mat-mdc-select-arrow {
      color: var(--text-primary) !important;
    }
    .bookings-table, .shows-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .booking-row, .show-row, .user-row {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }
    .booking-row:hover, .show-row:hover, .user-row:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-xl);
      transform: translateY(-2px);
    }
    .show-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .show-poster {
      width: 80px;
      height: 110px;
      object-fit: cover;
      border-radius: 4px;
    }
    .show-details {
      flex: 1;
    }
    .show-details > div {
      margin: 4px 0;
      color: var(--text-primary);
    }
    .booking-info, .user-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      color: var(--text-primary);
    }
    .create-show-card, .seat-gen-card, .bulk-price-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      margin-bottom: 20px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    .form-row {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .seat-categories {
      margin-top: 16px;
    }
    .category-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .total-seats {
      color: var(--text-primary);
      font-size: 18px;
      margin-top: 16px;
      padding: 12px;
      background: var(--card-hover);
      border-radius: var(--radius-md);
      text-align: center;
      font-weight: 700;
    }
    .bulk-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .events-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .event-filters {
      display: flex;
      gap: 12px;
    }

    ::ng-deep .mat-mdc-tab-body-content {
      overflow: visible !important;
    }
    ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      color: var(--text-primary) !important;
    }
    ::ng-deep .mat-mdc-tab-indicator .mdc-tab-indicator__content--underline {
      border-color: var(--primary-color) !important;
    }
    .users-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalEvents = 0;
  totalBookings = 0;
  totalRevenue = 0;
  recentEvents: Event[] = [];
  allEvents: Event[] = [];
  allBookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  bookingFilter = 'ALL';
  eventCategoryFilter = 'ALL';
  eventStatusFilter = 'ALL';
  allShows: Show[] = [];
  newShow = { eventId: '', showTime: '', availableSeats: 0 };
  selectedShowId: number | null = null;
  totalSeatsToGenerate = 100;
  bulkPrice = 0;
  seatCategories = { regular: 0, silver: 0, gold: 0, premium: 0 };
  allUsers: any[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingService,
    private showService: ShowService,
    private seatService: SeatService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadBookings();
    this.loadShows();
    this.loadUsers();
  }

  private loadDashboardData(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.allEvents = events;
        this.recentEvents = events.slice(0, 10);
        this.totalEvents = events.length;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.allEvents = [];
        this.recentEvents = [];
        this.totalEvents = 0;
      }
    });

    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.totalBookings = bookings.length;
        this.totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.totalBookings = 0;
        this.totalRevenue = 0;
      }
    });
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.allBookings = bookings;
        this.filteredBookings = bookings;
      },
      error: (err) => console.error('Error loading bookings:', err)
    });
  }

  loadShows(): void {
    this.showService.getAllShows().subscribe({
      next: (shows) => {
        this.allShows = shows;
      },
      error: (err) => console.error('Error loading shows:', err)
    });
  }

  filterBookings(): void {
    if (this.bookingFilter === 'ALL') {
      this.filteredBookings = this.allBookings;
    } else {
      this.filteredBookings = this.allBookings.filter(b => b.status === this.bookingFilter);
    }
  }

  filterEvents(): void {
    let filtered = this.allEvents;
    if (this.eventStatusFilter !== 'ALL') {
      filtered = filtered.filter(e => e.isActive.toString() === this.eventStatusFilter);
    }
    this.recentEvents = filtered.slice(0, 10);
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'PENDING': '#ff9800',
      'CONFIRMED': '#4caf50',
      'CANCELLED': '#f44336'
    };
    return colors[status] || '#666';
  }

  cancelBookingAdmin(id: number): void {
    if (confirm('Cancel this booking?')) {
      this.bookingService.cancelBooking(id.toString()).subscribe({
        next: () => {
          alert('Booking cancelled');
          this.loadBookings();
        },
        error: (err) => alert('Error cancelling booking')
      });
    }
  }

  deleteBooking(id: number): void {
    if (confirm('Permanently delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.allBookings = this.allBookings.filter(b => b.id !== id);
          this.filterBookings();
          alert('Booking deleted');
        },
        error: (err) => alert('Error deleting booking')
      });
    }
  }

  createShow(): void {
    const showData = {
      event: { id: this.newShow.eventId },
      venue: { id: 1 },
      showTime: this.newShow.showTime,
      availableSeats: this.newShow.availableSeats,
      isActive: true
    };
    this.showService.createShow(showData).subscribe({
      next: () => {
        alert('Show created successfully');
        this.loadShows();
        this.newShow = { eventId: '', showTime: '', availableSeats: 0 };
      },
      error: (err) => alert('Error creating show')
    });
  }

  deleteShow(id: number | undefined): void {
    if (!id || !confirm('Delete this show?')) return;
    this.showService.deleteShow(id).subscribe({
      next: () => {
        this.allShows = this.allShows.filter(show => show.id !== id);
        alert('Show deleted');
      },
      error: (err) => alert('Error deleting show')
    });
  }

  getTotalSeats(): number {
    return this.seatCategories.regular + this.seatCategories.silver + this.seatCategories.gold + this.seatCategories.premium;
  }

  generateSeats(): void {
    if (!this.selectedShowId) {
      alert('Please select a show');
      return;
    }
    const total = this.getTotalSeats();
    if (total === 0) {
      alert('Please enter seat counts for at least one category');
      return;
    }
    this.seatService.generateSeats(this.selectedShowId, total).subscribe({
      next: () => {
        alert(`${total} seats generated successfully`);
        this.resetSeatCategories();
      },
      error: (err) => alert('Error generating seats')
    });
  }

  resetSeatCategories(): void {
    this.seatCategories = { regular: 0, silver: 0, gold: 0, premium: 0 };
  }

  bulkActivateEvents(): void {
    if (confirm('Activate all events?')) {
      let count = 0;
      this.recentEvents.forEach(event => {
        event.isActive = true;
        this.eventService.updateEvent(event.id, event).subscribe(() => count++);
      });
      setTimeout(() => alert(`${count} events activated`), 1000);
    }
  }

  bulkDeactivateEvents(): void {
    if (confirm('Deactivate all events?')) {
      let count = 0;
      this.recentEvents.forEach(event => {
        event.isActive = false;
        this.eventService.updateEvent(event.id, event).subscribe(() => count++);
      });
      setTimeout(() => alert(`${count} events deactivated`), 1000);
    }
  }

  bulkUpdatePrices(): void {
    alert('Enter new price in the field below and click Apply');
  }

  applyBulkPrice(): void {
    if (confirm(`Update all event prices to ₹${this.bulkPrice}?`)) {
      let count = 0;
      this.recentEvents.forEach(event => {
        event.price = this.bulkPrice;
        this.eventService.updateEvent(event.id, event).subscribe(() => count++);
      });
      setTimeout(() => {
        alert(`${count} events updated`);
        this.loadDashboardData();
      }, 1000);
    }
  }

  createEvent(): void {
    this.router.navigate(['/admin/create-event']);
  }

  manageVenues(): void {
    this.router.navigate(['/admin/manage-venues']);
  }

  viewReports(): void {
    this.router.navigate(['/admin/reports']);
  }

  editEvent(event: Event): void {
    this.router.navigate(['/admin/create-event'], { state: { event } });
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.recentEvents = this.recentEvents.filter(event => event.id !== eventId);
          this.totalEvents--;
          alert('Event deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting event:', err);
          alert('Failed to delete event. Please try again.');
        }
      });
    }
  }

  loadUsers(): void {
    this.eventService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  blockUser(id: number): void {
    if (confirm('Block this user?')) {
      this.eventService.blockUser(id).subscribe({
        next: () => {
          alert('User blocked');
          this.loadUsers();
        },
        error: (err) => alert('Error blocking user')
      });
    }
  }

  unblockUser(id: number): void {
    if (confirm('Unblock this user?')) {
      this.eventService.unblockUser(id).subscribe({
        next: () => {
          alert('User unblocked');
          this.loadUsers();
        },
        error: (err) => alert('Error unblocking user')
      });
    }
  }
}