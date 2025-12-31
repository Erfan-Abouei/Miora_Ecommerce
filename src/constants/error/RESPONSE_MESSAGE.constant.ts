export enum ResponseMessage {
  // Success messages
  SUCCESS = 'عملیات با موفقیت انجام شد.',
  CREATED_SUCCESS = 'مورد با موفقیت ایجاد شد.',
  UPDATED_SUCCESS = 'مورد با موفقیت به‌روزرسانی شد.',
  DELETED_SUCCESS = 'مورد با موفقیت حذف شد.',

  // General errors
  ERROR = 'عملیات با مشکل مواجه شده است.',
  UNKNOWN_ERROR = 'به نظر می‌رسد مشکلی به وجود آمده است.',

  // Validation errors
  VALIDATION_ERROR = 'اعتبارسنجی با مشکل مواجه شده است.',
  INVALID_EMAIL_FORMAT = 'فرمت ایمیل وارد شده صحیح نیست.',
  PASSWORD_TOO_WEAK = 'رمز عبور ضعیف است، حداقل باید ۸ کاراکتر، شامل حروف و اعداد باشد.',
  MISSING_REQUIRED_FIELDS = 'فیلدهای ضروری ارسال نشده‌اند.',

  // Authentication and authorization
  UNAUTHORIZED = 'اعتبارسنجی نشده اید. لطفا دوباره تلاش کنید.',
  FORBIDDEN = 'به این عملیات دسترسی ندارید.',
  TOKEN_EXPIRED = 'توکن شما منقضی شده است، لطفا دوباره وارد شوید.',
  INVALID_TOKEN = 'توکن ارسال شده نامعتبر است.',

  // Data related messages
  NO_DATA_RECEIVED = 'به نظر می‌رسد داده‌ای ارسال نشده است.',
  NOT_FOUND = 'موردی با این مشخصات پیدا نشد.',
  DATA_CONFLICT = 'داده ارسال شده با داده‌های موجود در تداخل است.',

  // Rate limiting
  TOO_MANY_REQUESTS = 'بیش از سقف مجاز درخواست ارسال کرده‌اید، لطفا بعدا تلاش کنید.',

  // Database errors
  DATABASE_ERROR = 'مشکلی در پایگاه داده رخ داده است.',
  RECORD_ALREADY_EXISTS = 'رکورد مورد نظر از قبل وجود دارد.',

  // File and storage operations
  FILE_UPLOAD_FAILED = 'آپلود فایل با مشکل مواجه شد.',
  FILE_TYPE_NOT_ALLOWED = 'نوع فایل ارسال شده مجاز نیست.',

  // API request errors
  BAD_REQUEST = 'درخواست نامعتبر است.',
  INVALID_QUERY_PARAMS = 'پارامترهای ارسال شده برای query نامعتبر هستند.',
  INVALID_BODY_PARAMS = 'پارامترهای ارسال شده برای body نامعتبر هستند.',

  // Other ...
  USER_LOGOUT = 'کاربر با موفقیت خارج شد.',
  THERE_IS_NO_PLACE = 'هنوز خبری نیست.'
}
