import {  ServiceBroker } from "moleculer"
import { todos } from "../utils/todoUtils"
import addTodoService from "./addTodo.service"

describe('A service to add todo', () => {

    const broker = new ServiceBroker()
    broker.createService(addTodoService)

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    beforeEach(() => todos.length = 0)

    describe('When adding a todo', () => {
        it('Should return a todo object', async () => {
            const addTodo = await broker.call('add.todo', {text: 'Learning Jest'});

            expect(addTodo).toHaveProperty('text', 'Learning Jest');
            expect(addTodo).toHaveProperty('done', false)
            expect(addTodo).toHaveProperty('id')
        })
    })
    describe('When trying to add a todo without text',() => {
        it('Should throw an error if no text is provided', async() => {
            await expect(broker.call('add.todo', {})).rejects.toThrow('Todo text is required!');
        })
    })
})