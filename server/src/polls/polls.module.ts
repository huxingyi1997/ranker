import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollsRepository } from './polls.repository';
import { jwtModule, redisModule } from '../redis/modules.config';

@Module({
  imports: [ConfigModule, redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository],
})
export class PollsModule {}
