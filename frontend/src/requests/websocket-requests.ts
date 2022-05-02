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

  export const getAddElementRequest = (session: string, element: string) =>
    buildRequest({
      type: 'addElement',
      payload: {
        session,
        element
      },
    });

  export const getDelElementRequest = (session: string, element: string) =>
    buildRequest({
      type: 'delElement',
      payload: {
        session,
        element
      },
    });

  export const getUpvoteElementRequest = (session: string, element: string) =>
    buildRequest({
      type: 'upvoteElement',
      payload: {
        session,
        element
      },
    });

  export const getDownvoteElementRequest = (session: string, element: string) =>
    buildRequest({
      type: 'downvoteElement',
      payload: {
        session,
        element
      },
    });

  export const getResetElementRequest = (session: string, element: string,) =>
    buildRequest({
      type: 'resetElement',
      payload: {
        session,
        element
      },
    });

  export const getAgreeElementRequest = (session: string, element: string,) =>
    buildRequest({
      type: 'agreeElement',
      payload: {
        session,
        element
      },
    });

  export const getDisbuteElementRequest = (session: string, element: string,) =>
    buildRequest({
      type: 'disbuteElement',
      payload: {
        session,
        element
      },
    });

  export const getLockElementRequest = (session: string, element: string,) =>
    buildRequest({
      type: 'lockElement',
      payload: {
        session,
        element
      },
    });

  export const getOngoingElementRequest = (session: string, element: string,) =>
    buildRequest({
      type: 'ongoingElement',
      payload: {
        session,
        element
      },
    });

  export const getClearVotesRequest = (session: string) =>
    buildRequest({
      type: 'clearVotes',
      payload: {
        session
      },
    });

  export const getInitRoundsRequest = (session: string) =>
    buildRequest({
      type: 'initRounds',
      payload: {
        session
      },
    });  

  export const getAddRoundRequest = (session: string) =>
    buildRequest({
      type: 'addRound',
      payload: {
        session
      },
    });

  export const getNextRoundRequest = (session: string) =>
    buildRequest({
      type: 'nextRound',
      payload: {
        session
      },
    });

const buildRequest = (data: WebsocketMessage) => JSON.stringify(data);
