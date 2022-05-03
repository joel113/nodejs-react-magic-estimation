import { Client } from 'pg';

export async function clearVotes(session_id: String, client: Client) {
    const query = 'UPDATE elements set votes = 0, votes_round = 0 WHERE session_id = $1'
    executeUpdate(client, query, session_id);
}

export async function initRounds(session_id: String, client: Client) {
    console.log("[Magic] Received init rounds message: %s", session_id)
    const query = 'INSERT into rounds(session_id, rounds, round_active) VALUES($1, 0, 0)'
    executeInsert(client, query, session_id);
}

export async function addRound(session_id: String, client: Client) {
    console.log("[Magic] Received add round message: %s", session_id)
    const query = 'UPDATE rounds set rounds = rounds + 1, updated_at=now() WHERE session_id = $1'
    executeUpdate(client, query, session_id);
}

export async function nextRound(session_id: String, client: Client) {
    console.log("[Magic] Received next round message: %s", session_id)
    const query_rounds = 'UPDATE rounds set round_active = round_active + 1, updated_at=now() WHERE session_id = $1'
    const query_elements = 'UPDATE elements set votes_round = 0, updated_at=now() WHERE session_id = $1'
    executeUpdate(client, query_rounds, session_id);
    executeUpdate(client, query_elements, session_id);
}

function executeUpdate(client: Client, query: string, session_id: String) {
    client.query(query, [session_id], (err, res) => {
        if (err) {
            console.log("Error when trying to update: %s", err);
        }
        else {
            console.log("Updatd %d rows", res.rowCount);
        }
    });
}

function executeInsert(client: Client, query: string, session_id: String) {
    client.query(query, [session_id], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
        }
    });
}
