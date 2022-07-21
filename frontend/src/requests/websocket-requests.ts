import {WebsocketMessage} from '../types/WebSocket';

export const getLoginRequest = (user: string, color: string, session: string) =>
  buildRequest({
    type: 'login',
    payload: {
      user,
      color,
      session,
    },
  });

export const getAddElementRequest = (session: string,
  element: string,
  state: number) =>
  buildRequest({
    type: 'addElement',
    payload: {
      session,
      element,
      state,
    },
  });

  export const getUpdateElementRequest = (session: string,
    element: string,
    state: number,
    votes: number,
    votesround: number) =>
  buildRequest({
    type: 'updateElement',
    payload: {
      session,
      element,
      state,
      votes,
      votesround
    },
  });

export const getDelElementRequest = (session: string, element: string) =>
  buildRequest({
    type: 'delElement',
    payload: {
      session,
      element,
    },
  });

export const getAddVoteRequest = (session: string,
    element: string,
    user: string,
    color: string) =>
  buildRequest({
    type: 'addVote',
    payload: {
      session,
      element,
      user,
      color,
    },
  });

export const getUpdateVoteRequest = (session: string,
    element: string,
    user: string,
    votes: number,
    color: string) =>
  buildRequest({
    type: 'updateVote',
    payload: {
      session,
      element,
      user,
      color,
      votes,
    },
  });

export const getRemoveVoteRequest = (session: string,
    element: string,
    user: string,
    color: string) =>
  buildRequest({
    type: 'removeVote',
    payload: {
      session,
      element,
      user,
      color,
    },
  });

export const getClearVotesRequest = (session: string) =>
  buildRequest({
    type: 'clearVotes',
    payload: {
      session,
    },
  });

export const getInitRoundsRequest = (session: string) =>
  buildRequest({
    type: 'initRounds',
    payload: {
      session,
    },
  });

export const getAddRoundRequest = (session: string) =>
  buildRequest({
    type: 'addRound',
    payload: {
      session,
    },
  });

export const getNextRoundRequest = (session: string) =>
  buildRequest({
    type: 'nextRound',
    payload: {
      session,
    },
  });

export const getFullstateRequest = (session: string) =>
  buildRequest({
    type: 'fullstate',
    payload: {
      session,
    },
  });

const buildRequest = (data: WebsocketMessage) => JSON.stringify(data);
