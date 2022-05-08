import { Votes, WebSocketApi } from '../../types/WebSocket';
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
                (userVote: Votes) => (
                    <tr>
                        <td>
                            <div class={classes.userVoteNameContainer}>
                                <div class={classes.userVoteContainer} style={{backgroundColor: userVote.userColor}}>
                                    <div class={classes.userVote}>
                                        <div>{userVote.userId.substring(0,1)}</div>
                                    </div>
                                </div>
                                <div class={classes.userNameContainer}>
                                    <div class={classes.userName}>
                                        <div>{userVote.userId}</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{userVote.elementId}</td>
                        <td>{userVote.vote}</td>
                    </tr>
                )
            )}
        </table>
    )
};

export const MagicPageSomeVotes = connectToWebSocket(ProtoMagicPageUserVotes);