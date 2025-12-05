import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications.asObservable();

  addNotification(message: string, type: Notification['type'] = 'info'): void {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    
    const current = this.notifications.value;
    this.notifications.next([...current, notification]);
    
    setTimeout(() => this.removeNotification(notification.id), 5000);
  }

  removeNotification(id: string): void {
    const current = this.notifications.value;
    this.notifications.next(current.filter(n => n.id !== id));
  }

  showNotification(message: string, type: Notification['type'] = 'info'): void {
    this.addNotification(message, type);
  }
}