import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import React, { FormEvent, useContext, useState } from 'react'

const AddTodo = () => {
    const{ dispatch } = useContext(TodosAllContext)
    const [userInput, setUserInput] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch({
            type: ActionType.ADDED,
            payload: userInput
        })
        setUserInput('')
    }
  return (
    <form onSubmit={handleSubmit}>
        <input
        className='border-2 border-black p-1 text-2xl' 
        type="text"
        value={(userInput)}
        onChange={(e) => setUserInput(e.target.value)}
        />
        <button className='text-2xl ml-3 border-2 border-black rounded-lg p-1'>Save Todo</button>
    </form>
  )
}

export default AddTodo