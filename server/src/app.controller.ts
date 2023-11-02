import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { AppService } from './app.service';
import { helloPath } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(helloPath)
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
}
