import {WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './Footer.module.css';
import sharedClasses from '../../styles.module.css'

const SessionComponent = ({socket}: { socket: WebSocketApi }) => (
  <footer className={classes.footer}>
    <div className={classes.sessionInfo}>
      <span className={classes.infoItem}>
          Session: {socket.loginData.sessionId}
      </span>
      <span className={classes.infoItem}>
          Name: {socket.loginData.user}
      </span>
    </div>
    <div>
      <form onSubmit={(event) => {
        event.preventDefault();
      }}>
        <input id="submit" type="submit"
          className={sharedClasses.button}
          value="Copy Session Link"
          onClick={() => navigator.clipboard.writeText(`${location.href}`)} />
      </form>
    </div>
  </footer>
)

export const Session = connectToWebSocket(SessionComponent);
