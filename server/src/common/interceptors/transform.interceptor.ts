import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';

import type { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { RequestWithAuth } from 'src/polls/types';

export interface ITransformOptions {
  skipPaths?: string[];
  code?: number;
  message?: string;
}

export const GetTransformInterceptor = (
  options: ITransformOptions = {},
): Type<NestInterceptor> => {
  @Injectable()
  class TransformInterceptor implements NestInterceptor {
    private options: ITransformOptions;
    constructor(
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
      this.options = options;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req: Request | RequestWithAuth = context.getArgByIndex(1).req;
      const reqPath = req?.originalUrl?.split('?')[0];
      if (this.options?.skipPaths?.includes(reqPath)) {
        return next.handle();
      }

      return next.handle().pipe(
        map((data) => {
          const { originalUrl: uri, method, ip } = req;
          const { userID, pollID, name } = req as RequestWithAuth;

          const info = {
            uri,
            method,
            ip,
            userID,
            pollID,
            name,
          };
          this.logger.info('response', info);

          return {
            data,
            error: this.options?.code ?? 0,
            error_msg: this.options?.message ?? undefined,
          };
        }),
      );
    }
  }

  return TransformInterceptor;
};

export const TransformInterceptor = GetTransformInterceptor({
  skipPaths: [],
});
