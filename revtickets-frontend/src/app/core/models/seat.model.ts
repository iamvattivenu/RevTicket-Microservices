export interface Seat {
  id?: number;
  show?: any;
  seatNumber: string;
  seatType: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
  booking?: any;
  row?: string;
  number?: string;
  category?: string;
  price?: number;
}

export interface SeatLayout {
  rows: any[];
}
