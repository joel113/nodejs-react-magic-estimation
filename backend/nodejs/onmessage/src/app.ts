import { WebSocketServer } from 'ws';
import { Client } from 'pg';
import { onMessage } from './onmessage';

const wss = new WebSocketServer({ host: "0.0.0.0", port: 8080 });

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.PG_PASSWORD,
});
client.connect()

console.log('Web socket server start up complete')

wss.on('connection', function connection(ws) {

    console.log('Client connection established')

    ws.on('message', function message(data) {
        console.log('Received message %s',[data])
        ws.send(onMessage(JSON.parse(data.toString()).data, client))
    });

    ws.on('close', function close() {
        console.log('Client connection closed')
    });
});