import { ElementVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import { ALT_INFO_LOGO, ALT_UP_LOGO, ALT_DOWN_LOGO, ALT_TRASH_LOGO } from '../../constants';

const ProtoMagicPageElements = ({socket}: {socket: WebSocketApi}) => {
    return (
        <table class={classes.magicPageElementsTable}>
            <tr class={classes.magicPageElementsTableRowHeader}>
                <th class={classes.elementColumn}>Element</th>
                <th>Votes</th>
                <th>Upvote</th>
                <th>Downvote</th>
                <th>Remove</th>
            </tr>
            {socket.state.elementVotes.sort((a, b) => b.votes - a.votes).map(
                (elementVote: ElementVote) => (
                    <tr>
                    <td>{elementVote.id}</td>
                    <td>{elementVote.votes}</td>
                    <td><img src={upLogo} alt={ALT_UP_LOGO} class={classes.logoImage} onClick={() => {socket.upvoteElement(elementVote.id)}} /></td>
                    <td><img src={downLogo} alt={ALT_DOWN_LOGO} class={classes.logoImage} onClick={() => {socket.downvoteElement(elementVote.id)}} /></td>
                    <td><img src={trashLogo} alt={ALT_TRASH_LOGO} class={classes.logoImage} onClick={() => {socket.delElement(elementVote.id)}} /></td>
                    </tr>
            ))}
         </table>
    )
};

export const MagicPageElements = connectToWebSocket(ProtoMagicPageElements);