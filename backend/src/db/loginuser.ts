import { Client } from 'pg';

export async function loginUser(userId: String, color: String, sessionId: String, client: Client) {
    console.log("[Magic] Received login message: %s, %s, %s", userId, color, sessionId)
    const query = 'INSERT into users(session_id, user_id, color) VALUES($1, $2, $3)'
    client.query(query, [sessionId, userId, color], (err, res) => {
        if(err) {
            console.error("[Magic] Error when trying to insert: %s", err)
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount)
        }
    })
}