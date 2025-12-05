import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="landing-container">
      <section class="hero">
        <h1>Welcome to RevTickets</h1>
        <p>Book tickets for Movies</p>
        <button mat-raised-button color="primary" class="hero-btn" routerLink="/events/category/movies">
          Book Now
        </button>
      </section>



      <section class="featured-events" *ngIf="featuredEvents.length > 0">
        <h2>Endless Entertainment Anytime. Anywhere!</h2>
        <div class="slideshow-container">
          <div class="slideshow-wrapper" [style.transform]="'translateX(' + (-currentSlide * slideWidth) + '%)'">
            <div *ngFor="let event of featuredEvents; let i = index" 
                 class="slide" 
                 [routerLink]="['/events/details', event.id]">
              <div class="slide-content">
                <img [src]="event.posterUrl" [alt]="event.title" class="slide-poster">
                <div class="slide-info">
                  <h3>{{event.title}}</h3>
                  <p class="subtitle">{{event.language}} | {{event.genreOrType}}</p>
                  <p class="location">{{event.city}} | ₹{{event.price}} onwards</p>
                  <div class="rating" *ngIf="event.rating">
                    ⭐ {{event.rating}}/5
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="nav-btn prev" (click)="previousSlide()" [disabled]="currentSlide === 0">
            ❮
          </button>
          <button class="nav-btn next" (click)="nextSlide()" [disabled]="currentSlide >= maxSlide">
            ❯
          </button>
          <div class="dots-container">
            <span *ngFor="let dot of dots; let i = index" 
                  class="dot" 
                  [class.active]="i === currentSlide"
                  (click)="goToSlide(i)">
            </span>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .landing-container {
      padding: 0;
      min-height: 100vh;
      position: relative;
    }

    .hero {
      text-align: left;
      padding: 100px 60px 80px;
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920') center/cover;
      position: relative;
      overflow: hidden;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      margin-bottom: 24px;
      font-weight: 900;
      color: white;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
      letter-spacing: -0.03em;
    }

    .hero p {
      font-size: clamp(1.1rem, 2vw, 1.4rem);
      color: white;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
      margin-bottom: 32px;
    }
    
    .hero-btn {
      background: var(--primary-gradient) !important;
      color: white !important;
      padding: 8px 24px !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      border-radius: var(--radius-md) !important;
      box-shadow: var(--shadow-md) !important;
      transition: all var(--transition-normal) !important;
      border: none !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }
    
    .hero-btn:hover {
      transform: translateY(-3px) scale(1.05) !important;
      box-shadow: var(--shadow-xl), var(--shadow-glow) !important;
    }
    .categories {
      padding: 60px 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
    }
    
    .category-card {
      cursor: pointer;
      transition: all var(--transition-normal);
      border-radius: var(--radius-lg);
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      position: relative;
      overflow: hidden;
    }
    
    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--primary-gradient);
      transform: scaleX(0);
      transition: transform var(--transition-normal);
    }

    .category-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }
    
    .category-card:hover::before {
      transform: scaleX(1);
    }

    .category-card mat-card-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .featured-events {
      padding: 60px 20px 80px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .featured-events h2 {
      text-align: center;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      margin-bottom: 48px;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    .slideshow-container {
      position: relative;
      width: 100%;
      height: 450px;
      overflow: hidden;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--border-color);
    }
    .slideshow-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease-in-out;
    }
    .slide {
      min-width: 100%;
      height: 100%;
      cursor: pointer;
      position: relative;
    }
    .slide-content {
      display: flex;
      width: 100%;
      height: 100%;
      background: var(--card-bg);
    }
    
    .slide-poster {
      width: 320px;
      height: 100%;
      object-fit: cover;
    }
    
    .slide-info {
      flex: 1;
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .slide-info h3 {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin-bottom: 20px;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }
    
    .slide-info .subtitle {
      font-size: 1.15rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
      font-weight: 500;
    }
    
    .slide-info .location {
      font-size: 1.1rem;
      color: var(--primary-color);
      font-weight: 700;
      margin-bottom: 20px;
    }
    
    .slide-info .rating {
      display: inline-block;
      padding: 8px 16px;
      background: linear-gradient(135deg, #ffa726, #ff9800);
      color: white;
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-weight: 700;
    }
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      color: var(--primary-color);
      border: 2px solid var(--border-color);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      transition: all var(--transition-normal);
      z-index: 10;
      box-shadow: var(--shadow-lg);
    }
    
    .nav-btn:hover {
      background: var(--primary-color);
      transform: translateY(-50%) scale(1.15);
      box-shadow: var(--shadow-xl), var(--shadow-glow);
    }
    
    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    
    .nav-btn.prev { left: 24px; }
    .nav-btn.next { right: 24px; }
    .dots-container {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: all var(--transition-normal);
      border: 2px solid transparent;
    }
    
    .dot.active {
      background: var(--primary-color);
      transform: scale(1.3);
      border-color: white;
      box-shadow: 0 0 12px rgba(102, 126, 234, 0.6);
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (max-width: 768px) {
      .hero { padding: 80px 20px 60px; }
      .categories { padding: 40px 16px; }
      .category-grid { gap: 20px; }
      .featured-events { padding: 40px 16px 60px; }
      .slideshow-container { height: 380px; }
      .slide-content { flex-direction: column; }
      .slide-poster { width: 100%; height: 220px; }
      .slide-info { padding: 24px; }
      .nav-btn { width: 44px; height: 44px; font-size: 20px; }
      .nav-btn.prev { left: 12px; }
      .nav-btn.next { right: 12px; }
    }
  `]
})
export class LandingComponent implements OnInit {
  featuredEvents: Event[] = [];
  currentSlide = 0;
  slideWidth = 100;
  maxSlide = 0;
  dots: number[] = [];
  private slideInterval: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadFeaturedEvents();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private loadFeaturedEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.featuredEvents = events.slice(0, 6);
        this.maxSlide = this.featuredEvents.length - 1;
        this.dots = Array(this.featuredEvents.length).fill(0).map((_, i) => i);
      },
      error: (error) => console.error('Error loading events:', error)
    });
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlide;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  private startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}