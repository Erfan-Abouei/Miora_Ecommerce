import { CustomErrorProps, type ErrorsResponse } from '@/types/error/error-response.type';
import { ResponseMessage } from '@/constants';
import { ErrorCode } from '@/constants';

const throwValidationError = ({ message = ResponseMessage.VALIDATION_ERROR, statusCode = 400, errorCode = ErrorCode.VALIDATION_ERROR, details = {} }: CustomErrorProps) => {
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
