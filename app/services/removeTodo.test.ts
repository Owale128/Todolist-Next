import { Context, ServiceBroker } from "moleculer"
import { todos } from "../utils/todoUtils";

describe('Remove Todo Service', () => {
    const broker = new ServiceBroker()

    broker.createService({
        name:'todos',
        actions: {
            remove(ctx: Context<{id: number}>) {
                const {id} = ctx.params;

                const removeTodo = todos.find(todo => todo.id === id);
                if(!removeTodo) {
                    throw Error('Todo not found')
                }
                const updatedTodos = todos.filter(todo => todo.id !== id)
                todos.length = 0
                todos.push(...updatedTodos)

                return removeTodo
            }
        }
    })

    beforeEach(() => {
    todos.push({ id: 1, text: 'Learning Moleculer', done: false });
    todos.push({ id: 2, text: 'Building a Todo App', done: false });
    todos.push({ id: 3, text: 'I Love Coding', done: false });
    })

    afterEach(() => {
        todos.length = 0;
    })

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    it('Should remove a todo by ID', async () => {

        expect(todos).toHaveLength(3);

        const todoToRemove = todos[1];
        const removedTodo = await broker.call('todos.remove', {id: todoToRemove.id})

        expect(removedTodo).toHaveProperty('id', todoToRemove.id);
        expect(removedTodo).toHaveProperty('text', 'Building a Todo App')

        expect(todos).toHaveLength(2)
        expect(todos[0].text).toBe('Learning Moleculer')

    })

    it('Should throw an error when trying to remove todo with non-existent ID', async () => {
        expect(todos).toHaveLength(3)
        
        await expect(broker.call('todos.remove', {id: 999})).rejects.toThrow('Todo not found')
    } )
})