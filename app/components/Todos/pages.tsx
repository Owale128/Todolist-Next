import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import React, { useContext } from 'react'
import DisplayTodo from '../DisplayTodo/pages'

const Todos = () => {

    const { todos, dispatch } = useContext(TodosAllContext)

    const removeTodo = (id: number) => {
        dispatch({
            type: ActionType.REMOVED,
            payload: id.toString()
        })
    }

    const toggleTodo = (id: number) => {

        dispatch({
            type: ActionType.TOGGLED,
            payload: id.toString()
        })
    }

  return (
    <div className='todos'>
       {todos.map((todo) => (
        <DisplayTodo key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
       ))} 
      
    </div>
  )
}

export default Todos
