import { Client } from 'pg';

export async function clearVotes(sessionId: string, client: Client) {
    const query = 'UPDATE elements set votes = 0, votes_round = 0 WHERE session_id = $1';
    executeUpdate(client, query, sessionId);
}

export async function initRounds(sessionId: string, client: Client) {
    console.log("[Magic] Received init rounds message: %s", sessionId);
    const query = 'INSERT into rounds(session_id, rounds, round_active) VALUES($1, 0, 0)';
    executeInsert(client, query, sessionId);
}

export async function addRound(sessionId: string, client: Client) {
    console.log("[Magic] Received add round message: %s", sessionId);
    const query = 'UPDATE rounds set rounds = rounds + 1, updated_at=now() WHERE session_id = $1';
    executeUpdate(client, query, sessionId);
}

export async function nextRound(sessionId: string, client: Client) {
    console.log("[Magic] Received next round message: %s", sessionId);
    const query_rounds = 'UPDATE rounds set round_active = round_active + 1, updated_at=now() WHERE session_id = $1';
    const query_elements = 'UPDATE elements set votes_round = 0, updated_at=now() WHERE session_id = $1';
    executeUpdate(client, query_rounds, sessionId);
    executeUpdate(client, query_elements, sessionId);
}

function executeUpdate(client: Client, query: string, sessionId: string) {
    client.query(query, [sessionId], (err, res) => {
        if (err) {
            console.log("Error when trying to update: %s", err);
        }
        else {
            console.log("Updatd %d rows", res.rowCount);
        }
    });
}

function executeInsert(client: Client, query: string, sessionId: string) {
    client.query(query, [sessionId], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
        }
    });
}
