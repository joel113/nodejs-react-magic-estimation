import { Client } from 'pg';
import { WebSocketServer } from 'ws';
import { WebSocketClients } from './broadcast/clients';
import { onMessage } from './messages/onmessage';
import { fullstate } from './database/fullstate';

const client = new Client({host: 'localhost', port: 5432, user: 'postgres', password: 'postgres'});
client.connect()

const wss = new WebSocketServer({ host: "0.0.0.0", port: 8080 });
const wsClients = new WebSocketClients();

console.log('Web socket server start up complete')

wss.on('connection', function connection(ws) {
    console.log('[Magic] Client connection established');
    ws.on('message', function message(message) {
        console.log('[Magic] Received message %s', message.toString())
        try {
            const parsedMessage = JSON.parse(message.toString());
            const sessionId = parsedMessage.payload!.session!;
            const userId = parsedMessage.payload!.user!;
            if(sessionId && userId) {
                wsClients.addClient(sessionId, ws)
            }
            const result = onMessage(parsedMessage, client);
            result.then(_ => wsClients.broadcast(sessionId, client, fullstate));
            return result;
        }
        catch(e) {
            console.log('[Magic] Catched error when processing received mesage: %s', e);
            if(e instanceof Error) {
                return { statusCode: 500, body: e.stack };
            }
        }
    });
    ws.on('close', function close() {
        console.log('[Magic] Client connection closed');
        wsClients.removeClient(ws);
    });
});