import { Todo } from "../model/Todo";

export interface IAction <T> {
    type: ActionType;
    payload: T;
}

export enum ActionType {
    ADDED,
    REMOVED,
    TOGGLED,
    SET_TODOS
}

export const TodoReducer = (todos: Todo[], action: IAction< Todo[] | Todo | number>): Todo[] => {
    switch(action.type) {

        case ActionType.SET_TODOS:
            return action.payload as Todo[]

        case ActionType.ADDED: {
            return [...todos, action.payload as Todo]
        }

        case ActionType.REMOVED:
            return todos.filter((todo) => todo.id !== action.payload as number)

            case ActionType.TOGGLED:
                return todos.map((todo) => {
                    if (todo.id === action.payload as number) return {...todo, done: !todo.done}
                    return todo
                })

                default:
                    return todos
    }
}