import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  private readonly logger = new Logger(ControllerAuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    this.logger.debug(`Checking for auth token on request body`, request.body);

    const { accessToken } = request.body;

    if (!accessToken) {
      throw new ForbiddenException('No authorization token provided');
    }

    this.logger.debug(`Validating auth token: ${accessToken}`);

    // validate JWT Token
    try {
      const payload = this.jwtService.verify(accessToken);
      // append user and poll to socket
      request.userID = payload.sub;
      request.pollID = payload.pollID;
      request.name = payload.name;
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
