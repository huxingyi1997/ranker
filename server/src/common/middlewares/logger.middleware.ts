import {
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
  Type,
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { isPathMatch } from '../../utils';
import { helloPath } from '../../constants';
import { RequestWithAuth } from 'src/polls/types';

export interface ILoggerOptions {
  skipPaths?: string[];
  skipHeadersPaths?: string[];
  skipBodyPaths?: string[];
}

export const GetLoggerMiddleware = (
  options: ILoggerOptions = {},
): Type<NestMiddleware> => {
  @Injectable()
  class LoggerMiddleware implements NestMiddleware {
    private options: ILoggerOptions;
    constructor(
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
      this.options = options;
    }

    async use(
      req: Request | RequestWithAuth,
      res: Response,
      next: NextFunction,
    ) {
      const { originalUrl: uri, method, ip } = req;
      const logPath = uri?.split('?')[0];
      // handle skipPaths
      if (isPathMatch(this.options?.skipPaths, logPath)) {
        return next();
      }

      const startTime = Date.now();
      next();

      const { userID, pollID, name } = req as RequestWithAuth;
      const { statusCode: code } = res; // 响应状态码
      const endTime = Date.now();
      const body = isPathMatch(this.options?.skipBodyPaths, logPath)
        ? ''
        : JSON.stringify(req.body);

      // 组装日志信息
      const info = {
        uri,
        method,
        ip,
        code,
        cost: endTime - startTime,
        params: JSON.stringify(req.params),
        query: JSON.stringify(req.query),
        body,
        userID,
        pollID,
        name,
      };

      // 根据状态码，进行日志类型区分
      if (code >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error('route-server-error', info);
      } else if (code >= HttpStatus.BAD_REQUEST) {
        this.logger.warn('route-client-error', info);
      } else {
        this.logger.info('route-success', info);
      }
    }
  }

  return LoggerMiddleware;
};

export const LoggerMiddleware = GetLoggerMiddleware({
  skipPaths: [helloPath],
});
