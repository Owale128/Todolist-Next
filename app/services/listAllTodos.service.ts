import { ServiceSchema } from "moleculer";
import { todos } from "../utils/todoUtils";


const listTodosService: ServiceSchema = {
    name: 'list',
    actions: {
        todo() {
            return todos
        }
    }
}

export default listTodosService