import { Context, ServiceSchema } from "moleculer";
import { connectToDatabase } from "../db/mongodbConnection";

const listTodosService: ServiceSchema = {
    name: 'list',
    actions: {
        async todo(ctx: Context<{ userId: string }>) {
          const db = await connectToDatabase()
          const todosCollection = db.collection('todos')

          const todos = await todosCollection.find({ userId: ctx.params.userId }).toArray()
            return todos
        }
    }
}

export default listTodosService