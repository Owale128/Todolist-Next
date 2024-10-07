import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const RemovedTodoService: ServiceSchema = {
    name: 'todos',
    actions: {
        remove(ctx: Context<{id: number}>) {
            const{id} = ctx.params;

            const updatedTodos = todos.find(todo => todo.id === id)
            if(!updatedTodos) {
                throw Error('Todo not found')
            }

            const filteredTodos = todos.filter(todo => todo.id !== id)
            todos.length = 0;
            todos.push(...filteredTodos)

            return updatedTodos
        }
    }
}

export default RemovedTodoService