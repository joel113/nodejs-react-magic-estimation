import { ElementState, ElementVote, UserVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import agreedImage from '../../img/agreed.svg';
import disbutedIamge from '../../img/disbuted.svg';
import lockedImage from '../../img/locked.svg';
import ongoingImage from '../../img/ongoing.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import { ALT_AGREE_LOGO, ALT_DISBUTE_LOGO, ALT_ONGOING_LOGO, ALT_LOCKED_LOGO, ALT_UP_LOGO, ALT_DOWN_LOGO, ALT_TRASH_LOGO } from '../../constants';

const ProtoMagicPageElements = ({socket}: {socket: WebSocketApi}) => {
    return (
        <table class={classes.magicPageElementsTable}>
            <tr class={classes.magicPageElementsTableRowHeader}>
                <th class={classes.elementColumn}>Element</th>
                <th>Votes</th>
                <th>Status</th>
                <th>Upvote</th>
                <th>Downvote</th>
                <th>Remove</th>
                <th>Users</th>
            </tr>
            {socket.state.elementVotes.sort((a, b) => b.votes - a.votes).map(
                (elementVote: ElementVote) => (
                    <tr>
                        <td>{elementVote.id}</td>
                        <td>{elementVote.votes}</td>
                        <td>
                            {elementVote.state == ElementState.Ongoing &&
                                <img src={ongoingImage} alt={ALT_ONGOING_LOGO} class={classes.logoImage} onClick={() => {socket.disbuteElement(elementVote.id)}} />
                            }
                            {elementVote.state == ElementState.Disbuted &&
                                <img src={disbutedIamge} alt={ALT_DISBUTE_LOGO} class={classes.logoImage} onClick={() => {socket.agreeElement(elementVote.id)}} />
                            }
                            {elementVote.state == ElementState.Agreed &&
                                <img src={agreedImage} alt={ALT_AGREE_LOGO} class={classes.logoImage} onClick={() => {socket.resetElement(elementVote.id)}} />
                            }
                            {elementVote.state == ElementState.Locked &&
                                <img src={lockedImage} alt={ALT_LOCKED_LOGO} class={classes.logoImage} onClick={() => {socket.resetElement(elementVote.id)}} />
                            }
                        </td>
                        <td>
                            {elementVote.state != ElementState.Locked &&
                                <img src={upLogo} alt={ALT_UP_LOGO} class={classes.logoImage} onClick={() => {socket.upvoteElement(elementVote.id)}} />
                            }
                        </td>
                        <td>
                            {elementVote.state != ElementState.Locked &&
                                <img src={downLogo} alt={ALT_DOWN_LOGO} class={classes.logoImage} onClick={() => {socket.downvoteElement(elementVote.id)}} />
                            }
                        </td>
                        <td>
                            {elementVote.state != ElementState.Locked &&
                                <img src={trashLogo} alt={ALT_TRASH_LOGO} class={classes.logoImage} onClick={() => {socket.delElement(elementVote.id)}} />
                            }
                        </td>
                        <td>
                            <div class={classes.userVotes}>
                                {socket.state.userVotes.filter((userVote: UserVote) => userVote.elementId == elementVote.id).map(
                                    (userVote: UserVote) => (
                                        <div class={classes.userVoteContainer} style={{backgroundColor: userVote.userColor}}>
                                            <div class={classes.userVote}>
                                                <div>{userVote.userId.substring(0,1)}</div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </td>
                    </tr>
            ))}
         </table>
    )
};

export const MagicPageSomeElements = connectToWebSocket(ProtoMagicPageElements);