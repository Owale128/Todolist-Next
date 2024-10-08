import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const RemoveTodoService: ServiceSchema = {
    name: 'todos',
    actions: {
        remove(ctx: Context<{id: number}>) {
            const{id} = ctx.params;

            const updatedTodos = todos.filter(todo => todo.id !== id)

            if(updatedTodos.length === todos.length) {
                throw Error('Todo not found')
            }

            todos.length = 0;
            todos.push(...updatedTodos)

            return updatedTodos
        }
    }
}

export default RemoveTodoService