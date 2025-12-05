export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'USER' | 'ADMIN';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}