import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";
import bcrypt from 'bcrypt'


const registerService: ServiceSchema = {
    name: 'register',
    actions: {
        async createUser(ctx: Context<{username: string; password: string}>) {
            const {username, password} = ctx.params;

            const db = await connectToDatabase()
            const userCollection = db.collection('users');
            
            const existingUser = await userCollection.findOne({ username })
            if(existingUser) throw new Error ('Username already exists');

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                username, 
                password: hashedPassword,
                createdAt: new Date(),
            };

            await userCollection.insertOne(newUser);
            return {message: 'User registered successfully'}
        }   
    }
}

export default registerService;