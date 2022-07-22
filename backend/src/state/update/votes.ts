import {Client} from 'pg';
import {executeInsert, executeUpdate, executeDelete} from '../../db/queries';

/**
 * Adds a vote to the database.
 * @param {string} sessionId
 * @param {string} elementId
 * @param {string} userId
 * @param {string} color
 * @param {Client} client
 */
export async function addVote(sessionId: string,
    elementId: string,
    userId: string,
    color: string,
    client: Client) {
  console.log(
      '[Magic] Received add vote message: %s, %s, %s',
      sessionId,
      elementId,
      userId);
  const updateVotes = 'INSERT INTO ' +
    'votes (session_id, user_id, element_id, color, votes, updated_at, created_at)' +
    'VALUES($1, $2, $3, $4, 1, now(), now())';
  executeInsert(client, updateVotes, [sessionId, userId, elementId, color])
      .catch((err) =>
        console.error('[Magic] Processing add vote message failed: %s', err));
}

/**
 * Updates a vote in the database.
 * @param {string} sessionId
 * @param {string} elementId
 * @param {string} userId
 * @param {string} color
 * @param {string} votes
 * @param {Client} client
 */
export async function updateVote(sessionId: string,
    elementId: string,
    userId: string,
    color: string,
    votes: number,
    client: Client) {
  console.log(
      '[Magic] Received add vote message: %s, %s, %s, %s',
      sessionId,
      elementId,
      userId,
      votes);
  const updateVotes = 'UPDATE votes SET votes=$4, updated_at=now() ' +
    'WHERE session_id=$1 AND user_id=$2 AND element_id=$3';
  executeUpdate(client, updateVotes, [sessionId, userId, elementId, votes])
      .catch((err) =>
        console.error(
            '[Magic] Processing update vote message failed: %s', err));
}

/**
 * Removes a vote from the database.
 * @param {string} sessionId
 * @param {string} elementId
 * @param {string} userId
 * @param {Client} client
 */
export async function removeVote(sessionId: string,
    elementId: string,
    userId: string,
    client: Client) {
  console.log(
      '[Magic] Received remove vote message: %s, %s, %s',
      sessionId,
      elementId,
      userId);
  const updateVotes = 'DELETE FROM votes ' +
    'WHERE session_id=$1 AND user_id=$2 AND element_id=$3';
  executeDelete(client, updateVotes, [sessionId, userId, elementId])
      .catch((err) =>
        console.error(
            '[Magic] Processing remove vote message failed: %s', err));
}
