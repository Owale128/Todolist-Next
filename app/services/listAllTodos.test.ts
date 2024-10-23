/* import { ServiceBroker } from "moleculer"
import listTodosService from "./listAllTodos.service"
import addTodoService from "./addTodo.service"

describe('Listing todos', () => {

    const broker = new ServiceBroker()
    broker.createService(listTodosService)
    broker.createService(addTodoService)

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    describe('When adding todos', () => {
    it('Should list all todos', async () => {
        await broker.call('add.todo', {text: 'Naruto'})
        await broker.call('add.todo', {text: 'One piece'})
        await broker.call('add.todo', {text: 'Dragonball'})
        
        const allTodos = await broker.call('list.todo')
        
        expect(allTodos).toHaveLength(3)
        
    })
})
}) */