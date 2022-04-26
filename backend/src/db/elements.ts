import { Client } from 'pg';

export async function addElement(session_id: String, element_id: String, client: Client) {
    const query = 'INSERT into elements(session_id, element_id, votes, votes_round, state) VALUES($1, 0, 0, \'ongoing\')'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to insert: %s", err)
        }
        else {
            console.log("Inserted %d rows", res.rowCount)
        }
    })
}

export async function delElement(session_id: String, element_id: String, client: Client) {
    const query = 'DELETE FROM elements WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to insert: %s", err)
        }
        else {
            console.log("Deleted %d rows", res.rowCount)
        }
    })
}

export async function resetElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'ongoing\' WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function agreeElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'agreed\' WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function disbuteElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'disbuted\' WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function lockElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'locked\' WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function upvoteElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1 WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function downvoteElement(session_id: String, element_id: String, client: Client) {
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1 WHERE session_id = $1 AND element_id = $2'
    client.query(query, [session_id, element_id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}