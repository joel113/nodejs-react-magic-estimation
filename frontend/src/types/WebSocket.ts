export interface UserVote {
  userId: string;
  elementId: string;
  vote: number;
}

export class ElementVote {
  id: string;
  votes: number;
  constructor(id: string, votes: number) {
    this.id = id;
    this.votes = votes;
  }
}

export interface UserVotes {
  [userId: string]: number;
  }

export interface WebSocketState {
  elementVotes: Array<ElementVote>;
  userVotes: UserVotes;
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
  login(user: string, session: string): void;
  setVote(vote: UserVote): void;
}

export type WebSocketLoginData = { user: string; session: string };