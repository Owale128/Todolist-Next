import { Context, ServiceSchema } from "moleculer";
import { Todo } from "../model/Todo";

const TodoService: ServiceSchema = {
    name: 'todos',
    actions: {
        add(ctx: Context<{text: string}>) {
            const {text} = ctx.params

            if(!text) {
                throw Error('Todo is required')
            }

            const newTodo = new Todo(text)
            return newTodo
        }
    }
}

export default TodoService