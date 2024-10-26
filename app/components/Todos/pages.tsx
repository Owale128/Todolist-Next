import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import React, { useContext, useState } from 'react'
import DisplayTodo from '../DisplayTodo/pages'
import axios from 'axios'

const Todos = () => {

    const { todos, dispatch } = useContext(TodosAllContext)
    const [asc, setAsc] = useState(false)

    const sort = () => {
      setAsc(!asc)
    }

    let sortedTodos = todos.sort((a, b) => {
      if(a.text > b.text) return 1;
      if(a.text < b.text) return -1;
      return 0
    })

    if(asc) {
      sortedTodos = sortedTodos.reverse()
    }

    const removeTodo = async (id: string) => {
      try {
          const response = await axios.delete('/api/removeTodo', {data: {id}})
          const removedTodo = response.data

            dispatch({
                type: ActionType.REMOVED,
                payload: removedTodo.id
            })

        }catch (error) {
            console.error('Error removing todo', error)
        }
    }

    const toggleTodo = async (id: string) => {  
      try{
          const response =  await axios.put('/api/toggleTodo', {id})
          const toggledTodo = response.data
          
                dispatch({
                    type: ActionType.TOGGLED,
                    payload: toggledTodo
                })

        }catch (error) {
            console.error('Error toggle todo', error)
        }
    }

  return (
    <div className='flex flex-col'>
      <button onClick={sort} className='text-2xl font-medium mb-6 underline'>Sort</button>
       <table className="table-auto w-full border-collapse border border-gray-200 mb-20">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border border-gray-300">Todo</th>
            <th className="p-4 border border-gray-300">Toggle</th>
            <th className="p-4 border border-gray-300">Remove</th>
          </tr>
        </thead>
        <tbody>
       {sortedTodos.map((todo) => (
         <DisplayTodo key={todo._id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
        ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Todos
