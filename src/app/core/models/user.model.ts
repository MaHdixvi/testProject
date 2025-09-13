export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  createdAt?: Date;
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
