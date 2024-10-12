import { ServiceBroker } from "moleculer"
import addTodoService from "./services/addTodo.service"
import toggleTodoService from "./services/toggleTodo.service"
import removeTodoService from "./services/removeTodo.service"
import listTodosService from "./services/listAllTodos.service"

const broker = new ServiceBroker({logger: true})

broker.createService(listTodosService)
broker.createService(addTodoService)
broker.createService(toggleTodoService)
broker.createService(removeTodoService)

broker.start()
  .then(() => {
    console.log("Broker and microservices are up and running!");
  })
  .catch(err => {
    console.error("Error starting broker:", err);
  });

export default broker