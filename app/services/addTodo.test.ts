import { Context, ServiceBroker } from "moleculer"

describe('Testing Add Todo Service', () => {

    const broker = new ServiceBroker()
    broker.createService({
        name: 'todos',
        actions: {
            add(ctx: Context<{text: string}>) {
                const{text} = ctx.params

                if(!text) {
                    throw Error('Todo Text is required!')
                }
                return text
            }
        }
    })

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    it('Should Add Todo Text', async () => {
        const addTodo = await broker.call('todos.add', {text: 'Learning Jest'});
        expect(addTodo).toBe('Learning Jest');
    })

    it('Should Fail If No Text Is Added', async() => {
        await expect(broker.call('todos.add', {})).rejects.toThrow('Todo Text is required!');
    })
})