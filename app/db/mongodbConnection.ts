import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || ''
const client = new MongoClient(uri)
let isConntected = false

export async function connectToDatabase () {
   
    if(!isConntected){
        await client.connect()
        isConntected = true
    }
    return  client.db()
}