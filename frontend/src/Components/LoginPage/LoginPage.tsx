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

const ProtoLoginPage = ({ socket }: { socket: WebSocketApi }) => {
  const [user, setUser] = useState(socket.loginData.user);
  const [color, setColor] = useState(socket.loginData.color)
  const [colorPicker, setColorPicker] = useState(false)
  const [sessionId, setSessionId] = useState(generateId(8))

  const target = document.querySelector('#color')
  if (target != null) {
    document.addEventListener('click', (event) => {
      const withinBoundaries = event.composedPath().includes(target)
      if (!withinBoundaries) {
        setColorPicker(false)
      }
    })
  }

  function updateColor(color: string) {
    var element = document.getElementById("color")
    if (element != null) {
      element.style.backgroundColor = color
    }
  }

  return (
    <div>
      <form class={classes.loginPage} onSubmit={(event) => {
        event.preventDefault();
        socket.login(user, color, sessionId);
      }}>
        <label for="user" class={classes.userLabel}>{LABEL_USERNAME}</label>
        <input id="user" type="text" value={user} class={classes.userInput}
          required
          autocomplete="off"
          onChange={(event) => setUser((event.target as HTMLInputElement).value)} />
        <label for="color" class={classes.colorLabel}>{LABEL_COLOR}</label>
        <input id="color" type="text" value={color} class={classes.colorInput} 
          required
          autocomplete="off"
          pattern="^#[0-9a-f]{6}$"
          placeholder="#abcde0"
          onChange={
            (event) => {
              setColor((event.target as HTMLInputElement).value);
              updateColor(color);
            }
          } 
          onClick={(event) => setColorPicker(!colorPicker)} />
        {
          colorPicker == true && 
          <div id="colorPicker" class={classes.colorPicker}>
            <GithubPicker onChange={
              (color, event) => {
                setColor(color.hex);
                updateColor(color.hex)
              }} />
            </div>
        }
        <label for="session" class={classes.sessionLabel}>{LABEL_SESSION}</label>
        <input id="session" type="text" value="{sessionId}" class={classes.sessionLink} />
        <input type="submit" value={BUTTON_LOGIN} class={classes.submit} />
      </form>

    </div>
  )
};

export const LoginPage = connectToWebSocket(ProtoLoginPage);