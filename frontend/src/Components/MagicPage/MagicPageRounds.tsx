import { UserVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageRounds = ({socket}: {socket: WebSocketApi}) => {
    return (
        <div class={classes.magicPageRoundsContainer}>
            <div className={`${classes.magicPageRoundsBox} ${classes.firstBox}`}>Round</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.activeBox}`}><div class={classes.magicPageRoundsName}>One</div></div>
            <div className={`${classes.magicPageRoundsBox} ${classes.nonactiveBox}`}>Two</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.nonactiveBox}`}>Three</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}>Next Round</div>
            <div className={`${classes.magicPageRoundsBox} ${classes.controlBox}`}>Add Round</div>
        </div>
    )
};

export const MagicPageRounds = connectToWebSocket(ProtoMagicPageRounds);