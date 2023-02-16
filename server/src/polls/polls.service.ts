import { Injectable, Logger } from '@nestjs/common';

import { CreatePollFields, JoinPollFields, RejoinPollFields } from './types';
import { createPollID, createUserID } from 'src/ids';
import { PollsRepository } from './polls.repository';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(poll: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollsRepository.createPoll({
      ...poll,
      userID,
      pollID,
    });

    // TODO - create an accessToken based off of pollID and userID

    return {
      poll: createdPoll,
      // accessToken
    };
  }

  async joinPoll(poll: JoinPollFields) {
    const userID = createUserID();

    this.logger.debug(
      `Fetching poll with ID: ${poll.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(poll.pollID);

    // TODO - create access Token

    return {
      poll: joinedPoll,
      // accessToken: signedString,
    };
  }

  async rejoinPoll(poll: RejoinPollFields) {
    this.logger.debug(
      `Rejoining poll with ID: ${poll.pollID} for user with ID: ${poll.userID} with name: ${poll.name}`,
    );

    const joinedPoll = await this.pollsRepository.addParticipant(poll);
    return joinedPoll;
  }
}
