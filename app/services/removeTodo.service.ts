import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";
import { ObjectId } from "mongodb";

const removeTodoService: ServiceSchema = {
    name: 'remove',
    actions: {
        todo: {
            params: {
                id: 'string'
            },
            async handler(ctx: Context<{id: string}>) {
                const{ id } = ctx.params

                const db = await connectToDatabase()
                const todosCollection = db.collection('todos')
                const result = await todosCollection.deleteOne({ _id: new ObjectId(id)})
                
                if(result.deletedCount === 0) {
                    throw new Error ('Todo Not Found')
                }
                
                return { id }
            }
        }
    }
}

export default removeTodoService