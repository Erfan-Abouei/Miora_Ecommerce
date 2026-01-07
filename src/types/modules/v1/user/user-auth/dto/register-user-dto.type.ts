import type { UserRole } from '../data';

export interface RegisterUserConfirmDTO {
  password: string;
  otp: string;
  register_session_id: string;
}

export interface RegisterUserDTO {
  phone_number?: string;
  email?: string;
  password: string;
  is_phone_verified?: boolean;
  is_email_verified?: boolean;
}

export interface CreateUserWithAdminAccessDTO {
  phone_number?: string;
  email?: string;
  password: string;
  role: UserRole;
  is_phone_veryfied?: boolean;
  is_email_veryfied?: boolean;
}

export interface RegisterUserServerDTO {
  register_session_id: string;
  otp: number;
}

export interface RegisterUserResendOtpDTO {
  register_session_id: string;
}

export interface RegisterUserResendOtpServerDTO {
  expire_otp_timer: number;
  otp: number;
}

export interface ForgotPasswordRequestedDTO {
  email: string;
}
