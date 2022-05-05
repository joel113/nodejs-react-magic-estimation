import { Client } from 'pg';

export async function loginUser(userId: string, color: string, sessionId: string, client: Client) {
    console.log("[Magic] Received login message: %s, %s, %s", userId, color, sessionId);
    const query = 'INSERT into users(session_id, user_id, color) VALUES($1, $2, $3)';
    executeInsert(client, query, sessionId, userId, color);
}

function executeInsert(client: Client, query: string, sessionId: string, userId: string, color: string) {
    client.query(query, [sessionId, userId, color], (err, res) => {
        if (err) {
            console.error("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
        }
    });
}
