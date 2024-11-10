'use client'
import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import axios from 'axios'
import { FormEvent, useContext, useState } from 'react'
import jwt from  'jsonwebtoken'
import Button from '../Button/page'

const AddTodo = () => {
    const{ dispatch } = useContext(TodosAllContext)
    const [userInput, setUserInput] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(userInput.trim() == ''){
            return
        }

        try {

            const token = localStorage.getItem('token')
            if(!token) {
                throw new Error('No token found')
            }
            
            const decodedToken = jwt.decode(token) as {userId: string}
            const userId = decodedToken.userId;

            const response = await axios.post('/api/addTodos', {text: userInput, userId: userId})
            const newTodo = response.data;

            dispatch({
                type: ActionType.ADDED,
                payload: newTodo
            })
            setUserInput('')
            
        } catch (error) {
            console.error('Error adding todo', error)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <input
        className='text-2xl text-center bg-gray-50 rounded-md' 
        type="text"
        value={(userInput)}
        onChange={(e) => setUserInput(e.target.value)}
        maxLength={20}
        />
        <Button className='text-xl mt-4 border-2 rounded-lg px-0.5'><>Add Todos</></Button>
    </form>
  )
}

export default AddTodo
