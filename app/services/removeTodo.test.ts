import { ServiceBroker } from "moleculer";
import RemoveTodoService from "./removeTodo.service";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/mongodbConnection";

jest.mock("../db/mongodbConnection", () => ({
    connectToDatabase: jest.fn()
}));

describe('A service to remove todo', () => {
    const broker = new ServiceBroker();
    broker.createService(RemoveTodoService);

    let todosCollection = {
        deleteOne: jest.fn()
    };

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    beforeEach(() => {
        (connectToDatabase as jest.Mock).mockResolvedValue({
            collection: () => todosCollection
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When clicking on remove', () => {
        it('Should remove a todo by ID', async () => {

            todosCollection.deleteOne.mockResolvedValue({ deletedCount: 1 });

            const todoToRemoveId = new ObjectId().toString();

            const result = await broker.call('remove.todo', { id: todoToRemoveId });

            expect(todosCollection.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId(todoToRemoveId) });
            expect(result).toEqual({ id: todoToRemoveId });
        });
    });

    describe('When trying to remove todo with non-existent ID', () => {
        it('Should throw an error', async () => {

            todosCollection.deleteOne.mockResolvedValue({ deletedCount: 0 });

            const nonExistentId = new ObjectId().toString();

            await expect(broker.call('remove.todo', { id: nonExistentId }))
                .rejects
                .toThrow('Todo Not Found');
        });
    });
});
