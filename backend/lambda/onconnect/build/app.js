"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const onconnect_1 = require("./onconnect");
const ddb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});
const handler = (event) => (0, onconnect_1.onConnect)(ddb, event.requestContext.connectionId);
exports.handler = handler;
