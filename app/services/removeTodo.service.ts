import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const removeTodoService: ServiceSchema = {
    name: 'remove',
    actions: {
        todo(ctx: Context<{id: number}>) {
            const{id} = ctx.params;

            const updatedTodos = todos.filter(todo => todo.id !== id)

            if(updatedTodos.length === todos.length) {
                throw Error('Todo not found')
            }

            todos.push(...updatedTodos)

            return updatedTodos
        }
    }
}

export default removeTodoService