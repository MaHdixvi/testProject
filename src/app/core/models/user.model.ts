export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  createdAt?: string|Date;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  user?: User;
}
