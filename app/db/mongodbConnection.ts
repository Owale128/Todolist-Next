import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || 'defaultUriName'
const dbName = process.env.MONGO_DB_NAME || 'defaultDatabseName'
let client: MongoClient; 
let isConntected = false

export async function connectToDatabase() {
    try {
        if (!isConntected) {
            client = new MongoClient(uri)
            await client.connect();
            isConntected = true;
            console.log("Database connected");
        }
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw new Error('Could not connect to the database');
    }
}
