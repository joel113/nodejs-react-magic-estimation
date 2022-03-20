"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const onmessage_1 = require("./onmessage");
const const_1 = require("./const");
const ddb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
});
const handler = (event) => {
    const connectionId = event.requestContext.connectionId;
    const message = JSON.parse(event.body).data;
    const config = {
        connectionId,
        tableName: const_1.TABLE_NAME,
        ddb,
        handler: new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: event.requestContext.domainName,
        }),
    };
    return (0, onmessage_1.onMessage)(message, config);
};
exports.handler = handler;
