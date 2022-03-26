import { WebSocketServer } from 'ws';
import { Client } from 'pg';
import { onMessage } from './onmessage';

const wss = new WebSocketServer({ port: 8080 });

const client = new Client();
client.connect()

wss.on('connection', function connection(ws) {

    console.log('Client connection established.')

    ws.on('message', function message(data) {
        ws.send(onMessage(JSON.parse(data.toString()).data, client))
    });

    ws.on('close', function close() {
        console.log('Client connection closed.')
    });
});