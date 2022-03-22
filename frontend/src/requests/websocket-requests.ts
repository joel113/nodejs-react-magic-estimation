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
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getDelElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getUpvoteElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getDownvoteElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getVoteElementRequest = (id: string, vote: Number) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });  

  export const getResetElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getAgreeElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getDisbuteElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getLockElementRequest = (id: string) =>
    buildRequest({
      type: 'changeElement',
      payload: {
        id
      },
    });

  export const getClearVotesRequest = () =>
    buildRequest({
      type: 'changeEstimation',
      payload: {},
    });

  export const getAddRoundsRequest = () =>
    buildRequest({
      type: 'changeEstimation',
      payload: {},
    });

  export const getNextRoundRequest = () =>
    buildRequest({
      type: 'changeEstimation',
      payload: {},
    });

  export const getNextUserRequest = () =>
    buildRequest({
      type: 'changeEstimation',
      payload: {},
    });

const buildRequest = (data: WebsocketMessage) => JSON.stringify({ message: 'sendmessage', data });
