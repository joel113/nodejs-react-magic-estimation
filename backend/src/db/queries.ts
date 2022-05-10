import { Client, QueryResult } from 'pg';

export async function executeSelect(client: Client, query: string, sessionId: String): Promise<QueryResult<any>> {
    return new Promise<QueryResult<any>>((resolve, reject) => {
        setTimeout(() => {
                client.query(query, [sessionId], (err, res) => {
                    if (err) {
                        console.error("[Magic] Error when trying to select: %s", err);
                        reject(err);
                    }
                    else {
                        console.log("[Magic] Selected %d rows", res.rowCount);
                        resolve(res);
                    }
                })}, 1000
        )
    })
}

export async function executeInsert(client: Client, query: string, values: string[]): Promise<any> | undefined {
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

export async function executeDelete(client: Client, query: string, values: string[]): Promise<any> | undefined {
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

export async function executeUpdate(client: Client, query: string, values: string[]): Promise<any> | undefined {
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