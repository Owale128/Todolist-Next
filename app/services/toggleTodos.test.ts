import { ServiceBroker } from "moleculer"
import { todos } from "../utils/todoUtils";
import addTodoService from "./addTodo.service";
import { Todo } from "../model/Todo";
import toggleTodo from "./toggleTodo.service";


describe('Toggle todo status', () => {
    const broker = new ServiceBroker();

    broker.createService(addTodoService)
    broker.createService(toggleTodo)

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    beforeEach(() => {
        todos.length = 0
    })

    describe('When clicking on done', () => {
        it('Should toggle the done status of todo', async () => {
            const newTodo = await broker.call('add.todo', { text: 'Learning Moleculer' }) as Todo
            expect(newTodo.done).toBe(false)

            const toggledTodo = await broker.call('toggle.todo', {id: newTodo.id}) as Todo
            expect(toggledTodo.done).toBe(true)
        })
        
    })
})