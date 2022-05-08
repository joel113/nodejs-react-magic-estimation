import { Votes, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageRounds = ({socket}: {socket: WebSocketApi}) => {
    return (
        <div class={classes.magicPageRoundsContainer}>
            <div className={`${classes.magicPageRoundsBox} ${classes.firstBox}`}>Round</div>
            {[...Array(socket.state.maxRounds)].map((_, i) => i + 1).map(i => {
                if(socket.state.activeRound == i) {
                    return <div className={`${classes.magicPageRoundsBox} ${classes.activeBox}`}><div class={classes.magicPageRoundsName}>{i}</div></div>
                }
                else  {
                    return <div className={`${classes.magicPageRoundsBox} ${classes.nonactiveBox}`}>{i}</div>
                }
            })}
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`} onClick={() => {socket.nextRound()}}>Next Round</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`} onClick={() => {socket.addRound()}}>Add Round</div>
        </div>
    )
};

export const MagicPageRounds = connectToWebSocket(ProtoMagicPageRounds);