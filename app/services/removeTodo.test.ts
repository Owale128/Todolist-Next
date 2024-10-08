import {  ServiceBroker } from "moleculer"
import { todos } from "../utils/todoUtils";
import RemoveTodoService from "./removeTodo.service";

describe('A service to remove todo', () => {
    const broker = new ServiceBroker()

    broker.createService(RemoveTodoService)

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

    describe('When clicking on remove',() => {
        it('Should remove a todo by ID', async () => {
            
            expect(todos).toHaveLength(3);
            
            const todoToRemove = todos[1];
            const updatedTodos = await broker.call('todos.remove', {id: todoToRemove.id})
            
            expect(updatedTodos).toHaveLength(2)
            expect(todos).toHaveLength(2)
            expect(todos.some(todo => todo.id === todoToRemove.id)).toBe(false)
            
            expect(todos[0].text).toBe('Learning Moleculer')
            expect(todos[1].text).toBe('I Love Coding')
            
        })
    })
    
    describe('when trying to remove todo with non-existent ID ', () => {
        it('Should throw an error', async () => {
            expect(todos).toHaveLength(3)
            
            await expect(broker.call('todos.remove', {id: 999})).rejects.toThrow('Todo not found')
        } )
    })
})