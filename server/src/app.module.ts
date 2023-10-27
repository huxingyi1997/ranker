import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PollsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
