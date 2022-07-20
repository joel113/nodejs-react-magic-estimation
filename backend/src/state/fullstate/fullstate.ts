import {Client} from 'pg';
import {executeSelect} from '../../db/queries';

export const fullstate = async (sessionId: string,
    client: Client): Promise<any> => {

  const queryElementVotes = 'SELECT element_id AS id,' +
    'votes AS votes,' +
    'votes_round AS votesRound,' +
    'state AS state FROM elements WHERE session_id=$1';

  const elementVotes = executeSelect(client, queryElementVotes, sessionId);

  const queryVotes = 'SELECT user_id AS userId,' +
  'color AS userColor,' +
  'element_id AS elementId,' +
  'votes AS vote FROM votes WHERE session_id=$1';

  const votes = executeSelect(client, queryVotes, sessionId);

  const queryUsers = 'SELECT user_id AS userId, color AS color ' +
    'FROM users WHERE session_id=$1';

  const users = executeSelect(client, queryUsers, sessionId);

  const queryRounds = 'SELECT rounds, round_active ' +
    'FROM rounds WHERE session_id=$1';
    
  const rounds = executeSelect(client, queryRounds, sessionId);

  return await Promise.all([elementVotes, votes, users, rounds])
      .then((values) => {
        const elementVotesResults = values[0];
        const votesResult = values[1];
        const usersResult = values[2];
        const roundsResults = values[3];

        if (roundsResults.rowCount != 1) {
          throw new Error('Full state rounds results unequal one row');
        }

        const elementVotes = elementVotesResults.rows;
        const userVotes = votesResult.rows;
        const users = usersResult.rows;
        const rounds = roundsResults.rows[0].rounds;
        const roundsActive = roundsResults.rows[0].round_active;

        return JSON.stringify({
          type: 'state',
          payload: {elementVotes: elementVotes,
            userVotes: userVotes,
            users: users,
            rounds,
            roundsActive},
        });
      }).catch((err) => {
        return Promise.reject(err);
      });
}

/**
 * Sends a message containing a full state to the client.
 * @param {string} message Message for being sent to the client.
 * @param {string} connectionId Connection id of the client.
 */
function sendMessageToConnection(message: string, connectionId: string) {
  // TODO: implement
}
