import { Client } from 'pg';
import { executeInsert } from '../../db/queries';

export async function loginUser(userId: string, color: string, sessionId: string, client: Client) {
    console.log("[Magic] Received login message: %s, %s, %s", userId, color, sessionId);
    const query = 'INSERT into users(session_id, user_id, color) VALUES($1, $2, $3)';
    executeInsert(client, query, [sessionId, userId, color]);
}
