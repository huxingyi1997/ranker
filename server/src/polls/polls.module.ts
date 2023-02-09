import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PollsController],
})
export class PollsModule {}
