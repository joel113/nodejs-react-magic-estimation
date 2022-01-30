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
                <td  style="display: flex; justify-content: space-around">
                    <div style="display:table;width:25px;height:25px;background-color:#554433;">
                        <div style="display:table-cell;vertical-align:middle;">
                            <div>J</div>
                        </div>
                    </div>
                    <div style="display:table;height:25px;">
                        <div style="display:table-cell;vertical-align:middle;">
                            <div>{userVote.userId}</div>
                        </div>
                    </div>
                </td>
                <td>{userVote.elementId}</td>
                <td>{userVote.vote}</td>
                </tr>
            ))}
    </table>
    )
};

export const MagicPageSomeVotes = connectToWebSocket(ProtoMagicPageUserVotes);