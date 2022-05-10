import { Client } from 'pg';
import { executeInsert, executeUpdate, executeDelete } from '../../db/queries';

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