import {Client} from 'pg';
import {executeUpdate, executeInsert} from '../../db/queries';

/**
 * Clears all votes from the database for a given session.
 * @param {string} sessionId The session id.
 * @param {Client} client The database client.
 */
export async function clearVotes(sessionId: string, client: Client) {
  const query = 'UPDATE elements set ' +
        'votes = 0,' +
        'votes_round = 0 WHERE session_id = $1';
  executeUpdate(client, query, [sessionId])
      .catch((err) => console.error('[Magic] Processing clear votes ' +
        'message failed: %s', err));
}

/**
 * Initializes the rounds for a given session.
 * @param {string} sessionId The session id.
 * @param {Client} client The database client.
 */
export async function initRounds(sessionId: string, client: Client) {
  console.log('[Magic] Received init rounds message: %s', sessionId);
  const query = 'INSERT into rounds(session_id, rounds, round_active) ' +
    'VALUES($1, 1, 1)';
  executeInsert(client, query, [sessionId])
      .catch((err) => console.error('[Magic] Processing init rounds ' +
        'message failed: %s', err));
}

/**
 * Adds around to a session.
 * @param {string} sessionId The session id.
 * @param {Client} client The database client.
 */
export async function addRound(sessionId: string, client: Client) {
  console.log('[Magic] Received add round message: %s', sessionId);
  const query = 'UPDATE rounds set ' +
    'rounds = rounds + 1, ' +
    'updated_at=now() ' +
    'WHERE session_id = $1';
  executeUpdate(client, query, [sessionId])
      .catch((err) => console.error('[Magic] Processing init rounds ' +
        'message failed: %s', err));
}

/**
 * Switches to next round of a session.
 * @param {string} sessionId The session id.
 * @param {Client} client The database client.
 */
export async function nextRound(sessionId: string, client: Client) {
  console.log('[Magic] Received next round message: %s', sessionId);
  const queryRounds = 'UPDATE rounds set round_active = round_active + 1, ' +
    'updated_at=now() ' +
    'WHERE session_id = $1';
  const queryElements = 'UPDATE elements set ' +
    'votes_round = 0, ' +
    'updated_at=now() ' +
    'WHERE session_id = $1';
  executeUpdate(client, queryRounds, [sessionId])
      .catch((err) => console.error('[Magic] Processing received next ' +
        'round message failed: %s', err));
  executeUpdate(client, queryElements, [sessionId])
      .catch((err) => console.error('[Magic] Processing received next ' +
        'round message failed: %s', err));
}
