import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import React, { useContext, useState } from 'react'
import DisplayTodo from './DisplayTodo'
import axios from 'axios'
import Button from './Button'

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
    <div className='flex flex-col justify-center items-center'>
      <Button click={sort} className='text-xl font-medium mb-6 border-2 w-14 rounded-lg'><>Sort</></Button>
      <table className="table-fixed w-96 lg:w-auto max-w-full break-words mb-20 overflow-auto table-glow-effect table">
      <thead>
          <tr className="bg-gray-200">
            <th className="p-4 border border-black">Todo</th>
            <th className="p-4 border border-black">Toggle</th>
            <th className="p-4 border border-black">Remove</th>
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
