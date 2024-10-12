import { Todo } from "../model/Todo";

export type IAction = 
    | { type: ActionType.SET_TODOS; payload: Todo[] }
    | { type: ActionType.ADDED; payload: Todo }
    | { type: ActionType.REMOVED; payload: number }
    | { type: ActionType.TOGGLED; payload: number };

export enum ActionType {
    ADDED,
    REMOVED,
    TOGGLED,
    SET_TODOS
}

export const TodoReducer = (todos: Todo[], action: IAction): Todo[] => {
    switch(action.type) {

        case ActionType.SET_TODOS:
            return action.payload

        case ActionType.ADDED: {
            return [...todos, action.payload]
        }

        case ActionType.REMOVED:
            return todos.filter((todo) => todo.id !== action.payload)

            case ActionType.TOGGLED:
                return todos.map((todo) => {
                    if (todo.id === action.payload) return {...todo, done: !todo.done}
                    return todo
                })

                default:
                    return todos
    }
}