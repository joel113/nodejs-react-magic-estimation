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
  addElement(element: string): void;
  delElement(element: string): void;
  resetElement(element: string): void;
  agreeElement(element: string): void;
  disbuteElement(element: string): void;
  lockElement(element: string): void;
  upvoteElement(element: string): void;
  downvoteElement(element: string): void;
  clearVotes(): void;
  addRound(): void;
  nextRound(): void;
  login(user: string, color: string, sessionId: string): void;
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
  | OngoingElementMessage
  | ClearVotesMessage
  | InitRoundsMessage
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
    session: string;
    element: string;
  };
}

export interface DelElementMessage {
  type: 'delElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface UpvoteElementMessage {
  type: 'upvoteElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface DownvoteElementMessage {
  type: 'downvoteElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface VoteElementMessage {
  type: 'voteElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface ResetElementMessage {
  type: 'resetElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface AgreeElementMessage {
  type: 'agreeElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface DisbuteElementMessage {
  type: 'disbuteElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface LockElementMessage {
  type: 'lockElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface OngoingElementMessage {
  type: 'ongoingElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface ClearVotesMessage {
  type: 'clearVotes';
  payload: {
    session: string;
  };
}

export interface InitRoundsMessage {
  type: 'initRounds';
  payload: {
    session: string;
  };
}

export interface AddRoundsMessage {
  type: 'addRound';
  payload: {
    session: string;
  };
}

export interface NextRoundMessage {
  type: 'nextRound';
  payload: {
    session: string;
  };
}

export type WebSocketLoginData = { user: string; color: string; sessionId: string };