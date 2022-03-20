"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const const_1 = require("./const");
const onConnect = async (ddb, connectionId) => {
    const expiryDate = new Date(Date.now());
    expiryDate.setHours(expiryDate.getHours() + parseFloat(const_1.EXPIRY_TIME_IN_HOUR));
    const putParams = {
        TableName: const_1.TABLE_NAME,
        Item: {
            primaryKey: `connectionId:${connectionId}`,
            connectionId: connectionId,
            ttl: Math.floor(expiryDate.getTime() / 1000),
        },
    };
    try {
        await ddb.put(putParams).promise();
    }
    catch (err) {
        return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }
    return { statusCode: 200, body: 'Connected.' };
};
exports.onConnect = onConnect;
