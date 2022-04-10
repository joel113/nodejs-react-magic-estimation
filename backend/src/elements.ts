import { Client } from 'pg';

export async function addElement(id: String, client: Client) {
    const query = 'INSERT into elements(id, votes, votes_round, state) VALUES($1, 0, 0, \'ongoing\')'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to insert: %s", err)
        }
        else {
            console.log("Inserted %d rows", res.rowCount)
        }
    })
}

export async function delElement(id: String, client: Client) {
    const query = 'DELETE FROM elements WHERE ID = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to insert: %s", err)
        }
        else {
            console.log("Deleted %d rows", res.rowCount)
        }
    })
}

export async function resetElement(id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'ongoing\' WHERE id = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function agreeElement(id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'agreed\' WHERE id = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function disbuteElement(id: String, client: Client) {
    const query = 'UPDATE elements SET state=\'disbuted\' WHERE id = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function upvoteElement(id: String, client: Client) {
    const query = 'UPDATE elements SET votes=votes+1, votes_round=votes_round+1 WHERE id = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}

export async function downvoteElement(id: String, client: Client) {
    const query = 'UPDATE elements SET votes=votes-1, votes_round=votes_round-1 WHERE id = $1'
    client.query(query, [id], (err, res) => {
        if(err) {
            console.log("Error when trying to update: %s", err)
        }
        else {
            console.log("Updated %d rows", res.rowCount)
        }
    })
}