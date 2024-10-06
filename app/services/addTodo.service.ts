import { Context, ServiceSchema } from "moleculer";

const TodoService: ServiceSchema = {
    name: 'todos',
    actions: {
        add(ctx: Context<{text: string}>) {
            const {text} = ctx.params

            if(!text) {
                throw Error('Todo is required')
            }
            return text
        }
    }
}

export default TodoService