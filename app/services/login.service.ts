import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'Fallback-jwt'

const loginService: ServiceSchema = {
   name: 'login',
   actions: {
    async user(ctx: Context<{ username: string; password: string}>) {
        const { username, password} = ctx.params

        const db = await connectToDatabase()
        const userCollection = db.collection('users')

        const user = await userCollection.findOne({ username })
        if(!user) throw new Error('User not found')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) throw new Error('Invalid password')

        const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '1h'})
        return { token, message: 'Login successful'}
    }
   } 
}

export default loginService