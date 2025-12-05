import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button class="back-button" (click)="goBack()" *ngIf="!isLandingPage">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
  styles: [`
    .back-button {
      position: fixed;
      top: 80px;
      left: 20px;
      background: #f84464;
      color: white;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      min-width: 40px;
    }
    .back-button mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .back-button:hover {
      background: #e63946;
      transform: scale(1.1);
    }
  `]
})
export class BackButtonComponent {
  constructor(private location: Location, private router: Router) {}

  get isLandingPage(): boolean {
    return this.router.url === '/';
  }

  goBack(): void {
    this.location.back();
  }
}