import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🎟️ RevTickets</h3>
          <p>Your ultimate destination for booking tickets to movies, concerts, sports events, and comedy shows.</p>
          <div class="social-links">
            <button mat-icon-button><mat-icon>facebook</mat-icon></button>
            <button mat-icon-button><mat-icon>twitter</mat-icon></button>
            <button mat-icon-button><mat-icon>instagram</mat-icon></button>
            <button mat-icon-button><mat-icon>youtube</mat-icon></button>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/events/category/movies">Movies</a></li>
            <li><a routerLink="/events/category/concerts">Concerts</a></li>
            <li><a routerLink="/events/category/sports">Sports</a></li>
            <li><a routerLink="/events/category/comedy">Comedy</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contact Info</h4>
          <div class="contact-info">
            <p><mat-icon>email</mat-icon> support&#64;revtickets.com</p>
            <p><mat-icon>phone</mat-icon> +91 97906 18957</p>
            <p><mat-icon>location_on</mat-icon> Chennai, Tamil Nadu, India</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 RevTickets. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1f1f1f;
      color: #ffffff;
      margin-top: auto;
      border-top: 2px solid #333333;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .footer-section h3 {
      color: #f84464;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .footer-section h4 {
      color: #ffffff;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .footer-section p {
      color: #cccccc;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    .footer-section ul li a {
      color: #cccccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .footer-section ul li a:hover {
      color: #f84464;
    }
    .social-links {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .social-links button {
      color: #cccccc;
      transition: color 0.3s ease;
    }
    .social-links button:hover {
      color: #f84464;
    }
    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .contact-info mat-icon {
      color: #f84464;
      font-size: 18px;
    }
    .footer-bottom {
      border-top: 1px solid #333;
      padding: 1rem 2rem;
      text-align: center;
      background: #151515;
    }
    .footer-bottom p {
      color: #888888;
      margin: 0;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
      }
      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {}