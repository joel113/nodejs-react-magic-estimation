import {GithubPicker} from 'react-color';
import {useEffect, useState} from 'preact/hooks';
import {WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './LoginPage.module.css';
import {
  BUTTON_LOGIN,
  LABEL_SESSION,
  LABEL_USERNAME,
  LABEL_COLOR,
} from '../../constants';

// During server-side-rendering, window/history cannot be accessed
const isSSR = typeof window === 'undefined';

const ProtoLoginPage = ({socket}: { socket: WebSocketApi }) => {
  const [user, setUser] = useState(socket.loginData.user)
  const [color, setColor] = useState(socket.loginData.color)
  const [colorPicker, setColorPicker] = useState(false)
  const [sessionId, setSessionId] = useState('')

  /**
   * Generates a random alphanumerical id as string of predefined length
   * @param {num} length predefined length
   * @return {string} the random alphanumerical id as string
   */
  function generateId(length: number): string {
    const mask =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += mask[Math.round(Math.random() * (mask.length - 1))];
    }
    return result;
  }

  let sessionIdPassedOrGenerated = sessionId

  if (!isSSR) {
    sessionIdPassedOrGenerated = new URLSearchParams(window.location.search)
        .get('sessionId') || '';
    if (!sessionIdPassedOrGenerated.match(/^[a-zA-Z0-9]{8}$/i)) {
      sessionIdPassedOrGenerated = generateId(8);
      history.replaceState({}, 'Magic Estimation',
          `?sessionId=${sessionIdPassedOrGenerated}`);
    }
  }

  // disappears the color picker after rendering if the color picker is not
  // clicked
  useEffect(() => {
    const target = document.querySelector('#color')
    if (target != null) {
      document.addEventListener('click', (event) => {
        const withinBoundaries = event.composedPath().includes(target)
        if (!withinBoundaries) {
          setColorPicker(false)
        }
      })
    }
  })

  return (
    <div>
      <form className={classes.loginPage} onSubmit={(event) => {
        event.preventDefault();
        socket.login(user, color, sessionIdPassedOrGenerated);
      }}>
        <label htmlFor="user" className={classes.userLabel}>
          {LABEL_USERNAME}
        </label>
        <input id="user" type="text" value={user} className={classes.userInput}
          required
          autoComplete="off"
          onChange={
            (event) => setUser((event.target as HTMLInputElement).value)
          } />
        <label htmlFor="color" className={classes.colorLabel}>
          {LABEL_COLOR}
        </label>
        <input id="color"
          type="text"
          value={color}
          style={{backgroundColor: color}}
          className={classes.colorInput}
          required
          autoComplete="off"
          pattern="^#[0-9a-f]{6}$"
          placeholder="#abcde0"
          onChange={
            (event) => {
              setColor((event.target as HTMLInputElement).value);
            }
          }
          onClick={(event) => setColorPicker(!colorPicker)} />
        {
          colorPicker == true &&
          <div id="colorPicker" className={classes.colorPicker}>
            <GithubPicker onChange={
              (color, event) => {
                setColor(color.hex);
              }} />
          </div>
        }
        <label htmlFor="session" className={classes.sessionLabel}>
          {LABEL_SESSION}
        </label>
        <input id="session"
          type="text"
          value={sessionIdPassedOrGenerated}
          className={classes.sessionLink}
          onChange={(event) => {
            setSessionId((event.target as HTMLInputElement).value)
          }} />
        <input type="submit" value={BUTTON_LOGIN} className={classes.submit} />
      </form>

    </div>
  )
};

export const LoginPage = connectToWebSocket(ProtoLoginPage);
