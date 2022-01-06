export interface UserVote {
  userId: string;
  elementId: string;
  vote: number;
}

export interface ElementVotes {
  [elementId: string]: number;
}

export interface UserVotes {
  [userId: string]: number;
  }

export interface WebSocketState {
  elementVotes: ElementVotes;
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