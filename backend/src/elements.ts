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

export async function resetElement(id: String) {

}

export async function disbuteElement(elementId: String) {

}

export async function breakElement(elementId: String) {

}

export async function upvoteElement(elementId: String) {

}

export async function downvoteElement(elementId: String) {

}