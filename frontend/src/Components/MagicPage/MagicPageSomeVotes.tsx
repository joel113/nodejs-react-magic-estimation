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
            <tr key={userVote.elementid}>
              <td>
                <div className={classes.userVoteNameContainer}>
                  <div className={classes.userVoteContainer}
                    style={{backgroundColor: userVote.usercolor}}>
                    <div className={classes.userVote}>
                      <div>{userVote.userid.substring(0, 1)}</div>
                    </div>
                  </div>
                  <div className={classes.userNameContainer}>
                    <div className={classes.userName}>
                      <div>{userVote.userid}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>{userVote.elementid}</td>
              <td>{userVote.vote}</td>
            </tr>
          ),
      )}
    </table>
  )
};

export const MagicPageSomeVotes = connectToWebSocket(ProtoMagicPageUserVotes);
