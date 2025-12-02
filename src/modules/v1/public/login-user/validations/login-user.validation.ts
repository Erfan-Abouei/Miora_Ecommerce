import { z } from 'zod';

export const loginUserSchema = z
  .object({
    phone_number: z
      .string('شماره تماس اجباری است و باید از نوع رشته باشد.')
      .regex(/^09\d{9}$/, 'شماره تلفن باید با 09 شروع شود و 10.')
      .optional(),

    email: z.string('ایمیل اجباری است و باید از نوع رشته باشد.').email('فرمت ایمیل وارد شده درست نمی‌باشد.').optional(),
    password: z.string('گذرواژه اجباری است و باید از نوع رشته باشد.').min(6, 'گذرواژه حداقل باید 6 نویسه باشد.'),
  })
  .refine((data) => data.phone_number || data.email, {
    message: 'ایمیل یا شماره تماس باید حداقل یکی وارد شود.',
    path: ['error'],
  });
