import broker from "../moleculer.config"

describe('Testing Add Todo Service', () => {

    broker.createService({
        name: 'todos',
        actions: {
            add(ctx: {params: {text: string}}) {
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
        const AddTodo = await broker.call('todos.add', {text: 'Learning Jest'});
        expect(AddTodo).toBe('Learning Jest');
    })

    it('Should fail if no text is added', async() => {
        await expect(broker.call('todos.add', {})).rejects.toThrow('Todo Text is required!');
    })
})