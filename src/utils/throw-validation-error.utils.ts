import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constants.js';

type FieldErrors = Record<string, string[]>;

const throwValidationError = (errors: FieldErrors) => {
  throw {
    message: 'خطایی در اعتبارسنجی رخ داده است.',
    statusCode: 400,
    errorCode: ErrorCode.VALIDATION_ERROR,
    details: errors,
  };
};

export { throwValidationError };
