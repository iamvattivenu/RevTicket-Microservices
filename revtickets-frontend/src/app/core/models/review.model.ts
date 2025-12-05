export interface Review {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  likes: number;
  createdDate: Date;
}

export interface ReviewRequest {
  eventId: string;
  rating: number;
  comment: string;
}