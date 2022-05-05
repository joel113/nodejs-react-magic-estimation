import { Client } from 'pg';

export const fullstate = async (sessionId: string, client: Client) => {
    const queryUsers = 'SELECT session_id, user_id, color FROM users WHERE session_id=$1';
    const users = executeSelect(client, queryUsers, sessionId);

    const queryElements = 'SELECT session_id, element_id, votes, votes_round, element_state, created_at, updated_at FROM elements WHERE session_id=$1';
    const elements = executeSelect(client, queryElements, sessionId);

    const queryRounds = 'SELECT session_id, user_id, color, created_at FROM rounds where session_id=$1';
    const rounds = executeSelect(client, queryRounds, sessionId);

    // TODO: implement proper JSONification
    return JSON.stringify({
        type: 'state',
        payload: { elements, rounds, users },
      });
}

function executeSelect(client: Client, query: string, sessionId: String) {
    client.query(query, [sessionId], (err, res) => {
        if (err) {
            console.error("[Magic] Error when trying to select: %s", err);
        }
        else {
            console.log("[Magic] Selected %d rows", res.rowCount);
        }
    });
}

function sendMessageToConnection(message: string, connectionId: string) {
    // TODO: implement
}