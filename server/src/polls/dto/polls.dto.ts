import {
  ApiExtraModels,
  ApiProperty,
  PickType,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  topic: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  votesPerVoter: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  name: string;
}

export class JoinPollDto extends PickType(CreatePollDto, ['name']) {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  pollID: string;
}

export class RejoinPollDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class NominationDto {
  @IsString()
  @IsNotEmpty()
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
      type: 'string',
    },
  })
  participants: Participants;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(Nomination),
    },
  })
  nominations: Nominations;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'string' },
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

export class RejoinPollVo extends PickType(CreatePollVo, ['poll']) {}
