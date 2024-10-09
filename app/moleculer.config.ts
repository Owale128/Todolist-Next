import { ServiceBroker } from "moleculer"
import addTodoService from "./services/addTodo.service"
import toggleTodoService from "./services/toggleTodo.service"
import removeTodoService from "./services/removeTodo.service"

const broker = new ServiceBroker({logger: false})

broker.createService(addTodoService)
broker.createService(toggleTodoService)
broker.createService(removeTodoService)

export default broker