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
            const addTodo = await broker.call('todos.add', {text: 'Learning Jest'});

            expect(addTodo).toHaveProperty('text', 'Learning Jest');
            expect(addTodo).toHaveProperty('done', false)
            expect(addTodo).toHaveProperty('id')
        })
    })

    describe('When trying to add a todo without text',() => {
        it('Should throw an error if no text is provided', async() => {
            await expect(broker.call('todos.add', {})).rejects.toThrow('Todo text is required!');
        })
    })
    
    describe('When adding todos', () => {
        it('Should list all todos', async () => {
            await broker.call('todos.add', {text: 'Naruto'})
            await broker.call('todos.add', {text: 'One piece'})
            await broker.call('todos.add', {text: 'Dragonball'})
            
            const allTodos = await broker.call('todos.list')
            
            expect(allTodos).toHaveLength(3)
            
        })
    })
})