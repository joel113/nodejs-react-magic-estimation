import {ElementState,
  Elements,
  Votes,
  WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import agreedImage from '../../img/agreed.svg';
import disbutedIamge from '../../img/disbuted.svg';
import lockedImage from '../../img/locked.svg';
import ongoingImage from '../../img/ongoing.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import {ALT_AGREE_LOGO,
  ALT_DISBUTE_LOGO,
  ALT_ONGOING_LOGO,
  ALT_LOCKED_LOGO,
  ALT_UP_LOGO,
  ALT_DOWN_LOGO,
  ALT_TRASH_LOGO} from '../../constants';

const ProtoMagicPageElements = ({socket}: {socket: WebSocketApi}) => {
  return (
    <table className={classes.magicPageElementsTable}>
      <tr className={classes.magicPageElementsTableRowHeader}>
        <th className={classes.elementColumn}>Element</th>
        <th>Votes</th>
        <th>Status</th>
        <th>Upvote</th>
        <th>Downvote</th>
        <th>Remove</th>
        <th>Users</th>
      </tr>
      {socket.state.elementVotes.sort((a, b) => b.votes - a.votes).map(
          (elementVote: Elements) => (
            <tr key={elementVote.id}>
              <td>{elementVote.id}</td>
              <td>{elementVote.votes}</td>
              <td>
                {elementVote.state == ElementState.Ongoing &&
                                <img src={ongoingImage}
                                  alt={ALT_ONGOING_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      ElementState.Disbuted,
                                      elementVote.votes,
                                      elementVote.votesround)
                                  }} />
                }
                {elementVote.state == ElementState.Disbuted &&
                                <img src={disbutedIamge}
                                  alt={ALT_DISBUTE_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      ElementState.Agreed,
                                      elementVote.votes,
                                      elementVote.votesround)
                                  }} />
                }
                {elementVote.state == ElementState.Agreed &&
                                <img src={agreedImage}
                                  alt={ALT_AGREE_LOGO}
                                  className={classes.logoImage} onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      ElementState.Ongoing,
                                      elementVote.votes,
                                      elementVote.votesround)
                                  }} />
                }
                {elementVote.state == ElementState.Locked &&
                                <img src={lockedImage}
                                  alt={ALT_LOCKED_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      ElementState.Ongoing,
                                      elementVote.votes,
                                      elementVote.votesround)
                                  }} />
                }
              </td>
              <td>
                {elementVote.state != ElementState.Locked &&
                                <img src={upLogo}
                                  alt={ALT_UP_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      elementVote.state,
                                      elementVote.votes + 1,
                                      elementVote.votesround + 1)
                                    socket.updateVote(elementVote.id, 1)
                                  }} />
                }
              </td>
              <td>
                {elementVote.state != ElementState.Locked &&
                                <img src={downLogo}
                                  alt={ALT_DOWN_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.updateElement(elementVote.id,
                                      elementVote.state,
                                      elementVote.votes - 1,
                                      elementVote.votesround - 1)
                                    socket.updateVote(elementVote.id, -1)
                                  }} />
                }
              </td>
              <td>
                {elementVote.state != ElementState.Locked &&
                                <img src={trashLogo}
                                  alt={ALT_TRASH_LOGO}
                                  className={classes.logoImage}
                                  onClick={() => {
                                    socket.delElement(elementVote.id)
                                  }} />
                }
              </td>
              <td>
                <div className={classes.userVotes}>
                  {socket.state.userVotes
                      .filter(
                          (userVote: Votes) =>
                            userVote.elementid == elementVote.id)
                      .map(
                          (userVote: Votes) => (
                            <div
                              key={userVote.elementid}
                              className={classes.userVoteContainer}
                              style={{backgroundColor: userVote.usercolor}}>
                              <div className={classes.userVote}>
                                <div>{userVote.userid.substring(0, 1)}</div>
                              </div>
                            </div>
                          ),
                      )}
                </div>
              </td>
            </tr>
          ))}
    </table>
  )
};

export const MagicPageSomeElements = connectToWebSocket(ProtoMagicPageElements);
