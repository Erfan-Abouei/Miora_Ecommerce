export enum ValidationMessage {
  // =========================Public Validation=========================
  PHONE_OR_EMAIL_REQUIRED = 'لطفاً حداقل یکی از ایمیل یا شماره تماس را وارد کنید.',
  ONLY_ONE_CONTACT_METHOD_ALLOWED = 'فقط یکی از ایمیل یا شماره تماس مجاز به ارسال است.',

  // =========================Phone Number Validation=========================
  PHONE_REQUIRED = 'وارد کردن شماره تماس الزامی است.',
  PHONE_INVALID = 'شماره تماس باید با ۰۹ شروع شود و دقیقاً ۱۱ رقم باشد.',
  PHONE_NUMBER_CONFLICT = 'این شماره تماس قبلاً در سیستم ثبت شده است.',
  PHONE_NUMBER_INVALID_OR_EXPIRED = 'شماره تماس وارد شده معتبر نیست یا منقضی شده است.',

  // =========================Email Validation=========================
  EMAIL_REQUIRED = 'وارد کردن ایمیل الزامی است.',
  EMAIL_INVALID = 'فرمت ایمیل وارد شده معتبر نیست. لطفاً دوباره بررسی کنید.',
  EMAIL_CONFLICT = 'این ایمیل قبلاً توسط کاربر دیگری ثبت شده است.',
  EMAIL_INVALID_OR_EXPIRED = 'ایمیل وارد شده معتبر نیست یا منقضی شده است.',

  // =========================Password Validation=========================
  PASSWORD_REQUIRED = 'وارد کردن گذرواژه الزامی است.',
  PASSWORD_INVALID = 'گذرواژه باید حداقل ۶ کاراکتر داشته باشد.',
  PASSWORD_INCORRECT = 'گذرواژه وارد شده اشتباه است.',
  PASSWORD_INVALID_OR_EXPIRED = 'گذرواژه وارد شده معتبر نیست یا منقضی شده است.',

  // =========================Otp Validation=========================
  OTP_REQUIRED = 'وارد کردن کد تأیید الزامی است.',
  OTP_INVALID = 'کد تأیید باید دقیقاً ۴ رقم باشد.',
  OTP_INVALID_OR_EXPIRED = 'کد تأیید وارد شده اشتباه است یا زمان آن به پایان رسیده.',
  OTP_HAS_EXISTED = 'کد تأیید قبلاً برای شما ارسال شده است.',
  OTP_RESEND_BLOCKED = 'لطفاً کمی صبر کنید و سپس دوباره درخواست کد دهید.',
  OTP_RESEND_LIMIT_EXCEEDED = 'تعداد درخواست‌های ارسال کد بیش از حد مجاز شده است. بعداً امتحان کنید.',

  // =========================User Profile Vallidation=========================
  NAME_REQUIRED = 'وارد کردن نام کاربری الزامی است.',
  NAME_TOO_SHORT = 'نام کاربری باید حداقل ۳ کاراکتر باشد.',
  NAME_TOO_LONG = 'نام کاربری نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.',

  ADDRESS_REQUIRED = 'وارد کردن آدرس الزامی است.',
  ZIP_CODE_INVALID = 'کد پستی وارد شده معتبر نیست. لطفاً دوباره بررسی کنید.',

  GENDER_INVALID = 'جنسیت باید یکی از گزینه‌های «مرد» یا «زن» باشد.',
  BIRTH_DATE_INVALID = 'تاریخ تولد وارد شده معتبر نیست.',

  ROLE_INVALID = 'نقش کاربر باید یکی از مقادیر CUSTOMER، ADMIN یا SEO باشد.',

  // =========================Bank Number Validation=========================
  BANK_NUMBER_INVALID = 'شماره کارت بانکی وارد شده معتبر نیست.',
  SHEBA_NUMBER_INVALID = 'شماره شبا باید با IR شروع شود و دقیقاً ۲۶ کاراکتر (۲۴ رقم) داشته باشد.',

  // =========================User Register & Login Status Message=========================
  USER_NOT_FOUND = 'کاربری با این اطلاعات یافت نشد.',
  USER_NOT_IN_REGISTER_QUEUE = 'اطلاعات شما در صف ثبت‌نام یافت نشد.',

  REGISTER_SESSION_ID_REQUIRED = 'شناسه جلسه ثبت‌نام الزامی است.',
  REGISTER_SESSION_INVALID_OR_EXPIRED = 'جلسه ثبت‌نام شما منقضی شده یا معتبر نیست. لطفاً دوباره فرآیند ثبت‌نام را شروع کنید.',

  // =========================Register & Login Query Validation
  DASHBOARD_CALLBACK_ROUTE_REQUIRED_QUERY = 'پارامتر dashboard_callback_route الزامی است.',
  DASHBOARD_CALLBACK_ROUTE_IS_URL_QUERY = 'پارامتر dashboard_callback_route باید یک آدرس اینترنتی معتبر باشد.',

  REDIRECT_URL_REQUIRED_QUERY = 'پارامتر redirect_url الزامی است.',
}
