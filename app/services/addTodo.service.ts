import { Context, ServiceSchema } from "moleculer";
import { Todo } from "../model/Todo";
import { todos } from "../utils/todoUtils";

const addTodoService: ServiceSchema = {
    name: 'add',
    actions: {
        todo(ctx: Context<{text: string}>) {
            const {text} = ctx.params

            if(!text) {
                throw Error('Todo text is required!')
            }

            const newTodo = new Todo(text)
            todos.push(newTodo)
            return newTodo
        },
    }
}

export default addTodoService