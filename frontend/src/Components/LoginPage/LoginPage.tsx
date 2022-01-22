import { RefObject } from 'preact';
import { GithubPicker } from 'react-color';
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
  LABEL_COLOR
} from '../../constants';

// During server-side-rendering, window/history cannot be accessed
const isSSR = typeof window === 'undefined';

const ProtoLoginPage = ({socket}: {socket: WebSocketApi}) => {
  const [user, setUser] = useState(socket.loginData.user);
  const [color, setColor] = useState("")
  const [colorPicker, setColorPicker] = useState(false)
  let sessionId = 'not implemented';

  function handleChange(color, event) {
    setColor(color.hex);
  }

  return (
    <div>
      <form class={classes.loginPage} onSubmit={(event) => {
          event.preventDefault();
          socket.login(user, sessionId);
        }}>
        <label for="user" class={classes.userLabel}>{LABEL_USERNAME}</label>
        <input id="user" type="text" value={user} class={classes.userInput} onInput={(event) => setUser((event.target as HTMLInputElement).value)} />
        <label for="color" class={classes.colorLabel}>{LABEL_COLOR}</label>
        <input id="color" type="text" value={color} class={classes.colorInput} onInput={(event) => setColor((event.target as HTMLInputElement).value)}  onClick={(event) => setColorPicker(!colorPicker)} />
        {colorPicker
          ? <div id="colorPicker" class={classes.colorPicker}><GithubPicker onChange={handleChange} /></div>
          : <span />
        }
        <label for="session" class={classes.sessionLabel}>{LABEL_SESSION}</label>
        <input id="session" type="text" value="1234" class={classes.sessionLink} />
        <input type="submit" value={BUTTON_LOGIN} class={classes.submit} />
      </form>

    </div>
  )
};

export const LoginPage = connectToWebSocket(ProtoLoginPage);