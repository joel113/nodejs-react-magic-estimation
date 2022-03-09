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
  state: ElementState;
  constructor(id: string, votes: number, state: ElementState) {
    this.id = id;
    this.votes = votes;
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
  activeUser: String;
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
  nextUser(id: string): void;
  login(user: string, color: string, session: string): void;
  setVote(vote: UserVote): void;
}

export type WebSocketLoginData = { user: string; color: string; session: string };