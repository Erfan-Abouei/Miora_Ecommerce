export enum ErrorCode {
  VALIDATION_ERROR = 'خطای اعتبارسنجی',
  NOT_FOUND = 'یافت نشد',
  UNAUTHORIZED = 'دسترسی غیرمجاز',
  FORBIDDEN = 'ممنوع',
  INTERNAL_SERVER_ERROR = 'خطای داخلی سرور',
  DATABASE_ERROR = 'خطای پایگاه داده',
  CONFLICT = 'تداخل داده',
  BAD_REQUEST = 'درخواست نامعتبر',
  UNKNOWN_ERROR = 'خطای نامشخص',
  TO_MANY_REQUEST = 'درخواست بیش از اندازه',
}
