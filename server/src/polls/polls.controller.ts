import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PollsService } from './polls.service';
import { CreatePollDto, JoinPollDto } from './dtos';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';

@UsePipes(new ValidationPipe())
@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.createPoll(createPollDto);
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { userID, pollID, name } = request;
    const rejoinPollResponse = await this.pollsService.rejoinPoll({
      userID,
      pollID,
      name,
    });

    return {
      poll: rejoinPollResponse,
    };
  }
}
