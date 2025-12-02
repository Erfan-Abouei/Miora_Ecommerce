import { CustomErrorProps, type ErrorsResponse } from '@/types/error-type/error-response.type.js';
import { ResponseMessage } from '@/constants/error-constants/RESPONSE_MESSAGE.constant.js';
import { ErrorCode } from '@/constants/error-constants/ERROR_CODE.constant.js';

const throwValidationError = ({ message = ResponseMessage.VALIDATION_ERROR_MESSAGE, statusCode = 400, errorCode = ErrorCode.VALIDATION_ERROR, details = {} }: CustomErrorProps) => {
  const error = new Error(message) as Error & {
    statusCode: number;
    errorCode: ErrorCode;
    details: ErrorsResponse;
  };

  error.statusCode = statusCode;
  error.errorCode = errorCode;
  error.details = details;

  throw error;
};

export { throwValidationError };
