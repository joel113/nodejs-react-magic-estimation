import { WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './Footer.module.css';
import sharedClasses from '../../styles.module.css'

const SessionComponent = ({ socket }: { socket: WebSocketApi }) => (
  <footer class={classes.footer}>
    <div class={classes.sessionInfo}>
      <span class={classes.infoItem}>
          Session: {socket.loginData.sessionId}
      </span>
      <span class={classes.infoItem}>
          Name: {socket.loginData.user}
      </span>
    </div>
    <div class={classes.magicPageAddElements}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    socket.clearVotes();
                }} class={classes.magicPageAddElementsForm}>
                    <input id="submit" type="submit" class={sharedClasses.button} value="Copy Session Link"
                        style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
                </form>
            </div>
  </footer>
)

export const Session = connectToWebSocket(SessionComponent);
