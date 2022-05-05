import { Client } from 'pg';

export async function addElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received add element message: %s, %s", sessionId, elementId);
    const query = 'INSERT into elements(sessionId, elementId, votes, votes_round, state) VALUES($1, $2, 0, 0, \'ongoing\')';
    executeInsert(client, query, sessionId, elementId);;
}

export async function delElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received del element message: %s, %s", sessionId, elementId);
    const query = 'DELETE FROM elements WHERE sessionId = $1 AND elementId = $2';
    executeDelete(client, query, sessionId, elementId);
}

export async function resetElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received reset element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, sessionId, elementId);
}

export async function agreeElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received agree element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET state=\'agreed\', updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export async function disbuteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received disbute element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET state=\'disbuted\', updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export async function lockElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received lock element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET state=\'locked\', updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export async function ongoingElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received ongoing element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export async function upvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received upvote element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1, updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export async function downvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received downvote element message: %s, %s", sessionId, elementId)
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1, updated_at=now() WHERE sessionId = $1 AND elementId = $2'
    executeUpdate(client, query, sessionId, elementId);
}

export function executeInsert(client: Client, query: string, sessionId: string, elementId: string) {
    client.query(query, [sessionId, elementId], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
        }
    });
}

export function executeDelete(client: Client, query: string, sessionId: string, elementId: string) {
    client.query(query, [sessionId, elementId], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Deleted %d rows", res.rowCount);
        }
    });
}

export function executeUpdate(client: Client, query: string, sessionId: string, elementId: string) {
    client.query(query, [sessionId, elementId], (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to update: %s", err);
        }
        else {
            console.log("[Magic] Updated %d rows", res.rowCount);
        }
    });
}