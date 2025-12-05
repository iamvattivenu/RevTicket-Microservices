import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
          this.notificationService.showNotification('Backend server is not running. Please start the Spring Boot application.', 'error');
        } else {
          this.notificationService.showNotification(error.error?.message || 'An error occurred', 'error');
        }
        return throwError(() => error);
      })
    );
  }
}