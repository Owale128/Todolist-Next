import { Todo } from "../model/Todo";

export interface IAction {
    type: ActionType;
    payload: string | Todo | Todo[];
}

export enum ActionType {
    ADDED,
    REMOVED,
    TOGGLED,
    SET_TODOS
}

export const TodoReducer = (todos: Todo[], action: IAction): Todo[] => {
    switch(action.type) {

        case ActionType.SET_TODOS:
            return action.payload as Todo[]

        case ActionType.ADDED: {
            return [...todos, action.payload as Todo]
        }

        case ActionType.REMOVED:
            return todos.filter((todo) => todo._id !== action.payload as string)

            case ActionType.TOGGLED:
                return todos.map((todo) => {
                    if (todo._id === (action.payload as Todo)._id) {
                        return action.payload as Todo
                    }
                    return todo
                })

                default:
                    return todos
    }
}