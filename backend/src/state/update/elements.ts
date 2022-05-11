import { Client } from 'pg';
import { executeInsert, executeUpdate, executeDelete } from '../../db/queries';

export async function addElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received add element message: %s, %s", sessionId, elementId);
    const query = 'INSERT into elements(sessionId, elementId, votes, votes_round, state) VALUES($1, $2, 0, 0, \'ongoing\')';
    executeInsert(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing received add element message failed: %s", err));
}

export async function delElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received del element message: %s, %s", sessionId, elementId);
    const query = 'DELETE FROM elements WHERE sessionId = $1 AND elementId = $2';
    executeDelete(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing received del element message failed: %s", err));
}

export async function resetElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received reset element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';;
    executeUpdate(client, query, [sessionId, elementId])
    .catch(err => console.error("[Magic] Processing received reset element message failed: %s", err));
}

export async function agreeElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received agree element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'agreed\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing agree element message failed: %s", err));
}

export async function disbuteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received disbute element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'disbuted\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId])
    .catch(err => console.error("[Magic] Processing disbute element message failed: %s", err));
}

export async function lockElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received lock element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'locked\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing lock element message failed: %s", err));
}

export async function ongoingElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received ongoing element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing ongoing element message failed: %s", err));
}

export async function upvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received upvote element message: %s, %s", sessionId, elementId);
    const updateElements = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1, updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, updateElements, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing upvote element message failed: %s", err));
}

export async function downvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received downvote element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1, updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId])
        .catch(err => console.error("[Magic] Processing downvote element message failed: %s", err));
}