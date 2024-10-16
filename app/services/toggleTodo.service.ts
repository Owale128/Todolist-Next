import { Context, ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const toggleTodoService: ServiceSchema = {
    name: 'toggle',
    actions: {
        todo: {
            params: {
                id: 'number'
            },
            handler(ctx: Context<{id: number}>) {
                console.log('Current todos:', todos);
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
}

export default toggleTodoService