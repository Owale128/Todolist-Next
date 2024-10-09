import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const toggleTodo: ServiceSchema = {
    name: 'toggle',
    actions: {
        todo(ctx: Context<{id: number}>) {
            const { id } = ctx.params;
            const todo = todos.find(todo => todo.id === id)

            if(!todo) {
                throw new Error ('Todo not found!')
            }

            todo.done = !todo.done;
            return todo;
        }
    }
}

export default toggleTodo