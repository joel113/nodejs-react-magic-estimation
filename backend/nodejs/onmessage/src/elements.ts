import { Client } from 'pg';

export async function addElement(elementId: String, client: Client) {
    const query = 'INSERT into elements(id) VALUES($1)'
    client.query(query, [elementId], (err, res) => {
        console.log("Element $elementID inserted into elements table")
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