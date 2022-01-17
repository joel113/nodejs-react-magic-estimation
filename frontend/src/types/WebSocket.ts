export class UserVote {
  userId: string;
  elementId: string;
  vote: number;
  constructor(userId: string, elementId: string, vote: number) {
    this.userId = userId;
    this.elementId = elementId;
    this.vote = vote;
  }
}


export class ElementVote {
  id: string;
  votes: number;
  constructor(id: string, votes: number) {
    this.id = id;
    this.votes = votes;
  }
}

export interface WebSocketState {
  elementVotes: Array<ElementVote>;
  userVotes: Array<UserVote>;
}

export interface WebSocketApi {
  connected: boolean;
  state: WebSocketState;
  loginData: WebSocketLoginData;
  loggedIn: boolean;
  addElement(id: string): void;
  delElement(id: string): void;
  upvoteElement(id: string): void;
  downvoteElement(id: string): void;
  clearVotes(): void;
  login(user: string, session: string): void;
  setVote(vote: UserVote): void;
}

export type WebSocketLoginData = { user: string; session: string };