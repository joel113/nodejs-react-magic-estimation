import { WebsocketMessage } from '../types/WebSocket';

export const getLoginRequest = (user: string, color: string, session: string) =>
  buildRequest({
    type: 'login',
    payload: {
      user,
      session,
    },
  });

const buildRequest = (data: WebsocketMessage) => JSON.stringify({ message: 'sendmessage', data });
