import {Client, QueryResult} from 'pg';

/**
 * Executes a select query on the database.
 * @param {Client} client Postgres client.
 * @param {String} query Query to execute.
 * @param {String} sessionId Session id.
 * @return {Promise} Promise of query result.
 */
export function executeSelect(client: Client,
    query: string,
    sessionId: String): Promise<QueryResult<any>> {
  return new Promise<QueryResult<any>>((resolve, reject) => {
    setTimeout(() => {
      client.query(query, [sessionId], (err, res) => {
        if (err) {
          console.error('[Magic] Error when trying to select: %s', err);
          reject(err);
        } else {
          console.log('[Magic] Selected %d rows', res.rowCount);
          resolve(res);
        }
      })
    }, 1000)
  })
}

/**
 * Executes an insert query on the database.
 * @param {Client} client Postgres client.
 * @param {String} query Query to execute.
 * @param {String} values Values to insert.
 * @return {Promise} Promise of query result.
 */
export function executeInsert(client: Client,
    query: string,
    values: string[]): Promise<QueryResult<any>> {
  return new Promise<QueryResult<any>>((resolve, reject) => {
    setTimeout(() => {
      client.query(query, values, (err, res) => {
        if (err) {
          console.error('[Magic] Error when trying to insert: %s', err);
          reject(err);
        } else {
          console.log('[Magic] Inserted %d rows', res.rowCount);
          resolve(res);
        }
      })
    }, 1000)
  })
}

/**
 * Executes a delete query on the database.
 * @param {Client} client Postgres client.
 * @param {String} query Query to execute.
 * @param {String} values Values to delete.
 * @return {Promise} Promise of query result.
 */
export async function executeDelete(client: Client,
    query: string,
    values: string[]): Promise<QueryResult<any>> {
  return new Promise<QueryResult<any>>((resolve, reject) => {
    setTimeout(() => {
      client.query(query, values, (err, res) => {
        if (err) {
          console.error('[Magic] Error when trying to delete: %s', err);
          reject(err);
        } else {
          console.log('[Magic] Deleted %d rows', res.rowCount);
          resolve(res);
        }
      })
    }, 1000)
  })
}

/**
 * Executes an update query on the database.
 * @param {Client} client Postgres client.
 * @param {String} query Query to execute.
 * @param {String} values Values to update.
 * @return {Promise} Promise of query result.
 */
export function executeUpdate(client: Client,
    query: string,
    values: string[]): Promise<QueryResult<any>> {
  return new Promise<QueryResult<any>>((resolve, reject) => {
    setTimeout(() => {
      client.query(query, values, (err, res) => {
        if (err) {
          console.error('[Magic] Error when trying to update: %s', err);
          reject(err);
        } else {
          console.log('[Magic] Updated %d rows', res.rowCount);
          resolve(res);
        }
      })
    }, 1000)
  })
}
