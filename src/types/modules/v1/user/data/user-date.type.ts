export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SEO = 'SEO',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface UserData {
  id: string;
  user_name?: string | null;
  email: string;
  phone_number: string;
  role: UserRole;
  gender?: Gender | null;
  birth_date?: Date | null;
  password: string;
  profile_picture?: string | null;
  bank_card_number?: string | null;
  sheba_number?: string | null;
  is_subscribed_for_newsletter: boolean;
  is_phone_verified?: boolean;
  is_email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
