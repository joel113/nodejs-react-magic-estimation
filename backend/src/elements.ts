import { Client } from 'pg';

export async function addElement(elementId: String, client: Client) {
    const query = 'INSERT into elements(id) VALUES($1)'
    client.query(query, [elementId], (err, res) => {
        console.log("Inserted %s rows and error %s", res, err.message)
    })
}

export async function delElement(elementId: String) {

}

export async function resetElement(elementId: String) {

}

export async function disbuteElement(elementId: String) {

}

export async function breakElement(elementId: String) {

}

export async function upvoteElement(elementId: String) {

}

export async function downvoteElement(elementId: String) {

}