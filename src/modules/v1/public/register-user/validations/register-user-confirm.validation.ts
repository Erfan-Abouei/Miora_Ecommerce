import { z } from 'zod';

export const registerUserConfirmSchema = z.object({
  phone_number: z.string('شماره تماس اجباری است و باید از نوع رشته باشد.').regex(/^09\d{9}$/, 'شماره تلفن باید با 09 شروع شود و 10.'),
  otp: z.string('کد ورود اجباری است و باید از نوع رشته باشد.').length(4, 'کد ورود باید حداکثر 4 رقم باشد.'),
});
