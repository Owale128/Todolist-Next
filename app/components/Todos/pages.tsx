import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import React, { useCallback, useContext, useEffect } from 'react'
import DisplayTodo from '../DisplayTodo/pages'
import axios from 'axios'

const Todos = () => {

    const { todos, dispatch } = useContext(TodosAllContext)

    const removeTodo = useCallback (async (id: number) => {
        try {
          const response = await axios.delete('/api/removedTodos', {data: {id}})
          const removedTodo = response.data
            dispatch({
                type: ActionType.REMOVED,
                payload: removedTodo.id
            })
        }catch (error) {
            console.error('Error removing todo', error)
        }
    }, [dispatch])

    const toggleTodo = useCallback (async (id: number) => {
        try{
          const response =  await axios.put('/api/toggleTodo', {id})
          const toggledTodo = response.data
                dispatch({
                    type: ActionType.TOGGLED,
                    payload: toggledTodo.id
                })  
        }catch (error) {
            console.error('Error toggle todo', error)
        }
    }, [dispatch])

  return (
    <div className='todos'>
       {todos.map((todo) => (
        <DisplayTodo key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
       ))} 
      
    </div>
  )
}

export default Todos