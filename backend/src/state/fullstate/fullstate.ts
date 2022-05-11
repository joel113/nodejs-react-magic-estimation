import { Client } from 'pg';
import { executeSelect } from '../../db/queries';

export const fullstate = async (sessionId: string, client: Client) => {
    const queryElementVotes = 'SELECT element_id, votes, votes_round, state FROM elements WHERE session_id=$1';
    const elementVotes = executeSelect(client, queryElementVotes, sessionId);

    const queryVotes = 'SELECT user_id, element_id, votes FROM votes WHERE session_id=$1';
    const votes = executeSelect(client, queryVotes, sessionId);

    const queryUsers = 'SELECT user_id, color FROM users WHERE session_id=$1';
    const users = executeSelect(client, queryUsers, sessionId);

    const queryRounds = 'SELECT rounds, round_active FROM rounds where session_id=$1';
    const rounds = executeSelect(client, queryRounds, sessionId);

    Promise.all([elementVotes, votes, users, rounds]).then((values) => {
        const elementVotesResults = values[0];
        const votesResult = values[1];
        const usersResult = values[2];
        const roundsResults = values[3];

        if(roundsResults.rowCount != 1) {
            throw "Full state rounds results unequal one row";
        }

        const elementVotesPayload = elementVotesResults.rows;
        const userVotesPayload = votesResult.rows;
        const userPayload = usersResult.rows;
        const rounds = roundsResults.rows[0][1];
        const roundsActive = roundsResults.rows[0][2];

        return JSON.stringify({
            type: 'state',
            payload: { elementVotesPayload, userVotesPayload, userPayload, rounds, roundsActive },
            });
    }).catch((_) => {
        throw "Promise failed"
    });
}

function sendMessageToConnection(message: string, connectionId: string) {
    // TODO: implement
}