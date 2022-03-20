import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { onDisconnect } from './ondisconnect';

const ddb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION,
});

export const handler = (event: APIGatewayProxyEvent) =>
  onDisconnect(ddb, event.requestContext.connectionId);
