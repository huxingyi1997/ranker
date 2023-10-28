import {
  ApiExtraModels,
  ApiProperty,
  PickType,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @Length(1, 100)
  topic: string;

  @IsInt()
  @Min(1)
  @Max(5)
  votesPerVoter: number;

  @IsString()
  @Length(1, 25)
  name: string;
}

export class JoinPollDto extends PickType(CreatePollDto, ['name']) {
  @IsString()
  @Length(6, 6)
  pollID: string;

  @IsString()
  @Length(1, 25)
  name: string;
}

export class NominationDto {
  @IsString()
  @Length(1, 100)
  text: string;
}

export class Participants {
  [participantID: string]: string;
}

export class Nomination {
  userID: string;
  text: string;
}

type NominationID = string;

export class Nominations {
  [nominationID: NominationID]: Nomination;
}

export class Rankings {
  [userID: string]: NominationID[];
}

export class AddNominationData {
  pollID: string;
  nominationID: string;
  nomination: Nomination;
}

export class Result {
  nominationID: NominationID;
  nominationText: string;
  score: number;
}

@ApiExtraModels(Nomination)
export class Poll {
  id: string;

  topic: string;

  votesPerVoter: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
    },
  })
  participants: Participants;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      additionalProperties: {
        $ref: getSchemaPath(Nomination),
      },
    },
  })
  nominations: Nominations;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'string' },
      },
    },
  })
  rankings: Rankings;

  results: Result[];

  adminID: string;

  hasStarted: boolean;
}

export class CreatePollVo {
  poll: Poll;

  accessToken: string;
}

export class JoinPollVo extends CreatePollVo {}
