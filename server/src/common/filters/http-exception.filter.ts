import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
  Inject,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { originalUrl: uri, method, ip } = request;
    const error_msg = exception.message;

    const info = {
      uri,
      method,
      ip,
      code: status,
      exception,
    };

    this.logger.error(error_msg, info);

    response.status(status).json({
      error: status,
      error_msg,
    });
  }
}
