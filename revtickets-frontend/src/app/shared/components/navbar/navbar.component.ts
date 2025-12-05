import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, 
    MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule
  ],
  template: `
    <nav class="modern-navbar">
      <div class="navbar-container">
        <div class="navbar-brand" routerLink="/">
          <span class="brand-icon">🎟️</span>
          <span class="brand-text">RevTickets</span>
        </div>
        
        <div class="nav-links">
          <a routerLink="/events/category/movies" class="nav-link">Movies</a>
        </div>

        <div class="spacer"></div>

        <div class="user-section" *ngIf="currentUser; else loginSection">
          <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
            <mat-icon>account_circle</mat-icon>
            <span>{{currentUser.name}}</span>
          </button>
          <mat-menu #userMenu="matMenu" class="modern-menu">
            <button mat-menu-item routerLink="/user/dashboard">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </button>
            <button mat-menu-item routerLink="/user/bookings">
              <mat-icon>confirmation_number</mat-icon>
              <span>My Bookings</span>
            </button>
            <button mat-menu-item routerLink="/user/profile">
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item *ngIf="isAdmin()" routerLink="/admin">
              <mat-icon>admin_panel_settings</mat-icon>
              <span>Admin Panel</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()" class="logout-btn">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>

        <ng-template #loginSection>
          <div class="auth-buttons">
            <button mat-button routerLink="/login" class="login-btn">Login</button>
            <button mat-raised-button routerLink="/register" class="signup-btn">Sign Up</button>
          </div>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .modern-navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all var(--transition-normal);
    }
    
    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
      height: 72px;
      display: flex;
      align-items: center;
      gap: 24px;
    }
    
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-normal);
    }
    
    .brand-icon {
      font-size: 2rem;
      filter: drop-shadow(0 0 8px rgba(184, 134, 11, 0.5));
      transition: all var(--transition-normal);
    }
    
    .brand-text {
      font-size: 1.5rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
    
    .navbar-brand:hover .brand-icon {
      transform: scale(1.1) rotate(5deg);
    }
    
    .nav-links {
      display: flex;
      gap: 8px;
      margin-left: 24px;
    }
    
    .nav-link {
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 15px;
      padding: 10px 20px;
      border-radius: var(--radius-md);
      text-decoration: none;
      transition: all var(--transition-normal);
      position: relative;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: var(--primary-gradient);
      transition: width var(--transition-normal);
    }
    
    .nav-link:hover {
      color: var(--text-primary);
      background: rgba(184, 134, 11, 0.1);
    }
    
    .nav-link:hover::before {
      width: 80%;
    }
    
    .spacer {
      flex: 1;
    }
    
    .user-section {
      display: flex;
      align-items: center;
    }
    
    .user-button {
      color: var(--text-primary) !important;
      font-weight: 600 !important;
      padding: 10px 20px !important;
      border-radius: var(--radius-md) !important;
      background: rgba(184, 134, 11, 0.1) !important;
      border: 1px solid var(--border-color) !important;
      transition: all var(--transition-normal) !important;
    }
    
    .user-button:hover {
      background: rgba(184, 134, 11, 0.2) !important;
      border-color: var(--primary-color) !important;
      transform: translateY(-2px);
    }
    
    .user-button mat-icon {
      margin-right: 8px;
    }
    
    .auth-buttons {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .login-btn {
      color: var(--text-primary) !important;
      font-weight: 600 !important;
      padding: 10px 24px !important;
      border-radius: var(--radius-md) !important;
      transition: all var(--transition-normal) !important;
    }
    
    .login-btn:hover {
      background: rgba(184, 134, 11, 0.1) !important;
    }
    
    .signup-btn {
      background: var(--primary-gradient) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 10px 28px !important;
      border-radius: var(--radius-md) !important;
      box-shadow: var(--shadow-md) !important;
      transition: all var(--transition-normal) !important;
    }
    
    .signup-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), var(--shadow-glow) !important;
    }
    
    ::ng-deep .modern-menu {
      background: var(--card-bg) !important;
      border: 1px solid var(--border-color) !important;
      border-radius: var(--radius-md) !important;
      box-shadow: var(--shadow-xl) !important;
      margin-top: 8px !important;
    }
    
    ::ng-deep .modern-menu .mat-mdc-menu-item {
      color: var(--text-secondary) !important;
      font-weight: 500 !important;
      padding: 12px 20px !important;
      transition: all var(--transition-fast) !important;
    }
    
    ::ng-deep .modern-menu .mat-mdc-menu-item:hover {
      background: rgba(184, 134, 11, 0.1) !important;
      color: var(--text-primary) !important;
    }
    
    ::ng-deep .modern-menu .logout-btn:hover {
      background: rgba(255, 82, 82, 0.1) !important;
      color: var(--error-color) !important;
    }
    
    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 16px;
        height: 64px;
      }
      
      .nav-links {
        display: none;
      }
      
      .brand-text {
        font-size: 1.25rem;
      }
      
      .user-button span,
      .auth-buttons .login-btn {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role?.toUpperCase() === 'ADMIN';
  }

  logout(): void {
    this.authService.logout();
  }
}