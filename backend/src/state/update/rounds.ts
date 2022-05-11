import { Client } from 'pg';
import { executeUpdate, executeInsert } from '../../db/queries';

export async function clearVotes(sessionId: string, client: Client) {
    const query = 'UPDATE elements set votes = 0, votes_round = 0 WHERE session_id = $1';
    executeUpdate(client, query, [sessionId])
        .catch(err => console.error("[Magic] Processing clear votes message failed: %s", err));
}

export async function initRounds(sessionId: string, client: Client) {
    console.log("[Magic] Received init rounds message: %s", sessionId);
    const query = 'INSERT into rounds(session_id, rounds, round_active) VALUES($1, 0, 0)';
    executeInsert(client, query, [sessionId])
        .catch(err => console.error("[Magic] Processing init rounds message failed: %s", err));
}

export async function addRound(sessionId: string, client: Client) {
    console.log("[Magic] Received add round message: %s", sessionId);
    const query = 'UPDATE rounds set rounds = rounds + 1, updated_at=now() WHERE session_id = $1';
    executeUpdate(client, query, [sessionId])
        .catch(err => console.error("[Magic] Processing init rounds message failed: %s", err));
}

export async function nextRound(sessionId: string, client: Client) {
    console.log("[Magic] Received next round message: %s", sessionId);
    const query_rounds = 'UPDATE rounds set round_active = round_active + 1, updated_at=now() WHERE session_id = $1';
    const query_elements = 'UPDATE elements set votes_round = 0, updated_at=now() WHERE session_id = $1';
    executeUpdate(client, query_rounds, [sessionId])
        .catch(err => console.error("[Magic] Processing received next round message failed: %s", err));
    executeUpdate(client, query_elements, [sessionId])
        .catch(err => console.error("[Magic] Processing received next round message failed: %s", err));
}
