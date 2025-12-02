export enum ResponseMessage {
  SUCCESS_MESSAGE = 'عملیات با موفقیت انجام شد.',
  ERROR_MESSAGE = 'عملیات با مشکل مواجه شده است.',
  VALIDATION_ERROR_MESSAGE = 'اعتبارسنجی با مشکل مواجه شده است.',
  NO_DATA_RECIVE_MESSAGE = 'به نظر میرسد داده ای ارسال نشده است.',
  UNAUTH_MESSAGE = 'به نظر میرسد ارتباط قطع شده است، لطفا دوباره وارد شوید.',
  UNACCESS_MESSAGE = 'به نظر میرسد شما به این عملیات دسترسی ندارید.',
  UNKNOWN_MESSAGE = 'به نظر میرسد مشکلی به وجود آمده است.',
  TO_MANY_REQUEST_MESSAGE = 'به نظر میرسد بیش از سقف مجاز درخواست ارسال کرده اید. لطفا بعدا تلاش کنید',
  NOT_FOUND_MESSAGE = 'موردی با این مشخصات پیدا نشد.',
}
