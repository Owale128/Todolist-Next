import { ServiceBroker } from "moleculer"
import TodoService from "./services/addTodo.service"

const broker = new ServiceBroker({logger: false})

broker.createService(TodoService)

export default broker