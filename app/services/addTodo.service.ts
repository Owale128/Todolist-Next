import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";

const addTodoService: ServiceSchema = {
    name: 'add',
    actions: {
        todo:{
            params: {
                text: 'string',
                userId: 'string'
            },
            async handler(ctx: Context<{text: string, userId: string}>) {
                const {text, userId} = ctx.params
                
                if(!text) {
                    throw Error('Todo text is required!')
                }

                const db = await connectToDatabase()
                const todosCollection = db.collection('todos')
                
                const newTodo = {
                    text,
                    done: false,
                    createdAt: new Date(),
                    userId
                };

                const result = await todosCollection.insertOne(newTodo)
                return {
                    ...newTodo,
                    _id: result.insertedId
                }

            },
        }
    }
}

export default addTodoService