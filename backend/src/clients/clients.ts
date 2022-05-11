import { Client } from 'pg';
import { WebSocket } from 'ws';

export class WebSocketClients {

    clients: Set<WebSocket>;

    constructor() {
        this.clients = new Set<WebSocket>();
    }

    addClient(sessionId: string, client: WebSocket) {
        this.clients.add(client);
    }

    removeClient(client: WebSocket) {
        this.clients.delete(client);
    }

    broadcast(sessionId: string, dbclient: Client, fullstate: (sessionId: string, client: Client) => Promise<any>) {
        fullstate(sessionId, dbclient)
            .then(
                state => {
                    console.log("[Magic] Broadcast state to users of session_id: %s", sessionId);
                    this.clients.forEach(client => client.send(state))
                })
            .catch(err => console.log("[Magic] Failed to collected full state in order to broadcast to %s clients", sessionId))
    }

}