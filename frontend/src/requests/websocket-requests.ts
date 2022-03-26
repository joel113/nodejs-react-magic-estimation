import { WebsocketMessage } from '../types/WebSocket';

export const getLoginRequest = (user: string, color: string, session: string) =>
  buildRequest({
    type: 'login',
    payload: {
      user,
      color,
      session
    },
  });

  export const getAddElementRequest = (id: string) =>
    buildRequest({
      type: 'addElement',
      payload: {
        id
      },
    });

  export const getDelElementRequest = (id: string) =>
    buildRequest({
      type: 'delElement',
      payload: {
        id
      },
    });

  export const getUpvoteElementRequest = (id: string) =>
    buildRequest({
      type: 'upvoteElement',
      payload: {
        id
      },
    });

  export const getDownvoteElementRequest = (id: string) =>
    buildRequest({
      type: 'downvoteElement',
      payload: {
        id
      },
    });

  export const getVoteElementRequest = (id: string, vote: Number) =>
    buildRequest({
      type: 'voteElement',
      payload: {
        id
      },
    });  

  export const getResetElementRequest = (id: string) =>
    buildRequest({
      type: 'resetElement',
      payload: {
        id
      },
    });

  export const getAgreeElementRequest = (id: string) =>
    buildRequest({
      type: 'agreeElement',
      payload: {
        id
      },
    });

  export const getDisbuteElementRequest = (id: string) =>
    buildRequest({
      type: 'disbuteElement',
      payload: {
        id
      },
    });

  export const getLockElementRequest = (id: string) =>
    buildRequest({
      type: 'lockElement',
      payload: {
        id
      },
    });

  export const getClearVotesRequest = () =>
    buildRequest({
      type: 'clearVotes',
      payload: {},
    });

  export const getAddRoundsRequest = () =>
    buildRequest({
      type: 'addRounds',
      payload: {},
    });

  export const getNextRoundRequest = () =>
    buildRequest({
      type: 'nextRound',
      payload: {},
    });

const buildRequest = (data: WebsocketMessage) => JSON.stringify({ message: 'sendmessage', data });
