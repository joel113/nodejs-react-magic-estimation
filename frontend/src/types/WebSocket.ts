/**
 * Represents the elements to be voted
 */
export class Elements {
  id: string;
  votes: number;
  votesround: number;
  state: ElementState;

  /**
   * Constructs an element
   * @param {string} id of the element
   * @param {number} votes number of votes
   * @param {number} votesround number of votes in the current round
   * @param {ElementState} state state of the element
   */
  constructor(id: string,
      votes: number,
      votesRound: number,
      state: ElementState) {
    this.id = id;
    this.votes = votes;
    this.votesround = votesRound;
    this.state = state;
  }
}

export enum ElementState {
  // eslint-disable-next-line no-unused-vars
  Ongoing,
  // eslint-disable-next-line no-unused-vars
  Disbuted,
  // eslint-disable-next-line no-unused-vars
  Agreed,
  // eslint-disable-next-line no-unused-vars
  Locked
}

/**
 * Represents the votes of a user to an element
 */
export class Votes {
  userid: string;
  usercolor: string;
  elementid: string;
  vote: number;

  /**
   * Constructs a vote
   * @param {string} userId of the vote
   * @param {userColor} usercolor of the user giving the vote
   * @param {string} elementid of the vote
   * @param {number} vote number of the votes
   */
  constructor(userId: string,
      userColor: string,
      elementId: string,
      vote: number) {
    this.userid = userId;
    this.usercolor = userColor;
    this.elementid = elementId;
    this.vote = vote;
  }
}

export interface WebSocketApi {
  connected: boolean;
  state: WebSocketState;
  loginData: WebSocketLoginData;
  loggedIn: boolean;
  addElement(element: string, elementState: number, votes: number,
    votesRound: number): void;
  updateElement(element: string, elementState: number, votes: number,
    votesRound: number, vote: number): void;
  delElement(element: string): void;
  clearVotes(): void;
  addRound(): void;
  nextRound(): void;
  login(user: string, color: string, sessionId: string): void;
}

export interface WebSocketState {
  elementVotes: Array<Elements>;
  userVotes: Array<Votes>;
  rounds: number;
  roundsActive: number;
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
  | UpdateElementMessage
  | DelElementMessage
  | AddVoteMessage
  | UpdateVoteMessage
  | RemoveVoteMessage
  | ClearVotesMessage
  | InitRoundsMessage
  | AddRoundsMessage
  | NextRoundMessage
  | FullstateMessage


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
    state: number;
  };
}


export interface UpdateElementMessage {
  type: 'updateElement';
  payload: {
    session: string;
    element: string;
    state: number;
    votes: number;
    votesround: number;
  };
}

export interface DelElementMessage {
  type: 'delElement';
  payload: {
    session: string;
    element: string;
  };
}

export interface AddVoteMessage {
  type: 'addVote';
  payload: {
    session: string;
    element: string;
    user: string;
    color: string;
  };
}

export interface UpdateVoteMessage {
  type: 'updateVote';
  payload: {
    session: string;
    element: string;
    user: string;
    color: string;
    votes: number;
  };
}

export interface RemoveVoteMessage {
  type: 'removeVote';
  payload: {
    session: string;
    element: string;
    user: string;
    color: string;
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

export interface FullstateMessage {
  type: 'fullstate';
  payload: {
    session: string;
  };
}

export type WebSocketLoginData = {
  user: string;
  color: string;
  sessionId: string };
