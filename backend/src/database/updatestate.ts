import { Client } from 'pg';

export async function addElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received add element message: %s, %s", sessionId, elementId);
    const query = 'INSERT into elements(sessionId, elementId, votes, votes_round, state) VALUES($1, $2, 0, 0, \'ongoing\')';
    executeInsert(client, query, [sessionId, elementId]);
}

export async function delElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received del element message: %s, %s", sessionId, elementId);
    const query = 'DELETE FROM elements WHERE sessionId = $1 AND elementId = $2';
    executeDelete(client, query, [sessionId, elementId]);
}

export async function resetElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received reset element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';;
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function agreeElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received agree element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'agreed\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function disbuteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received disbute element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'disbuted\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function lockElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received lock element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'locked\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function ongoingElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received ongoing element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET state=\'ongoing\', updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function upvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received upvote element message: %s, %s", sessionId, elementId);
    const updateElements = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1, updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, updateElements, [sessionId, elementId]);
}

export async function downvoteElement(sessionId: string, elementId: string, client: Client) {
    console.log("[Magic] Received downvote element message: %s, %s", sessionId, elementId);
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1, updated_at=now() WHERE sessionId = $1 AND elementId = $2';
    executeUpdate(client, query, [sessionId, elementId]);
}

export async function addVote(sessionId: string, elementId: string, userId: string, color: string, client: Client) {
    console.log("[Magic] Received add vote message: %s, %s, %s", sessionId, elementId, userId);
    const updateVotes = 'INSERT INTO votes (session_id, user_id, color, votes, updated_at, created_at) VALUES($1, $2, $3, 1, now(), now())';
    executeInsert(client, updateVotes, [sessionId, userId, color])
}

export async function updateVote(sessionId: string, elementId: string, userId: string, color: string, votes: number, client: Client) {
    console.log("[Magic] Received add vote message: %s, %s, %s, %s", sessionId, elementId, userId, votes);
    const updateVotes = 'UPDATE votes SET votes=$4, updated_at=now() WHERE session_id=$1, user_id=$2, element_id=$3';
    executeUpdate(client, updateVotes, [sessionId, userId, color])
}

export async function removeVote(sessionId: string, elementId: string, userId: string, color: string, client: Client) {
    console.log("[Magic] Received remove vote message: %s, %s, %s", sessionId, elementId, userId);
    const updateVotes = 'DELETE FROM votes WHERE session_id=$1, user_id=$2, element_id=$3';
    executeInsert(client, updateVotes, [sessionId, userId, color])
}

async function executeInsert(client: Client, query: string, values: string[]): Promise<any> | undefined {
    client.query(query, values, (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Inserted %d rows", res.rowCount);
            return res;
        }
    });
    return undefined;
}

async function executeDelete(client: Client, query: string, values: string[]): Promise<any> | undefined {
    client.query(query, values, (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to insert: %s", err);
        }
        else {
            console.log("[Magic] Deleted %d rows", res.rowCount);
            return res;
        }
    });
    return undefined;
}

async function executeUpdate(client: Client, query: string, values: string[]): Promise<any> | undefined {
    client.query(query, values, (err, res) => {
        if (err) {
            console.log("[Magic] Error when trying to update: %s", err);
        }
        else {
            console.log("[Magic] Updated %d rows", res.rowCount);
            return res;
        }
    });
    return undefined;
}