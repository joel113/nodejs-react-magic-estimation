import {Client} from 'pg';
import {executeInsert} from '../../db/queries';

/**
 * Records the login of a user while adding the infos to the database.
 * @param {string} userId
 * @param {string} color
 * @param {string} sessionId
 * @param {Client} client
 */
export async function loginUser(userId: string,
    color: string,
    sessionId: string,
    client: Client) {
  console.log(
      '[Magic] Received login message: %s, %s, %s',
      userId,
      color,
      sessionId);
  const query = 'INSERT into users(session_id, user_id, color) ' +
    'VALUES($1, $2, $3) ' +
    'ON CONFLICT (session_id, user_id) ' +
    'DO ' +
    'UPDATE SET color=$3';
  executeInsert(client, query, [sessionId, userId, color])
      .catch((err) => console.error(
          '[Magic] Processing login message failed: %s', err));
}
