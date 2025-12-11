import { UserRole } from "../data/user-date.type";

// ===========LOGIN DTO===========
export interface LoginUserDTO {
  phone_number?: string;
  email?: string;
  password: string;
}

// ===========REGISTER DTO===========
export interface RegisterUserConfirmDTO {
  phone_number: string;
  otp: string;
}

export interface RegisterUserDTO {
  phone_number: string;
  email: string;
  password: string;
  is_phone_veryfied?: boolean;
  is_email_veryfied?: boolean;
}

export interface CreateUserWithAdminAccessDTO {
  phone_number: string;
  email: string;
  password: string;
  role: UserRole;
  is_phone_veryfied?: boolean;
  is_email_veryfied?: boolean;
}

export interface RegisterUserServerDTO {
  expire_otp_timer: number;
  otp: number;
}
