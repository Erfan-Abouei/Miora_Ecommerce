import { type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

type FieldErrors = ErrorsResponse;

const throwValidationError = (errors: FieldErrors) => {
  const error = new Error('خطایی در اعتبارسنجی رخ داده است.') as Error & {
    statusCode: number;
    errorCode: ErrorCode;
    details: FieldErrors;
  };

  error.statusCode = 400;
  error.errorCode = ErrorCode.VALIDATION_ERROR;
  error.details = errors;

  throw error;
};

export { throwValidationError };
