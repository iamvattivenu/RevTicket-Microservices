export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'event' | 'system';
  isRead: boolean;
  createdAt: Date;
  data?: any;
}