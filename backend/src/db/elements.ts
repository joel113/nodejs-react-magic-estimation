import { Client } from 'pg';

export async function addElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received add element message: %s, %s", session_id, element_id)
    const query = 'INSERT into elements(session_id, element_id, votes, votes_round, state) VALUES($1, $2, 0, 0, \'ongoing\')'
    executeInsert(client, query, session_id, element_id);
}

export async function delElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received del element message: %s, %s", session_id, element_id)
    const query = 'DELETE FROM elements WHERE session_id = $1 AND element_id = $2'
    executeDelete(client, query, session_id, element_id);
}

export async function resetElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received reset element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function agreeElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received agree element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET state=\'agreed\', updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function disbuteElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received disbute element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET state=\'disbuted\', updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function lockElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received lock element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET state=\'locked\', updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function ongoingElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received ongoing element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function upvoteElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received upvote element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1, updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export async function downvoteElement(session_id: String, element_id: String, client: Client) {
    console.log("[Magic] Received downvote element message: %s, %s", session_id, element_id)
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1, updated_at=now() WHERE session_id = $1 AND element_id = $2'
    executeUpdate(client, query, session_id, element_id);
}

export function executeInsert(client: Client, query: string, session_id: String, element_id: String) {
    client.query(query, [session_id, element_id], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
        }
    });
}

export function executeDelete(client: Client, query: string, session_id: String, element_id: String) {
    client.query(query, [session_id, element_id], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Deleted %d rows", res.rowCount);
        }
    });
}

export function executeUpdate(client: Client, query: string, session_id: String, element_id: String) {
    client.query(query, [session_id, element_id], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to update: %s", err);
        }
        else {
            console.log("[Magic] Updated %d rows", res.rowCount);
        }
    });
}