import { WebSocketServer } from 'ws';
import { onMessage } from './onmessage';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('connect', function message(data) {
        ws.send(onMessage(JSON.parse(data.toString()).data))
    });

    ws.on('message', function message(data) {
        ws.send(onMessage(JSON.parse(data.toString()).data))
    });

    ws.on('disconnect', function message(data) {
      ws.send(onMessage(JSON.parse(data.toString()).data))
    });
});