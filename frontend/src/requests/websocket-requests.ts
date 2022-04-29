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

  export const getAddElementRequest = (session_id: string, element_id: string) =>
    buildRequest({
      type: 'addElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getDelElementRequest = (session_id: string, element_id: string) =>
    buildRequest({
      type: 'delElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getUpvoteElementRequest = (session_id: string, element_id: string) =>
    buildRequest({
      type: 'upvoteElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getDownvoteElementRequest = (session_id: string, element_id: string) =>
    buildRequest({
      type: 'downvoteElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getResetElementRequest = (session_id: string, element_id: string,) =>
    buildRequest({
      type: 'resetElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getAgreeElementRequest = (session_id: string, element_id: string,) =>
    buildRequest({
      type: 'agreeElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getDisbuteElementRequest = (session_id: string, element_id: string,) =>
    buildRequest({
      type: 'disbuteElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getLockElementRequest = (session_id: string, element_id: string,) =>
    buildRequest({
      type: 'lockElement',
      payload: {
        session_id,
        element_id
      },
    });

  export const getClearVotesRequest = (session_id: string) =>
    buildRequest({
      type: 'clearVotes',
      payload: {
        session_id
      },
    });

  export const getAddRoundsRequest = (session_id: string) =>
    buildRequest({
      type: 'addRounds',
      payload: {
        session_id
      },
    });

  export const getNextRoundRequest = (session_id: string) =>
    buildRequest({
      type: 'nextRound',
      payload: {
        session_id
      },
    });

const buildRequest = (data: WebsocketMessage) => JSON.stringify({ message: 'sendmessage', data });
