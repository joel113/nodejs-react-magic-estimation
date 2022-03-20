"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDisconnect = void 0;
const const_1 = require("./const");
const onDisconnect = async (ddb, connectionId) => {
    const deleteParams = {
        TableName: const_1.TABLE_NAME,
        Key: {
            primaryKey: `connectionId:${connectionId}`,
        },
    };
    const queryItemParams = {
        TableName: const_1.TABLE_NAME,
        ConsistentRead: true,
        Key: {
            primaryKey: `connectionId:${connectionId}`,
        },
    };
    try {
        const connectionItem = (await ddb.get(queryItemParams).promise()).Item;
        await ddb.delete(deleteParams).promise();
        if (connectionItem && connectionItem.groupId) {
            const updateParams = {
                TableName: const_1.TABLE_NAME,
                Key: {
                    primaryKey: `groupId:${connectionItem.groupId}`,
                },
                UpdateExpression: 'REMOVE #1.connectionId',
                ExpressionAttributeNames: {
                    '#1': connectionItem.userId,
                },
            };
            await ddb.update(updateParams).promise();
        }
    }
    catch (err) {
        return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
    }
    return { statusCode: 200, body: 'Disconnected.' };
};
exports.onDisconnect = onDisconnect;
