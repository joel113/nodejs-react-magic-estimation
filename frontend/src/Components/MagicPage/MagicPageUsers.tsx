import { UserVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageUsers = ({socket}: {socket: WebSocketApi}) => {
    return (
        <div class={classes.magicPageUsersContainer}>
            <div className={`${classes.magicPageUsersBox} ${classes.firstBox}`}>User</div>
            <div className={`${classes.magicPageUsersBox} ${classes.activeBox}`}><div class={classes.magicPageUsersName}>User 1</div></div>
            <div className={`${classes.magicPageUsersBox} ${classes.nonactiveBox}`}>User 2</div>
            <div className={`${classes.magicPageUsersBox} ${classes.nonactiveBox}`}>User 3</div>
            <div className={`${classes.magicPageUsersBox} ${classes.controlBox}`}>Next User</div>
            <div className={`${classes.magicPageUsersBox} ${classes.controlBox}`}>Mix Users</div>
        </div>
    )
};

export const MagicPageUsers = connectToWebSocket(ProtoMagicPageUsers);