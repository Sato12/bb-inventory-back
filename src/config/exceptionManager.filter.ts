import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from 'src/controller/expectedException';

@Catch()
export class ExceptionManager implements ExceptionFilter {
  constructor() {}
  // ...
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest();
    let status: number;

    let result: CustomException | BadRequestException;

    if (exception instanceof CustomException) {
      result = new CustomException(exception.status, exception?.description || 'Internal Error...', exception.error);
      status = result.status;
    } else if (exception instanceof BadRequestException) {
      result = exception;
      status = result.getStatus();
    } else if (exception instanceof Error) {
      result = new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, exception?.message || 'Internal Error...', exception);
    } else {
      result = new CustomException(
        exception?.statusCode || exception?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Error...',
        exception,
      );
    }

    response.status(status).json(result);
  }
}
