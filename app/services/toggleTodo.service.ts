import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";
import { ObjectId } from "mongodb";

const toggleTodoService: ServiceSchema = {
    name: 'toggle',
    actions: {
        todo: {
            params: {
                id: 'string'
            },
            async handler(ctx: Context<{id: string}>) {
                const { id } = ctx.params

                const db = await connectToDatabase()
                const todosCollection = db.collection('todos')
                const todo = await todosCollection.findOne({ _id: new ObjectId(id)})
                
                if(!todo) {
                    throw new Error ('Todo Not Found!')
                }
                
                const updatedTodo = await todosCollection.findOneAndUpdate(
                    { _id: new ObjectId (id)},
                    { $set: {done: !todo.done} },
                    { returnDocument: 'after' }
                )

                if( !updatedTodo) {
                    throw new Error('Failed to update the todo')
                }

                return updatedTodo
            }
        } 
    }
}

export default toggleTodoService