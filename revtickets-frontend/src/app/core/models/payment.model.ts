export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  details?: any;
}