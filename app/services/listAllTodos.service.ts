import { ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";
import { connectToDatabase } from "../db/mongodbConnection";


const listTodosService: ServiceSchema = {
    name: 'list',
    actions: {
        async todo() {
          const db = await connectToDatabase()
          const todosCollection = db.collection('todos')
          const todos = await todosCollection.find({}).toArray()
            return todos
        }
    }
}

export default listTodosService