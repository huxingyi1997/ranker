import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { PollsService } from './polls.service';
import {
  CreatePollDto,
  CreatePollVo,
  JoinPollDto,
  JoinPollVo,
  RejoinPollDto,
  RejoinPollVo,
} from './dto/polls.dto';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';
import { ApiUnifiedCreatedResponse } from 'src/utils';

@ApiTags('polls')
@UsePipes(new ValidationPipe())
@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Post()
  @ApiUnifiedCreatedResponse(CreatePollVo)
  create(@Body() createPollDto: CreatePollDto): Promise<CreatePollVo> {
    return this.pollsService.createPoll(createPollDto);
  }

  @Post('/join')
  @ApiUnifiedCreatedResponse(JoinPollVo)
  async join(@Body() joinPollDto: JoinPollDto): Promise<JoinPollVo> {
    return this.pollsService.joinPoll(joinPollDto);
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  @ApiUnifiedCreatedResponse(RejoinPollVo)
  @ApiBody({ type: RejoinPollDto })
  async rejoin(@Req() request: RequestWithAuth): Promise<RejoinPollVo> {
    const { userID, pollID, name } = request;
    return this.pollsService.rejoinPoll({
      userID,
      pollID,
      name,
    });
  }
}
