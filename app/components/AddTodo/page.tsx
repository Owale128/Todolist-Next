import { TodosAllContext } from '@/app/context/TodosAllContext'
import { ActionType } from '@/app/reducer/TodoReducer'
import axios from 'axios'
import { FormEvent, useContext, useState } from 'react'
import jwt from  'jsonwebtoken'

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
    <form onSubmit={handleSubmit}>
        <input
        className='border-2 border-black text-2xl text-center bg-gray-50' 
        type="text"
        value={(userInput)}
        onChange={(e) => setUserInput(e.target.value)}
        maxLength={20}
        />
        <button className='text-2xl ml-3 border-2 border-black rounded-lg p-0.5 bg-black text-white'>Save Todo</button>
    </form>
  )
}

export default AddTodo
