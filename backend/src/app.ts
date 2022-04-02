import { WebSocketServer } from 'ws';
import { Client } from 'pg';
import { onMessage } from './onmessage';

const wss = new WebSocketServer({ host: "0.0.0.0", port: 8080 });

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
});

client.connect()

console.log('Web socket server start up complete')

wss.on('connection', function connection(ws) {

    console.log('Client connection established')

    ws.on('message', function message(data) {
        console.log('Received message %s', data.toString())
        try {
            return onMessage(JSON.parse(data.toString()), client)
        }
        catch(e) {
            console.log('Catched error when processing received mesage: %s', e)
            if(e instanceof Error) {
                return { statusCode: 500, body: e.stack };
            }
        }
    });

    ws.on('close', function close() {
        console.log('Client connection closed')
    });
});