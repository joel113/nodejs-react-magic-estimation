export class UserVote {
  userId: string;
  userColor: string;
  elementId: string;
  vote: number;
  constructor(userId: string, userColor: string, elementId: string, vote: number) {
    this.userId = userId;
    this.userColor = userColor;
    this.elementId = elementId;
    this.vote = vote;
  }
}

export enum ElementState {
  Ongoing,
  Disbuted,
  Agreed,
  Locked
}

export class ElementVote {
  id: string;
  votes: number;
  votesRound: number;
  state: ElementState;
  constructor(id: string, votes: number, votesRound: number, state: ElementState) {
    this.id = id;
    this.votes = votes;
    this.votesRound = votesRound;
    this.state = state;
  }
}

export class VotingRound {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

export class VotingUser {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export interface WebSocketState {
  elementVotes: Array<ElementVote>;
  userVotes: Array<UserVote>;
  maxRounds: number;
  activeRound: number;
}

export interface WebSocketApi {
  connected: boolean;
  state: WebSocketState;
  loginData: WebSocketLoginData;
  loggedIn: boolean;
  addElement(id: string): void;
  delElement(id: string): void;
  resetElement(id: string): void;
  agreeElement(id: string): void;
  disbuteElement(id: string): void;
  lockElement(id: string): void;
  upvoteElement(id: string): void;
  downvoteElement(id: string): void;
  clearVotes(): void;
  addRound(): void;
  nextRound(): void;
  login(user: string, color: string, session: string): void;
}

export interface StateMessage {
  type: 'state';
  payload: WebSocketState;
}

export interface NotLoggedInMessage {
  type: 'not-logged-in';
}

export type WebsocketMessage =
  | StateMessage
  | NotLoggedInMessage
  | LoginMessage
  | AddElementMessage
  | DelElementMessage
  | UpvoteElementMessage
  | DownvoteElementMessage
  | VoteElementMessage
  | ResetElementMessage
  | AgreeElementMessage
  | DisbuteElementMessage
  | LockElementMessage
  | ClearVotesMessage
  | AddRoundsMessage
  | NextRoundMessage


export interface LoginMessage {
  type: 'login';
  payload: {
    user: string;
    color: string;
    session: string;
  };
}

export interface AddElementMessage {
  type: 'addElement';
  payload: {
    id: string;
  };
}

export interface DelElementMessage {
  type: 'delElement';
  payload: {
    id: string;
  };
}

export interface UpvoteElementMessage {
  type: 'upvoteElement';
  payload: {
    id: string;
  };
}

export interface DownvoteElementMessage {
  type: 'downvoteElement';
  payload: {
    id: string;
  };
}

export interface VoteElementMessage {
  type: 'voteElement';
  payload: {
    id: string;
  };
}

export interface ResetElementMessage {
  type: 'resetElement';
  payload: {
    id: string;
  };
}

export interface AgreeElementMessage {
  type: 'agreeElement';
  payload: {
    id: string;
  };
}

export interface DisbuteElementMessage {
  type: 'disbuteElement';
  payload: {
    id: string;
  };
}

export interface LockElementMessage {
  type: 'lockElement';
  payload: {
    id: string;
  };
}

export interface ClearVotesMessage {
  type: 'clearVotes';
  payload: {};
}

export interface AddRoundsMessage {
  type: 'addRounds';
  payload: {};
}

export interface NextRoundMessage {
  type: 'nextRound';
  payload: {};
}

export type WebSocketLoginData = { user: string; color: string; session: string };