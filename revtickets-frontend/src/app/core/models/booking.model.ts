export interface Booking {
  id: number;
  user?: any;
  show?: any;
  numberOfSeats: number;
  seatNumbers: string;
  totalAmount: number;
  bookingDate?: Date;
  status: string;
  qrCode?: string;
  paymentId?: string;
}

export interface BookingRequest {
  userId: number;
  showId: number;
  seatNumbers: string[];
  paymentMethod?: string;
}