import {WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import sharedClasses from '../../styles.module.css'
import {MagicPageSomeElements} from './MagicPageSomeElements';
import {MagicPageNoElements} from './MagicPageNoElements';
import {MagicPageSomeVotes} from './MagicPageSomeVotes';
import {MagicPageNoVotes} from './MagicPageNoVotes';
import {MagicPageRounds} from './MagicPageRounds';
import {ElementState} from '../../types/WebSocket';

const ProtoMagicPage = ({socket}: { socket: WebSocketApi }) => {
  let newElement = '';
  return (
    <div className={classes.magicPage}>
      <div className={classes.magicPageElements}>
        {Object.keys(socket.state.elementVotes).length > 0 ?
          <MagicPageSomeElements /> :
          <MagicPageNoElements />
        }
      </div>
      <div className={classes.magicPageAddElements}>
        <form onSubmit={(event) => {
          event.preventDefault();
          socket.addElement(newElement, ElementState.Ongoing, 0, 0);
        }} className={classes.magicPageAddElementsForm}>
          <input id="newElement"
            type="text"
            className={sharedClasses.text}
            value={newElement}
            autoComplete="off"
            onInput={
              (event) => newElement = ((event.target as HTMLInputElement).value)
            } />
          <input id="submit"
            type="submit"
            className={sharedClasses.button}
            value="Add"
            style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
        </form>
      </div>
      <div className={classes.magicPageRounds}>
        <MagicPageRounds />
      </div>
      <div className={classes.magicPageUsers}>
        {Object.keys(socket.state.userVotes).length > 0 ?
          <MagicPageSomeVotes /> :
          <MagicPageNoVotes />
        }
      </div>
      <div className={classes.magicPageAddElements}>
        <form onSubmit={(event) => {
          event.preventDefault();
          socket.clearVotes();
        }} className={classes.magicPageAddElementsForm}>
          <input id="submit"
            type="submit"
            className={sharedClasses.button}
            value="Reset"
            style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
        </form>
      </div>
    </div>
  )
};

export const MagicPage = connectToWebSocket(ProtoMagicPage);
