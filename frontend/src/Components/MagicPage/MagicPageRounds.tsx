import { UserVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageRounds = ({socket}: {socket: WebSocketApi}) => {
    return (
        <div class={classes.magicPageRoundsContainer}>
            <div className={`${classes.magicPageRoundsBox} ${classes.firstBox}`}>Round</div>
            {[...Array(socket.state.maxRounds)].map(i => {
                if(socket.state.activeRound == i) {
                    <div className={`${classes.magicPageRoundsBox} ${classes.activeBox}`}><div class={classes.magicPageRoundsName}>i</div></div>
                }
                else {
                    <div className={`${classes.magicPageRoundsBox} ${classes.nonactiveBox}`}>i</div>
                }
            })}     
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}>Next Round</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}>Add Round</div>
        </div>
    )
};

export const MagicPageRounds = connectToWebSocket(ProtoMagicPageRounds);