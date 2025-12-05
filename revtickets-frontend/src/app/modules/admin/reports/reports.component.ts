import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatCardModule, 
    MatButtonModule, MatIconModule, MatTabsModule
  ],
  template: `
    <div class="reports-container">
      <div class="header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Analytics & Reports</h1>
      </div>

      <div class="info-message">
        <mat-icon>info</mat-icon>
        <p>Reports and analytics are generated based on actual bookings and events in the system.</p>
      </div>

      <mat-tab-group>
        <mat-tab label="Revenue Analytics">
          <div class="tab-content">
            <div class="no-data">
              <mat-icon>analytics</mat-icon>
              <h3>No Revenue Data Available</h3>
              <p>Revenue analytics will appear here once bookings are made.</p>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Booking Analytics">
          <div class="tab-content">
            <div class="no-data">
              <mat-icon>confirmation_number</mat-icon>
              <h3>No Booking Data Available</h3>
              <p>Booking analytics will appear here once customers make bookings.</p>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Event Performance">
          <div class="tab-content">
            <div class="no-data">
              <mat-icon>event</mat-icon>
              <h3>No Event Performance Data</h3>
              <p>Event performance metrics will appear here once events have bookings.</p>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    .header h1 {
      color: #333333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }
    .header button {
      color: #333333;
    }
    .tab-content {
      padding: 24px 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: #2d2d2d;
      border: 1px solid #333;
      border-radius: 8px;
    }
    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }
    .stat-content mat-icon {
      font-size: 2rem;
      color: #f84464;
    }
    .stat-content h3 {
      margin: 0;
      font-size: 1.5rem;
      color: #ffffff;
      font-weight: 600;
    }
    .stat-content p {
      margin: 0;
      color: #cccccc;
      font-size: 14px;
    }
    .chart-card {
      background: #2d2d2d;
      border: 1px solid #333;
      border-radius: 8px;
    }
    .chart-card mat-card-title {
      color: #ffffff;
      font-weight: 600;
    }
    .simple-chart {
      padding: 40px 20px;
    }
    .chart-bars {
      display: flex;
      align-items: end;
      justify-content: space-around;
      height: 200px;
      gap: 10px;
    }
    .bar {
      background: linear-gradient(to top, #f84464, #ff6b8a);
      border-radius: 4px 4px 0 0;
      min-height: 20px;
      flex: 1;
      max-width: 60px;
      display: flex;
      align-items: end;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease;
    }
    .bar:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(248, 68, 100, 0.4);
    }
    .bar span {
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      padding: 8px 4px;
      line-height: 1.2;
    }
    .category-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .category-card {
      background: #2d2d2d;
      border: 1px solid #333;
      border-radius: 8px;
    }
    .category-card h4 {
      color: #f84464;
      margin: 0 0 16px 0;
      font-weight: 600;
    }
    .category-metrics {
      display: flex;
      justify-content: space-between;
    }
    .metric {
      text-align: center;
    }
    .metric .value {
      display: block;
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 600;
    }
    .metric .label {
      color: #cccccc;
      font-size: 12px;
    }
    .performance-card {
      background: #2d2d2d;
      border: 1px solid #333;
      border-radius: 8px;
    }
    .performance-card mat-card-title {
      color: #ffffff;
      font-weight: 600;
    }
    .event-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .event-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #1a1a1a;
      border-radius: 6px;
      border: 1px solid #333;
    }
    .event-info h4 {
      color: #ffffff;
      margin: 0 0 4px 0;
      font-weight: 600;
    }
    .event-info p {
      color: #cccccc;
      margin: 0;
      font-size: 14px;
    }
    .event-stats {
      text-align: right;
    }
    .event-stats .bookings {
      display: block;
      color: #cccccc;
      font-size: 14px;
    }
    .event-stats .revenue {
      color: #4caf50;
      font-weight: 600;
    }
    ::ng-deep .mat-mdc-tab-group {
      background: transparent;
    }
    ::ng-deep .mat-mdc-tab-header {
      background: #ffffff;
      border-radius: 8px 8px 0 0;
      border: 1px solid #e0e0e0;
    }
    ::ng-deep .mat-mdc-tab {
      color: #666666 !important;
    }
    ::ng-deep .mat-mdc-tab.mdc-tab--active {
      color: #f84464 !important;
    }
    ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      color: #666666 !important;
    }
    ::ng-deep .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
      color: #f84464 !important;
    }
    .info-message {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f5f5f5;
      padding: 16px 20px;
      border-radius: 8px;
      border-left: 4px solid #f84464;
      margin-bottom: 24px;
    }
    .info-message mat-icon {
      color: #f84464;
    }
    .info-message p {
      color: #333333;
      margin: 0;
    }
    .no-data {
      text-align: center;
      padding: 60px 20px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .no-data mat-icon {
      font-size: 4rem;
      color: #999;
      margin-bottom: 16px;
    }
    .no-data h3 {
      color: #333333;
      margin: 0 0 8px 0;
    }
    .no-data p {
      color: #666666;
      margin: 0;
    }
  `]
})
export class ReportsComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}