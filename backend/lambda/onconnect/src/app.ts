import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { onConnect } from './onconnect';

const ddb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION,
});

export const handler = (event: APIGatewayProxyEvent) =>
  onConnect(ddb, event.requestContext.connectionId);
