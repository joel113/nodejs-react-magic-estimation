import {Client} from 'pg';
import {WebSocket} from 'ws';

/**
 * Manages the clients connected to the server.
 */
export class WebSocketClients {
  clients: Set<WebSocket>;

  /**
   * Initializes the WebSocketClients.
   */
  constructor() {
    this.clients = new Set<WebSocket>();
  }

  /**
   * Adds the client to the set of clients.
   * @param {string} sessionId The session id of the client.
   * @param {WebSocket} client WebSocket client.
   */
  addClient(sessionId: string, client: WebSocket) {
    this.clients.add(client);
  }

  /**
   * Removes the client from the set of clients.
   * @param {WebSocket} client WebSocket client.
   */
  removeClient(client: WebSocket) {
    this.clients.delete(client);
  }

  /**
   * Broadcasts a full state to all clients.
   * @param {string} sessionId The session id of the client.
   * @param {Client} dbclient Postgres client.
   * @param {function} fullstate Function to determine the full state.
   */
  broadcast(sessionId: string,
      dbclient: Client,
      fullstate: (sessionId: string, client: Client) => Promise<any>) {
    fullstate(sessionId, dbclient).then(
        (state) => {
          console.log(
              '[Magic] Broadcast state to users of session_id: %s',
              sessionId);
          this.clients.forEach((client) => client.send(state));
        })
        .catch(
            (err) => console.error(
                '[Magic] Failed to collected full state in order ' +
                'to broadcast to %s clients due to %s', sessionId, err),
        )
  }
}
