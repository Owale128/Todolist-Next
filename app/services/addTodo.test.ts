import { ServiceBroker } from "moleculer";
import addTodoService from "./addTodo.service";
import { connectToDatabase } from "../db/mongodbConnection";
import { ObjectId, Collection, InsertOneResult } from "mongodb";

jest.mock("../db/mongodbConnection"); 

describe('A service to add todo', () => {
    const broker = new ServiceBroker();
    broker.createService(addTodoService);

    let mockDb: { collection: jest.Mock };
    let mockTodosCollection: Partial<jest.Mocked<Collection>>;

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    beforeEach(() => {
        mockTodosCollection = {
            insertOne: jest.fn()
        };
        
        mockDb = {
            collection: jest.fn(() => mockTodosCollection)
        };
        (connectToDatabase as jest.Mock).mockResolvedValue(mockDb);
    });

    describe('When adding a todo', () => {
        it('Should return a todo object', async () => {
           
            const insertedId = new ObjectId();
            const mockInsertResult: InsertOneResult = {
                acknowledged: true,
                insertedId
            };

            mockTodosCollection.insertOne!.mockResolvedValue(mockInsertResult);

            const addTodo = await broker.call('add.todo', { text: 'Learning Jest' });
          
            expect(addTodo).toHaveProperty('text', 'Learning Jest');
            expect(addTodo).toHaveProperty('done', false);
            expect(addTodo).toHaveProperty('_id', insertedId);
            expect(mockTodosCollection.insertOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('When trying to add a todo without text', () => {
        it('Should throw a validation error if no text is provided', async () => {
            await expect(broker.call('add.todo', {})).rejects.toThrow(/Parameters validation error/);
        });
    });
    
});
