export interface Event {
  id: string;
  title: string;
  category: 'movies' | 'concerts' | 'sports' | 'comedy';
  language: string;
  genreOrType: string;
  description: string;
  city: string;
  venue: string;
  dateTime: Date;
  durationMinutes?: number;
  posterUrl: string;
  rating?: number;
  price: number;
  isActive: boolean;
}

export interface Show {
  id: string;
  eventId: string;
  theatreId: string;
  showTime: Date;
  availableSeats: number;
  totalSeats: number;
  isActive?: boolean;
  disabled?: boolean;
}