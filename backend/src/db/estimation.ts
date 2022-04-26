import { Client } from 'pg';

export async function clearVotes(session_id: String, client: Client) {
    const query = 'UPDATE elements set votes = 0, votes_round = 0 WHERE session_id = $1'
    client.query(query, [session_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updatd %d rows", res.rowCount)
        }
    })
}

export async function addRound(session_id: String, client: Client) {
    const query = 'UPDATE rounds set rounds = rounds + 1 WHERE session_id = $1'
    client.query(query, [session_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updatd %d rows", res.rowCount)
        }
    })
}

export async function nextRound(session_id: String, client: Client) {
    const query = 'UPDATE rounds set rounds_active = rounds_active + 1 WHERE session_id = $1'
    client.query(query, [session_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updatd %d rows", res.rowCount)
        }
    })
}