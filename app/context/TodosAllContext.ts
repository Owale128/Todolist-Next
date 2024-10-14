import { createContext, Dispatch } from "react";
import { Todo } from "../model/Todo";
import { IAction } from "../reducer/TodoReducer";


interface ITodosAllContext {
    todos: Todo[];
    dispatch: Dispatch<IAction<Todo>>;
}

export const TodosAllContext = createContext<ITodosAllContext> ({
    todos: [],
    dispatch: () => {
        return
    }
})