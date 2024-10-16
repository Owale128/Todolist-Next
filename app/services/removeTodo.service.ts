import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const removeTodoService: ServiceSchema = {
    name: 'remove',
    actions: {
        todo: {
            params: {
                id: 'number'
            },
            handler(ctx: Context<{id: number}>) {
                const{ id } = ctx.params;
                
                const updatedTodos = todos.filter(todo => todo.id !== id)
                
                if(updatedTodos.length === todos.length) {
                    console.error(`Todo with id ${id} not found`);
                    throw Error('Todo not found')
                }
                
                todos.length = 0
                todos.push(...updatedTodos)
                
                return { id }
            }
        }
    }
}

export default removeTodoService