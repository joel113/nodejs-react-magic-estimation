import { UserVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageUserVotes = ({socket}: {socket: WebSocketApi}) => {
    return (
        <table class={classes.magicPageElementsTable}>
        <tr class={classes.magicPageElementsTableRowHeader}>
            <th class={classes.elementColumn}>User</th>
            <th>Element</th>
            <th>Vote</th>
        </tr>
        {socket.state.userVotes.map(
            (userVote: UserVote) => (
                <tr>
                <td>{userVote.userId}</td>
                <td>{userVote.elementId}</td>
                <td>{userVote.vote}</td>
                </tr>
            ))}
    </table>
    )
};

export const MagicPageSomeVotes = connectToWebSocket(ProtoMagicPageUserVotes);