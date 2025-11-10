export interface RegisterUserDto {
  phone_number: string;
  email: string;
  password: string;
}

export interface RegisterUserServerDto {
  expire_otp_timer: number;
  otp: number;
}
