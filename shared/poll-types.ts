export interface Participants {
  [participantID: string]: string;
}

export type Nomination = {
  userID: string;
  text: string;
};

export type Nominations = {
  [nominationID: string]: Nomination;
};

export type AddNominationData = {
  pollID: string;
  nominationID: string;
  nomination: Nomination;
};

export interface Poll {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  nominations: Nominations;
  // rankings: Rankings;
  // results: Results;
  hasStarted: boolean;
}
