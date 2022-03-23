"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const onmessage_1 = require("./onmessage");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    console.log('Client connection established.');
    ws.on('message', function message(data) {
        ws.send((0, onmessage_1.onMessage)(JSON.parse(data.toString()).data));
    });
    ws.on('close', function close() {
        console.log('Client connection closed.');
    });
});
