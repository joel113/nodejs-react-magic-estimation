import {WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageRounds = ({socket}: {socket: WebSocketApi}) => {
  return (
    <div className={classes.magicPageRoundsContainer}>
      <div className={`${classes.magicPageRoundsBox} ${classes.firstBox}`}>
        Round
      </div>
      {[...Array(socket.state.rounds)].map((_, i) => i + 1).map((i) => {
        if (socket.state.roundsActive == i) {
          return <div
            className={`${classes.magicPageRoundsBox} ${classes.activeBox}`}>
            <div className={classes.magicPageRoundsName}>{i}</div>
          </div>
        } else {
          return <div
            className={`${classes.magicPageRoundsBox} ${classes.nonactiveBox}`}>
            {i}
          </div>
        }
      })}
      <div
        className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}
        onClick={() => {
          socket.nextRound()
        }}>Next Round</div>
      <div
        className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}
        onClick={() => {
          socket.addRound()
        }}>Add Round</div>
    </div>
  )
};

export const MagicPageRounds = connectToWebSocket(ProtoMagicPageRounds);
