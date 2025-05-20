export interface UserBase {
  full_name: string; 
}

export interface UserCreate extends UserBase {
  email: string; 
  password: string; 
  password_confirmation: string; 
}

export interface UserResponse extends UserBase {
  id: number; 
  email: string; 
  created_at: string; 
  updated_at: string; 
}

export interface UserUpdate {
  id: number;
  email?: string | null; 
  full_name?: string | null;
  password?: string | null; 
}