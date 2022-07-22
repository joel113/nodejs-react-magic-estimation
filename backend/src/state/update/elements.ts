import {Client} from 'pg';
import {executeInsert, executeUpdate, executeDelete} from '../../db/queries';

/**
 * Adds an element to the database.
 * @param {string} sessionId The session id.
 * @param {string} elementId The element id.
 * @param {Client} client The database client.
 */
export async function addElement(
    sessionId: string,
    elementId: string,
    stateId: Number,
    client: Client) {
  console.log(
      '[Magic] Received add element message: %s, %s',
      sessionId,
      elementId);
  const query = 'INSERT into elements(' +
    'session_id, ' +
    'element_id, ' +
    'votes, ' +
    'votes_round, ' +
    'state) ' +
    'VALUES($1, $2, 0, 0, $3)';
  executeInsert(client, query, [sessionId, elementId, stateId])
      .catch((err) => console.error('[Magic] Processing received add ' +
      'element message failed: %s', err));
}

/**
 * Deletes an element from the database.
 * @param {string} sessionId The session id.
 * @param {string} elementId The element id.
 * @param {Client} client The database client.
 */
export async function delElement(
    sessionId: string,
    elementId: string,
    client: Client) {
  console.log(
    '[Magic] Received del element message: %s, %s',
    sessionId,
    elementId);
  const query = 'DELETE FROM elements WHERE ' + 
    'session_id = $1 AND element_id = $2';
  executeDelete(client, query, [sessionId, elementId])
    .catch((err) => console.error('[Magic] Processing received del' +
    'element message failed: %s', err));
}

/**
 * Resets an element stored in the database.
 * @param {string} sessionId The session id.
 * @param {string} elementId The element id.
 * @param {Client} client The database client.
 */
export async function resetElement(
    sessionId: string,
    elementId: string,
    client: Client) {
  console.log(
      '[Magic] Received reset element message: %s, %s',
      sessionId,
      elementId);
  const query = 'UPDATE elements SET ' +
    'state=\'Ongoing\',' +
    'updated_at=now(),' +
    'WHERE session_id = $1 AND element_id = $2';
  executeUpdate(client, query, [sessionId, elementId])
      .catch((err) => console.error('[Magic] Processing received reset ' +
      'element message failed: %s', err));
}

/**
 * Agrees an element stored in the database.
 * @param {string} sessionId The session id.
 * @param {Number} elementId The element id.
 * @param {Number} stateId The state id.
 * @param {Number} votes The votes of the element.
 * @param {Number} votesRound The votes of the element in the round.
 * @param {Client} client The database client.
 */
export async function updateElement(
    sessionId: string,
    elementId: string,
    stateId: Number,
    votes: Number,
    votesRound: Number,
    client: Client) {
  console.log(
      '[Magic] Update element message: %s, %s',
      sessionId,
      elementId);
  const query = 'UPDATE elements SET ' +
    'state = $3, ' +
    'votes = $4, ' +
    'votes_round = $5, ' +
    'updated_at=now() ' +
    'WHERE session_id = $1 AND element_id = $2';
  executeUpdate(client, query, [sessionId, elementId, stateId, votes, votesRound])
      .catch((err) => console.error('[Magic] Processing agree element ' +
      'message failed: %s', err));
}
