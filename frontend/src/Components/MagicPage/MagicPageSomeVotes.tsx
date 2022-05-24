import {Votes, WebSocketApi} from '../../types/WebSocket';
import {connectToWebSocket} from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'

const ProtoMagicPageUserVotes = ({socket}: {socket: WebSocketApi}) => {
  return (
    <table className={classes.magicPageElementsTable}>
      <tr className={classes.magicPageElementsTableRowHeader}>
        <th className={classes.elementColumn}>User</th>
        <th>Element</th>
        <th>Vote</th>
      </tr>
      {socket.state.userVotes.map(
          (userVote: Votes) => (
            <tr key={userVote.elementId}>
              <td>
                <div className={classes.userVoteNameContainer}>
                  <div className={classes.userVoteContainer}
                    style={{backgroundColor: userVote.userColor}}>
                    <div className={classes.userVote}>
                      <div>{userVote.userId.substring(0, 1)}</div>
                    </div>
                  </div>
                  <div className={classes.userNameContainer}>
                    <div className={classes.userName}>
                      <div>{userVote.userId}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>{userVote.elementId}</td>
              <td>{userVote.vote}</td>
            </tr>
          ),
      )}
    </table>
  )
};

export const MagicPageSomeVotes = connectToWebSocket(ProtoMagicPageUserVotes);
