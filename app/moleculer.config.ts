import { ServiceBroker } from "moleculer"
import addTodoService from "./services/addTodo.service"
import toggleTodoService from "./services/toggleTodo.service"
import removeTodoService from "./services/removeTodo.service"
import listTodosService from "./services/listAllTodos.service"
import registerService from "./services/register.service"
import loginService from "./services/login.service"

const broker = new ServiceBroker({logger: true})

broker.createService(listTodosService)
broker.createService(addTodoService)
broker.createService(toggleTodoService)
broker.createService(removeTodoService);
broker.createService(registerService)
broker.createService(loginService)

broker.start()
  .then(() => {
    console.log("Broker and microservices are up and running!");
  })
  .catch(err => {
    console.error("Error starting broker:", err);
  });

export default broker