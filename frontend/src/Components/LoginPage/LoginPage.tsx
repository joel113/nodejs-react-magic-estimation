import { RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import { generateId } from './generateId';
import classes from './LoginPage.module.css';
import {
  BUTTON_CONNECTING,
  BUTTON_LOGIN,
  LABEL_SESSION,
  LABEL_USERNAME,
} from '../../constants';

// During server-side-rendering, window/history cannot be accessed
const isSSR = typeof window === 'undefined';

const ProtoLoginPage = ({socket}: {socket: WebSocketApi}) => {
  const [user, setUser] = useState(socket.loginData.user);
  let sessionId = 'not implemented';

  return (
    <form class={classes.loginPage} onSubmit={(event) => {
        event.preventDefault();
        socket.login(user, sessionId);
      }}>
      <label for="user" class={classes.userLabel}>{LABEL_USERNAME}</label>
      <input id="user" type="text" value={user} class={classes.userInput} onInput={(event) => setUser((event.target as HTMLInputElement).value)} />
      <label for="session" class={classes.sessionLabel}>{LABEL_SESSION}</label>
      <a id="session" href={`?sessionId=${sessionId}`} class={classes.sessionLink}>{sessionId}</a>
      <input type="submit" value={BUTTON_LOGIN} class={classes.submit} />
    </form>
  )
};

export const LoginPage = connectToWebSocket(ProtoLoginPage);
