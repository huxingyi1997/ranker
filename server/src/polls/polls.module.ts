import { Module } from '@nestjs/common';

import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollsRepository } from './polls.repository';
import { PollsGateway } from './polls.gateway';
import { jwtModule, redisModule } from '../redis/modules.config';

@Module({
  imports: [redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository, PollsGateway],
})
export class PollsModule {}
