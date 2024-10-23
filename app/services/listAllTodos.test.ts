import { ServiceBroker } from "moleculer"
import listTodosService from "./listAllTodos.service"
import addTodoService from "./addTodo.service"
import { connectToDatabase } from "../db/mongodbConnection"

jest.mock("../db/mongodbConnection");

describe('Listing todos', () => {
    const broker = new ServiceBroker()
    broker.createService(listTodosService)
    broker.createService(addTodoService)

    const mockTodos = [
        { text: 'Naruto' },
        { text: 'One piece' },
        { text: 'Dragonball' }
    ];
 
    const mockDb = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockImplementation((newTodo) => {
            return { insertedId: "mocked-id" }; 
        }),
        toArray: jest.fn().mockResolvedValue(mockTodos)
    };

    (connectToDatabase as jest.Mock).mockResolvedValue(mockDb);

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    describe('When adding todos', () => {
        it('Should list all todos', async () => {
    
            await broker.call('add.todo', { text: 'Naruto' });
            await broker.call('add.todo', { text: 'One piece' });
            await broker.call('add.todo', { text: 'Dragonball' });

            const allTodos = await broker.call('list.todo');
 
            expect(allTodos).toHaveLength(3);
            expect(allTodos).toEqual(mockTodos);
        });
    });
});
