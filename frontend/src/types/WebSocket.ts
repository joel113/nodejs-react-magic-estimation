export interface UserVote {
  userId: string;
  elementId: string;
  vote: number;
}

export interface ElementVote {
  id: string; votes: number;
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
  addElement(element: string): void;
  login(user: string, session: string): void;
  setVote(vote: UserVote): void;
}

export type WebSocketLoginData = { user: string; session: string };